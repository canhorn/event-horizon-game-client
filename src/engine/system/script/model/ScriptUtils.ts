import { createEvent } from "../../../../core/event/builder/CreateEvent";
import { sendEvent } from "../../../../core/event/builder/SendEvent";
import { isObjectDefined } from "../../../../core/object/ObjectCheck";
import { resolveTemplate } from "../../../../core/string/ResolveTemplate";
import { runClientScript } from "../../client/scripts/run/RunClientScript";
import { IScriptUtils } from "../api/IScriptUtils";

export class ScriptUtils implements IScriptUtils {
    public isObjectDefined = isObjectDefined;
    public createEvent = createEvent;
    public runClientScript = runClientScript;
    public sendEvent = sendEvent;
    public resolveTemplate = resolveTemplate;
}
