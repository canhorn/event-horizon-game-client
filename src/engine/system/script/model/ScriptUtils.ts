import { isObjectDefined } from "../../../../core/object/ObjectCheck";
import { resolveTemplate } from "../../../../core/string/ResolveTemplate";
import { createEvent } from "../../../event/builder/CreateEvent";
import { sendEvent } from "../../../event/builder/SendEvent";
import { runClientScript } from "../../client/scripts/run/RunClientScript";
import { IScriptUtils } from "../api/IScriptUtils";

export class ScriptUtils implements IScriptUtils {
    public isObjectDefined = isObjectDefined;
    public createEvent = createEvent;
    public runClientScript = runClientScript;
    public sendEvent = sendEvent;
    public resolveTemplate = resolveTemplate;
}
