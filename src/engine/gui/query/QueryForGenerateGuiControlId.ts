import { IQuery } from "../../../core/query";

/**
 * Name: QueryForGenerateGuiControlId
 * NameSpace: Engine.Gui
 * Type: Query
 */
export const QUERY_FOR_GENERATE_GUI_CONTROL_ID =
    "Engine.Gui.QUERY_FOR_GENERATE_GUI_CONTROL_ID";
class QueryClass
    implements
        IQuery<
            QueryForGenerateGuiControlIdData,
            QueryForGenerateGuiControlIdResultType
        > {
    public type: string = QUERY_FOR_GENERATE_GUI_CONTROL_ID;
    public data?: QueryForGenerateGuiControlIdData;
}
const instanceOfQuery = new QueryClass();
export const createQueryForGenerateGuiControlId = (
    data: QueryForGenerateGuiControlIdData
): IQuery<
    QueryForGenerateGuiControlIdData,
    QueryForGenerateGuiControlIdResultType
> => {
    instanceOfQuery.data = data;
    return instanceOfQuery;
};
export interface QueryForGenerateGuiControlIdData {
    guiId: string;
    controlId: string;
}
export type QueryForGenerateGuiControlIdResultType = string;
