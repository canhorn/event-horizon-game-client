import { HubConnection, HubConnectionBuilder } from "@aspnet/signalr";
import { autobind } from "../../../../core/autobind/autobind";
import { IEventService } from "../../../../core/event";
import { Inject } from "../../../../core/ioc";
import { createLogger, ILogger } from "../../../../core/logger";
import { SignalrBusLogger } from "../../../../engine/abstractions/SignalrBusLogger";
import { createAccountConnectedEvent } from "../account/connected/AccountConnectedEvent";
import { createAccountDisconnectedEvent } from "../account/disconnected/AccountDisconnectedEvent";
import { IAccountConnectedInfo } from "../api/IAccountConnectedInfo";

export class CoreConnection {
    private _connection?: HubConnection;

    constructor(
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _logger: ILogger = createLogger("CoreConnection"),
        private readonly _connectionLogger: ILogger = createLogger(
            "CoreConnection.Connection"
        )
    ) {}
    public startConnection(serverUrl: string, accessToken: string) {
        const connection = new HubConnectionBuilder()
            .withUrl(`${serverUrl}/coreBus`, {
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
                        createAccountDisconnectedEvent({
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
    private setupEvents(connection: HubConnection) {
        connection.on(
            "AccountConnected",
            (accountInfo: IAccountConnectedInfo) => {
                this._logger.debug("Account Info: ", accountInfo);
                this._eventService.publish(
                    createAccountConnectedEvent({ accountInfo })
                );
            }
        );
        // connection.on(
        //     "PlayerZoneChanged",
        //     (playerZoneChanged: IZoneDetails) => {
        //         this._logger.log("PlayerZoneChanged Info: ", playerZoneChanged);
        //         this._eventService.publish(
        //             createPlayerZoneChangedEvent(playerZoneChanged)
        //         );
        //     }
        // );
    }
    @autobind
    private onClosed(error?: Error): void {
        if (error) {
            this._logger.error("Core Bus closed, with error.", error);
        }
        this._eventService.publish(
            createAccountDisconnectedEvent({
                code: "closed",
                error,
            })
        );
    }
}
