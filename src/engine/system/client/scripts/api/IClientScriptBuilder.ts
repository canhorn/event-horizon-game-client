import { IClientScript } from "./IClientScript";

export abstract class IClientScriptBuilder {
    public abstract createScript(
        scriptId: string,
        scriptName: string
    ): IClientScript;
}
