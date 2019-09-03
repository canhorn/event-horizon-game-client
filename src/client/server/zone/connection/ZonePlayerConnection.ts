import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import { autobind } from "../../../../core/autobind/autobind";
import { IEventService } from "../../../../core/event";
import { Inject } from "../../../../core/ioc";
import { createLogger, ILogger } from "../../../../core/logger";
import { SignalrBusLogger } from "../../../../engine/abstractions/SignalrBusLogger";
import { createClientActionReceivedEvent } from "../action/ClientActionReceivedEvent";
import { IZonePlayerInfo } from "../api/IZonePlayerInfo";
import { createZonePlayerConnectionDisconnectedEvent } from "../disconnected/ZonePlayerConnectionDisconnectedEvent";
import { createZonePlayerInfoReceivedEvent } from "../info/ZonePlayerInfoReceivedEvent";

type IOnCloseEvent = (reason: Error) => void;

export class ZonePlayerConnection {
    private _connection?: HubConnection;
    private _onCloseEventList: IOnCloseEvent[] = [];

    constructor(
        private readonly _logger: ILogger = createLogger(
            "ZonePlayerConnection"
        ),
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _connectionLogger: ILogger = createLogger(
            "ZonePlayerConnection.Connection"
        )
    ) {}
    public startConnection(serverUrl: string, accessToken: string) {
        const connection = new HubConnectionBuilder()
            .withUrl(`${serverUrl}/playerHub`, {
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
            .catch(error => {
                if (error.statusCode === 401) {
                    this._logger.error("Core Bus closed, with 401.", error);
                    this._eventService.publish(
                        createZonePlayerConnectionDisconnectedEvent({
                            code: "status_code_401",
                        })
                    );
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

    public invoke(method: string, ...args: any[]) {
        if (this._connection) {
            this._connection.invoke(method, ...args);
        }
    }
    private setupEvents(connection: HubConnection) {
        connection.on("ZoneInfo", (zonePlayerInfo: IZonePlayerInfo) => {
            this._logger.debug("Zone Player Info: ", zonePlayerInfo);
            this._eventService.publish(
                createZonePlayerInfoReceivedEvent({ zonePlayerInfo })
            );

            connection.on("ClientAction", (event: string, eventData: any) => {
                this._eventService.publish(
                    createClientActionReceivedEvent({
                        action: event,
                        data: eventData,
                    })
                );
            });
        });
    }
    @autobind
    private onClosed(error?: Error): void {
        if (error) {
            this._logger.error("Core Bus closed, with error.", error);
        }
        this._eventService.publish(
            createZonePlayerConnectionDisconnectedEvent({
                code: "closed",
                error,
            })
        );
    }
}
