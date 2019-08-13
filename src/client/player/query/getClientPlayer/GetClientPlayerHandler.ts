import {
    IQueryHandler,
    IQueryResult,
} from "../../../../engine/query/IQueryService";
import { getClientPlayer } from "../../state/PlayerState";
import {
    GET_CLIENT_PLAYER,
    GetClientPlayerData,
    GetClientPlayerResultType,
} from "./GetClientPlayer";

/**
 * Name: GetClientPlayerHandler
 * Type: Query
 */
export class GetClientPlayerHandler implements IQueryHandler {
    public type: string = GET_CLIENT_PLAYER;
    public handle(
        data: GetClientPlayerData
    ): IQueryResult<GetClientPlayerResultType> {
        return {
            success: true,
            result: getClientPlayer(),
        };
    }
}
