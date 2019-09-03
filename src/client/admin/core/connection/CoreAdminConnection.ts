import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import { autobind } from "../../../../core/autobind/autobind";
import { IEventService } from "../../../../core/event";
import { Inject } from "../../../../core/ioc";
import { createLogger, ILogger } from "../../../../core/logger";
import { SignalrBusLogger } from "../../../../engine/abstractions/SignalrBusLogger";
import { IAdminZoneDetails } from "../../api/IAdminZoneDetails";
import { IAdminActionResponse } from "../api/IAdminActionResponse";
import { createCoreAdminConnectedEvent } from "../connected/CoreAdminConnectedEvent";

export class CoreAdminConnection {
    private _connection?: HubConnection;

    constructor(
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _logger: ILogger = createLogger("CoreAdminConnection"),
        private readonly _connectionLogger: ILogger = createLogger(
            "CoreAdminConnection.Connection"
        )
    ) {}
    public startConnection(serverUrl: string, accessToken: string) {
        const connection = new HubConnectionBuilder()
            .withUrl(`${serverUrl}/admin`, {
                accessTokenFactory: () => accessToken,
            })
            .configureLogging(new SignalrBusLogger(this._connectionLogger))
            .build();
        this.setupEvents(connection);
        connection.onclose(this.onClosed);
        connection
            .start()
            .then(_ => (this._connection = connection))
            .then(_ =>
                this._logger.log("Connection Details: ", this._connection)
            )
            .then(_ =>
                this._eventService.publish(createCoreAdminConnectedEvent({}))
            )
            .catch(error => {
                if (error.statusCode === 401) {
                    this._logger.error("Connection closed, with 401.", error);
                    // this._eventService.publish(
                    //     createCoreAdminDisconnectedEvent({
                    //         code: "status_code_401"
                    //     })
                    // );
                    return;
                }
                this._logger.error("Connection failed", error);
            });
    }
    public stopConnection(reason: string) {
        if (this._connection) {
            this._connection.stop();
            this._connection = undefined;
        }
    }

    public getAllZones(): Promise<IAdminZoneDetails[]> {
        if (this._connection) {
            return this._connection.invoke("GetAllZones");
        }
        return new Promise<IAdminZoneDetails[]>((_, reject) =>
            reject({
                message: "Connection not started",
                code: "connection_not_started",
            })
        );
    }
    public adminAction(
        action: string,
        data: any
    ): Promise<IAdminActionResponse> {
        if (this._connection) {
            return this._connection.invoke("AdminAction", action, data);
        }
        return new Promise<IAdminActionResponse>((_, reject) =>
            reject({
                message: "Connection not started",
                code: "connection_not_started",
            })
        );
    }
    private setupEvents(connection: HubConnection) {}
    @autobind
    private onClosed(error?: Error): void {
        if (error) {
            this._logger.error("Connection closed, with error.", error);
        }
        // this._eventService.publish(
        //     createCoreAdminDisconnectedEvent({
        //         code: "closed",
        //         error
        //     })
        // );
    }
}
