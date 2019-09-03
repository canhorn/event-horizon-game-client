import { createSingletonService } from "../../core/ioc";
import { IClientScriptBuilder } from "./client/scripts/api/IClientScriptBuilder";
import { ClientScriptBuilder } from "./client/scripts/create/ClientScriptBuilder";
import { IScriptServices } from "./script/api/IScriptServices";
import { IScriptUtils } from "./script/api/IScriptUtils";
import { ScriptServices } from "./script/model/ScriptServices";
import { ScriptUtils } from "./script/model/ScriptUtils";

export const setupEngineSystemServices = () => {
    createSingletonService(IClientScriptBuilder, ClientScriptBuilder);
    createSingletonService(IScriptUtils, ScriptUtils);
    createSingletonService(IScriptServices, ScriptServices);
};
