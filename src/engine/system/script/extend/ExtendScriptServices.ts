import objectMerge from "../../../../core/object/ObjectMerge";
import { Inject } from "../../../ioc/Create";
import { IScriptServices } from "../api/IScriptServices";

/**
 * This will extend the IScriptServices with a new service.
 * The serviceInstance should be structured in a way so it does
 *  not need to by dynamically setup on each call to IScriptService Injections.
 *
 * @param serviceName The name of the service to add.
 * @param serviceInstance The instance that should be used.
 * @param scriptServices The instances to the ScriptServices that these will live on.
 */
export const extendScriptServices = (
    serviceName: string,
    serviceInstance: any,
    scriptServices = Inject(IScriptServices)
) => {
    objectMerge(scriptServices, {
        [serviceName]: serviceInstance,
    });
};
