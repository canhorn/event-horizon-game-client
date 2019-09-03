import {
    ICommandHandler,
    ICommandResult,
    ICommandType,
} from "../../../../core/command";
import { Inject } from "../../../../core/ioc";
import { IQueryService } from "../../../../core/query";
import { createGetAccountQuery } from "../../../account/get/GetAccountQuery";
import { createZoneDetailsQuery } from "../../../zone/query/ZoneDetailsQuery";
import { startZonePlayerConnection } from "../state/ZoneConnectionState";
import {
    START_ZONE_PLAYER_CONNECTION_COMMAND,
    StartZonePlayerConnectionCommandResultType,
} from "./StartZonePlayerConnectionCommand";

/**
 * Name: StartCoreServerConnectionCommand
 * Type: Command
 */
export class StartZonePlayerConnectionCommandHandler
    implements ICommandHandler {
    public type: ICommandType = START_ZONE_PLAYER_CONNECTION_COMMAND;
    constructor(
        private readonly _queryService: IQueryService = Inject(IQueryService)
    ) {}
    public handle(): ICommandResult<
        StartZonePlayerConnectionCommandResultType
    > {
        const { result: zoneDetails } = this._queryService.query(
            createZoneDetailsQuery({})
        );
        const { result: accountQuery } = this._queryService.query(
            createGetAccountQuery({})
        );

        startZonePlayerConnection(
            zoneDetails.serverAddress,
            accountQuery.accessToken
        );

        return {
            success: true,
        };
    }
}
