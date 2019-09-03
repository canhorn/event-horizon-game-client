import { Inject } from "../../../../../core/ioc";
import {
    createLogger,
    ILogger,
    ILoggerFactory,
} from "../../../../../core/logger";
import { IClientScript } from "../api/IClientScript";
import { IClientScriptBuilder } from "../api/IClientScriptBuilder";
import { ClientScript } from "../model/ClientScript";
import { getClientScriptTemplate } from "../store/ClientScriptTemplateStore";

export class ClientScriptBuilder implements IClientScriptBuilder {
    constructor(
        private readonly _logger: ILogger = createLogger("ClientScriptBuilder"),
        private readonly _loggerFactory: ILoggerFactory = Inject(ILoggerFactory)
    ) {}

    public createScript(scriptId: string, scriptName: string): IClientScript {
        const scriptTemplate = getClientScriptTemplate(scriptName);
        if (!scriptTemplate) {
            this._logger.debug("Invalid Script Name", { scriptId, scriptName });
            throw {
                code: "invalid_script_name",
                data: {
                    scriptName,
                },
            };
        }
        return new ClientScript(
            scriptId,
            this._loggerFactory.create(
                `Client_Script_${scriptName}_${scriptId}`
            ),
            scriptTemplate.scriptString
        );
    }
}
