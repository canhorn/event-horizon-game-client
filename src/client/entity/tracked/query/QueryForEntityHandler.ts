import { Inject } from "../../../../engine/ioc/Create";
import {
    IQueryHandler,
    IQueryResult,
} from "../../../../engine/query/IQueryService";
import { ITrackedEntity } from "../../api/ITrackedEntity";
import { IEntityTrackerQueryService } from "../IEntityTrackerServices";
import { QUERY_FOR_ENTITY, QueryForEntityData } from "./QueryForEntity";

/**
 * Name: QueryForEntityHandler
 * Type: Query
 */
export class QueryForEntityHandler implements IQueryHandler {
    public type: string = QUERY_FOR_ENTITY;
    constructor(
        private readonly _entityTrackerService: IEntityTrackerQueryService = Inject(
            IEntityTrackerQueryService
        )
    ) {}
    public handle({
        not,
        tag,
    }: QueryForEntityData): IQueryResult<ITrackedEntity[]> {
        return {
            success: true,
            result: not
                ? this._entityTrackerService.queryByNotTag(tag)
                : this._entityTrackerService.queryByTag(tag),
        };
    }
}
