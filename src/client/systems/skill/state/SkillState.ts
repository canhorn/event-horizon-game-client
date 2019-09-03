import { ErrorCode } from "../../../../core/assert/Assert";
import { Dictionary } from "../../../../core/collection/Dictionary";
import { isObjectNotDefined } from "../../../../core/object/ObjectCheck";
import { IClientScript } from "../../../../engine/system/client/scripts/api/IClientScript";
import { createClientScriptFromTemplate } from "../../../../engine/system/client/scripts/create/CreateScriptFromTemplate";

const ACTION_SCRIPT_CACHE = new Dictionary<string, IClientScript>();

export const getSkillActionScript = (action: string): IClientScript => {
    if (!ACTION_SCRIPT_CACHE.containsKey(action)) {
        ACTION_SCRIPT_CACHE.setValue(
            action,
            createClientScriptFromTemplate(action, action)
        );
    }
    const script = ACTION_SCRIPT_CACHE.getValue(action);
    if (isObjectNotDefined(script)) {
        throw new ErrorCode("Invalid action Script", "invalid_action_script");
    }
    return script;
};
