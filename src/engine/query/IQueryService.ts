// TODO: [MODEL] Move these to Model/API
export interface IQuery<D, R> {
    type: string;
    data?: D;
}
export interface IQueryResult<T> {
    success: boolean;
    result: T;
    errorCode?: string;
}
export abstract class IQueryService {
    public abstract query<D, R>(event: IQuery<D, R>): IQueryResult<R>;
    public abstract addListener(
        queryType: string,
        queryListener: (data?: any) => IQueryResult<any>,
        context: any
    ): IQueryService;
    public abstract removeListener(
        queryType: string,
        queryListener: (data?: any) => IQueryResult<any>,
        context: any
    ): IQueryService;
}
export abstract class IQueryHandlerRegister {
    public abstract register(handler: new () => IQueryHandler): void;
    public abstract dispose(): void;
}
export abstract class IQueryListener {
    public abstract function: (data?: any) => IQueryResult<any>;
    public abstract context: Object;
}
export abstract class IQueryHandler {
    public abstract type: string;
    public abstract handle: (data: any) => IQueryResult<any>;
}
