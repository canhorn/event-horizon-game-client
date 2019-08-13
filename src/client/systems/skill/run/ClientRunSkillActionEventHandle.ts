import { isObjectNotDefined } from "../../../../core/object/ObjectCheck";
import { IEventType } from "../../../../engine/event/EventType";
import { IEventHandler } from "../../../../engine/event/IEventService";
import { createLogger } from "../../../../engine/logger/InjectLoggerDecorator";
import { ILogger } from "../../../../engine/logger/LoggerFactory";
import {
    CLIENT_RUN_SKILL_ACTION_EVENT,
    ClientRunSkillActionEventData,
} from "../../../action/api/ClientActions";
import { getSkillActionScript } from "../state/SkillState";

/**
 * Event Name: ClientRunSkillActionEventHandler
 * Type: Event
 */
export class ClientRunSkillActionEventHandler implements IEventHandler {
    public type: IEventType = CLIENT_RUN_SKILL_ACTION_EVENT;
    constructor(
        private readonly _logger: ILogger = createLogger(
            "ClientRunSkillActionEventHandler"
        )
    ) {}
    public handle({ action, data }: ClientRunSkillActionEventData): void {
        const skillActionScript = getSkillActionScript(action);

        if (isObjectNotDefined(skillActionScript)) {
            this._logger.error(`Skill not found: ${action}`, { action, data });
            return;
        }
        skillActionScript.run(data);
    }
}
