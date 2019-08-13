import { Inject } from "../ioc/Create";
import {
    IQueryHandler,
    IQueryHandlerRegister,
    IQueryService,
} from "./IQueryService";

export class QueryHandlerRegister implements IQueryHandlerRegister {
    private static HANDLERS: IQueryHandler[] = [];

    constructor(
        private readonly _queryService: IQueryService = Inject(IQueryService)
    ) {}

    public register(HandlerType: new () => IQueryHandler): void {
        const handler = new HandlerType();
        this._queryService.addListener(handler.type, handler.handle, handler);
        QueryHandlerRegister.HANDLERS.push(handler);
    }
    public dispose(): void {
        QueryHandlerRegister.HANDLERS.forEach(handler => {
            this._queryService.removeListener(
                handler.type,
                handler.handle,
                handler
            );
        });
        QueryHandlerRegister.HANDLERS = [];
    }
}
