import { ICommandHandler } from "../../../../engine/command/api/ICommandHandler";
import { ICommandResult } from "../../../../engine/command/api/ICommandResult";
import { ICommandType } from "../../../../engine/command/api/ICommandType";
import { Inject } from "../../../../engine/ioc/Create";
import { IQueryService } from "../../../../engine/query/IQueryService";
import {
    getConfigurationProperty,
    IGameConfiguration,
} from "../../../../engine/settings/IGameSettings";
import { createGetAccountQuery } from "../../../account/get/GetAccountQuery";
import { startCoreConnection } from "../state/CoreConnectionState";
import { START_CORE_SERVER_CONNECTION_COMMAND } from "./StartCoreServerConnectionCommand";

/**
/* Name: StartCoreServerConnectionCommand
/* Type: Command
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
    public handle(): ICommandResult {
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
