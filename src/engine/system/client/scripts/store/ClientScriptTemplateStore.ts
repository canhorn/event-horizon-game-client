import { Dictionary } from "../../../../../core/collection/Dictionary";
import { IDictionary } from "../../../../../core/collection/IDictionary";
import { IClientScriptTemplate } from "../api/IClientScriptTemplate";

const CLIENT_SCRIPT_TEMPLATE_STORE: IDictionary<
    string,
    IClientScriptTemplate
> = new Dictionary<string, IClientScriptTemplate>();

export const allClientScriptTemplates = () =>
    CLIENT_SCRIPT_TEMPLATE_STORE.values();

export const getClientScriptTemplate = (
    scriptName: string
): IClientScriptTemplate | undefined =>
    CLIENT_SCRIPT_TEMPLATE_STORE.getValue(scriptName);

export const containsClientScriptTemplate = (name: string): boolean =>
    CLIENT_SCRIPT_TEMPLATE_STORE.containsKey(name);

export const setClientScriptTemplate = (
    template: IClientScriptTemplate
): IClientScriptTemplate =>
    CLIENT_SCRIPT_TEMPLATE_STORE.setValue(template.name, template);

export const removeClientScriptTemplate = (
    name: string
): IClientScriptTemplate | undefined =>
    CLIENT_SCRIPT_TEMPLATE_STORE.remove(name);
