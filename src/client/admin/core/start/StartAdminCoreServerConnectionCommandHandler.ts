import {
    ICommandHandler,
    ICommandResult,
    ICommandType,
} from "../../../../core/command";
import { Inject } from "../../../../core/ioc";
import { IQueryService } from "../../../../core/query";
import { startCoreAdminConnection } from "../state/CoreAdminConnectionState";
import {
    START_ADMIN_CORE_SERVER_CONNECTION_COMMAND,
    StartAdminCoreServerConnectionCommandData,
    StartAdminCoreServerConnectionCommandResultType,
} from "./StartAdminCoreServerConnectionCommand";

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
    }: StartAdminCoreServerConnectionCommandData): ICommandResult<
        StartAdminCoreServerConnectionCommandResultType
    > {
        startCoreAdminConnection(serverUrl, accessToken);
        return {
            success: true,
        };
    }
}
