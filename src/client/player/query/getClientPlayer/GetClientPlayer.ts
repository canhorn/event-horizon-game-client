import { IQuery } from "../../../../core/query";
import { IPlayerEntity } from "../../api/IPlayerEntity";

/**
 * Name: GetClientPlayer
 * NameSpace: Client.Player
 * Type: Query
 */
export const GET_CLIENT_PLAYER = "Client.Player.GET_CLIENT_PLAYER";
class QueryClass
    implements IQuery<GetClientPlayerData, GetClientPlayerResultType> {
    public type: string = GET_CLIENT_PLAYER;
    public data?: GetClientPlayerData;
}
const instanceOfQuery = new QueryClass();
export const createGetClientPlayer = (
    data: GetClientPlayerData
): IQuery<GetClientPlayerData, GetClientPlayerResultType> => {
    instanceOfQuery.data = data;
    return instanceOfQuery;
};
export interface GetClientPlayerData {}
export type GetClientPlayerResultType = IPlayerEntity | undefined;
