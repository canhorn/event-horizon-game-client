import { ICommandHandler } from "../../../../engine/command/api/ICommandHandler";
import { ICommandResult } from "../../../../engine/command/api/ICommandResult";
import { ICommandType } from "../../../../engine/command/api/ICommandType";
import { Inject } from "../../../../engine/ioc/Create";
import { IQueryService } from "../../../../engine/query/IQueryService";
import { createGetAccountQuery } from "../../../account/get/GetAccountQuery";
import { createZoneDetailsQuery } from "../../../zone/query/ZoneDetailsQuery";
import { startZonePlayerConnection } from "../state/ZoneConnectionState";
import { START_ZONE_PLAYER_CONNECTION_COMMAND } from "./StartZonePlayerConnectionCommand";

/**
/* Name: StartCoreServerConnectionCommand
/* Type: Command
 */
export class StartZonePlayerConnectionCommandHandler
    implements ICommandHandler {
    public type: ICommandType = START_ZONE_PLAYER_CONNECTION_COMMAND;
    constructor(
        private readonly _queryService: IQueryService = Inject(IQueryService)
    ) {}
    public handle(): ICommandResult {
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
