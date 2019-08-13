import { ICommandHandlerRegister } from "../command/api/ICommandHandlerRegister";
import { IEventHandlerRegister } from "../event/IEventService";
import { Inject } from "../ioc/Create";
import { IQueryHandlerRegister } from "../query/IQueryService";
import { BuildClientAssetInstanceCommandHandler } from "./client/assets/builder/BuildClientAssetInstanceCommandHandler";
import { DisposeOfClientAssetInstanceCommandHandler } from "./client/assets/dispose/DisposeOfClientAssetInstanceCommandHandler";
import { FetchClientAssetQueryHandler } from "./client/assets/fetch/FetchClientAssetQueryHandler";
import { RegisterClientAssetInstanceCommandHandler } from "./client/assets/register/RegisterClientAssetInstanceCommandHandler";
import { SetClientEntityInstanceCommandHandler } from "./client/entityInstance/set/SetClientEntityInstanceCommandHandler";
import { AddServerModuleScriptHandler } from "./server/add/AddServerModuleScriptHandler";

/**
 * Setup System based handlers.
 *
 * @param eventHandlerRegister Injection;
 * @param queryHandlerRegister Injection;
 * @param commandHandlerRegister Injection;
 */
export const preInitializeEngineSystem = (
    eventHandlerRegister: IEventHandlerRegister = Inject(IEventHandlerRegister),
    queryHandlerRegister: IQueryHandlerRegister = Inject(IQueryHandlerRegister),
    commandHandlerRegister: ICommandHandlerRegister = Inject(
        ICommandHandlerRegister
    )
) => {
    eventHandlerRegister.register(AddServerModuleScriptHandler);

    commandHandlerRegister.register(SetClientEntityInstanceCommandHandler);

    queryHandlerRegister.register(FetchClientAssetQueryHandler);
    commandHandlerRegister.register(BuildClientAssetInstanceCommandHandler);
    commandHandlerRegister.register(RegisterClientAssetInstanceCommandHandler);
    commandHandlerRegister.register(DisposeOfClientAssetInstanceCommandHandler);
};
