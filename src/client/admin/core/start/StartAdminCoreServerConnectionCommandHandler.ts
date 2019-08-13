import { ICommandHandler } from "../../../../engine/command/api/ICommandHandler";
import { ICommandResult } from "../../../../engine/command/api/ICommandResult";
import { ICommandType } from "../../../../engine/command/api/ICommandType";
import { Inject } from "../../../../engine/ioc/Create";
import { IQueryService } from "../../../../engine/query/IQueryService";
import { IAccountState } from "../../../account/api/IAccountState";
import { createGetAccountQuery } from "../../../account/get/GetAccountQuery";
import { startCoreAdminConnection } from "../state/CoreAdminConnectionState";
import { START_ADMIN_CORE_SERVER_CONNECTION_COMMAND } from "./StartAdminCoreServerConnectionCommand";
import { StartAdminCoreServerConnectionCommandData } from "./StartAdminCoreServerConnectionCommand";

/**
 * Name: StartAdminCoreServerConnectionCommand
 * Type: Command
 */
export class StartAdminCoreServerConnectionCommandHandler
    implements ICommandHandler {
    public type: ICommandType = START_ADMIN_CORE_SERVER_CONNECTION_COMMAND;
    constructor(
        private readonly _queryService: IQueryService = Inject(IQueryService)
    ) {}
    public handle({
        serverUrl,
        accessToken,
    }: StartAdminCoreServerConnectionCommandData): ICommandResult {
        startCoreAdminConnection(serverUrl, accessToken);
        return {
            success: true,
        };
    }
}
