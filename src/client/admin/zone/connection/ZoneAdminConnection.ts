import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import { ErrorCode } from "../../../../core/assert/Assert";
import { autobind } from "../../../../core/autobind/autobind";
import { IEventService } from "../../../../core/event";
import { ILogger } from "../../../../core/logger";
import { Inject } from "../../../../core/ioc";
import { createLogger } from "../../../../core/logger";
import { SignalrBusLogger } from "../../../../engine/abstractions/SignalrBusLogger";
import { IZoneInfo } from "../../../server/zone/api/IZoneInfo";
import { IAdminZoneDetails } from "../../api/IAdminZoneDetails";
import { IZoneAdminCommand } from "../api/IZoneAdminCommand";
import { IZoneCommandResponse } from "../api/IZoneCommandResponse";
import { createZoneServerAdminCommandResponseEvent } from "../command/ZoneServerAdminCommandResponseEvent";
import { createZoneAdminConnectedEvent } from "../connected/ZoneAdminConnectedEvent";

export class ZoneAdminConnection {
    private _connection?: HubConnection;

    constructor(
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _logger: ILogger = createLogger("ZoneAdminConnection"),
        private readonly _connectionLogger: ILogger = createLogger(
            "ZoneAdminConnection.Connection"
        )
    ) {}
    public startConnection(
        serverUrl: string,
        accessToken: string
    ): Promise<void> {
        const connection = new HubConnectionBuilder()
            .withUrl(`${serverUrl}/admin`, {
                accessTokenFactory: () => accessToken,
            })
            .configureLogging(new SignalrBusLogger(this._connectionLogger))
            .build();
        this.setupEvents(connection);
        connection.onclose(this.onClosed);
        return connection
            .start()
            .then(_ => (this._connection = connection))
            .then(_ =>
                this._logger.log("Connection Details: ", this._connection)
            )
            .then(_ =>
                this._eventService.publish(createZoneAdminConnectedEvent({}))
            )
            .catch(error => {
                if (error.statusCode === 401) {
                    this._logger.error("Connection closed, with 401.", error);
                    // this._eventService.publish(
                    //     createZoneAdminDisconnectedEvent({
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
    public adminAction(action: IZoneAdminCommand): Promise<void> {
        if (this._connection) {
            return this._connection.invoke(
                "Command",
                action.command,
                action.data
            );
        }
        return new Promise<void>((_, reject) =>
            reject(
                new ErrorCode(
                    "Connection not started",
                    "connection_not_started"
                )
            )
        );
    }
    public zoneInfo(): Promise<IZoneInfo> {
        if (this._connection) {
            return this._connection.invoke("ZoneInfo");
        }
        return new Promise<IZoneInfo>((_, reject) =>
            reject(
                new ErrorCode(
                    "Connection not started",
                    "connection_not_started"
                )
            )
        );
    }
    private setupEvents(connection: HubConnection) {
        connection.on("AdminCommandResponse", this.onCommandResponse);
    }
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
    @autobind
    private onCommandResponse(response: IZoneCommandResponse) {
        this._eventService.publish(
            createZoneServerAdminCommandResponseEvent({ response })
        );
    }
}
