import { IQueryHandler, IQueryResult } from "../../../core/query";
import { generateGuiControlId } from "../utils/GenerateGuiControlId";
import {
    QUERY_FOR_GENERATE_GUI_CONTROL_ID,
    QueryForGenerateGuiControlIdData,
    QueryForGenerateGuiControlIdResultType,
} from "./QueryForGenerateGuiControlId";

/**
 * Name: QueryForGenerateGuiControlIdHandler
 * Type: Query
 */
export class QueryForGenerateGuiControlIdHandler implements IQueryHandler {
    public type: string = QUERY_FOR_GENERATE_GUI_CONTROL_ID;
    public handle({
        guiId,
        controlId,
    }: QueryForGenerateGuiControlIdData): IQueryResult<
        QueryForGenerateGuiControlIdResultType
    > {
        return {
            success: true,
            result: generateGuiControlId(guiId, controlId),
        };
    }
}
