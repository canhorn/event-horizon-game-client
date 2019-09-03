import { IQueryHandler, IQueryResult } from "../../../core/query";
import { IAccountState } from "../api/IAccountState";
import { getAccountState } from "../state/AccountState";
import { GET_ACCOUNT_QUERY } from "./GetAccountQuery";

/**
/* Name: GetAccountQueryHandler
/* Type: Query
**/
export class GetAccountQueryHandler implements IQueryHandler {
    public type: string = GET_ACCOUNT_QUERY;
    constructor() {}
    public handle(data: any): IQueryResult<IAccountState> {
        return {
            success: true,
            result: getAccountState(),
        };
    }
}
