import { Inject } from "../../../../../core/ioc";
import { IClientScript } from "../api/IClientScript";
import { IClientScriptBuilder } from "../api/IClientScriptBuilder";

export const createClientScriptFromTemplate = (
    id: string,
    templateName: string,
    clientScriptBuilder: IClientScriptBuilder = Inject(IClientScriptBuilder)
): IClientScript => clientScriptBuilder.createScript(id, templateName);
