import { Dictionary } from "../../core/collection/Dictionary";
import { IDictionary } from "../../core/collection/IDictionary";
import { Inject } from "../ioc/Create";
import { createLogger } from "../logger/InjectLoggerDecorator";
import { ILogger } from "../logger/LoggerFactory";
import { ISystemWindow } from "../system/window/api/ISystemWindow";
import {
    IQuery,
    IQueryListener,
    IQueryResult,
    IQueryService,
} from "./IQueryService";

const SENT_QUERY_LIST: Array<IQuery<any, any>> = [];

export class QueryService implements IQueryService {
    private static QUERY_LISTENER_LIST: IDictionary<
        string,
        IQueryListener
    > = new Dictionary<string, IQueryListener>();

    constructor(
        private readonly _logger: ILogger = createLogger("QueryService"),
        private readonly _window: ISystemWindow = Inject(ISystemWindow)
    ) {
        _window.setProp("SENT_QUERY_LIST", SENT_QUERY_LIST);
    }

    public query<D, R>(query: IQuery<D, R>): IQueryResult<R> {
        SENT_QUERY_LIST.push(query);
        const listener = QueryService.QUERY_LISTENER_LIST.getValue(query.type);
        if (listener) {
            return listener.function.call<Object, [any], {}>(
                listener.context,
                query.data
            ) as IQueryResult<R>;
        }
        this._logger.error("Query listener was not found.", query);
        return {
            success: false,
            result: ("query_listener_not_found" as unknown) as R,
        };
    }

    public addListener(
        type: string,
        listenerFunction: <T>(data: any) => IQueryResult<T>,
        context: any
    ): IQueryService {
        QueryService.QUERY_LISTENER_LIST.setValue(type, {
            function: listenerFunction,
            context,
        });

        return this;
    }

    public removeListener(
        type: string,
        listenerFunction: <T>(data: any) => IQueryResult<T>,
        context: any
    ): IQueryService {
        const listener = QueryService.QUERY_LISTENER_LIST.getValue(type);
        if (
            listener &&
            listener.function === listenerFunction &&
            listener.context === context
        ) {
            QueryService.QUERY_LISTENER_LIST.remove(type);
        }
        return this;
    }
}
