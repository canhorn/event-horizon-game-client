import {
    ICommandHandler,
    ICommandResult,
    ICommandType,
} from "../../../../core/command";
import { Inject } from "../../../../core/ioc";
import { IQueryService } from "../../../../core/query";
import {
    getConfigurationProperty,
    IGameConfiguration,
} from "../../../../engine/settings/IGameSettings";
import { createGetAccountQuery } from "../../../account/get/GetAccountQuery";
import { startCoreConnection } from "../state/CoreConnectionState";
import {
    START_CORE_SERVER_CONNECTION_COMMAND,
    StartCoreServerConnectionCommandResultType,
} from "./StartCoreServerConnectionCommand";

/**
 * Name: StartCoreServerConnectionCommandHandler
 * Type: Command
 */
export class StartCoreServerConnectionCommandHandler
    implements ICommandHandler {
    public type: ICommandType = START_CORE_SERVER_CONNECTION_COMMAND;
    constructor(
        private readonly _queryService: IQueryService = Inject(IQueryService),
        private readonly _gameSettings: IGameConfiguration = Inject(
            IGameConfiguration
        )
    ) {}
    public handle(): ICommandResult<
        StartCoreServerConnectionCommandResultType
    > {
        const accountQuery = this._queryService.query(
            createGetAccountQuery({})
        );

        const serverUrl = getConfigurationProperty<string>(
            this._gameSettings,
            "coreServerUrl"
        );
        startCoreConnection(serverUrl, accountQuery.result.accessToken);

        return {
            success: true,
        };
    }
}
