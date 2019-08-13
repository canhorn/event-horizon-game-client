import { resolveTemplate } from "../../../../core/string/ResolveTemplate";
import { IEventService } from "../../../../engine/event/IEventService";
import { Inject } from "../../../../engine/ioc/Create";
import { ISkillActionScriptUtils } from "../api/ISkillActionScriptUtils";

export const buildSkillActionScriptUtils = (
    eventService: IEventService = Inject(IEventService)
): ISkillActionScriptUtils => ({
    sendEvent: (eventName: string, data: any) =>
        eventService.publish({
            type: {
                key: eventName,
            },
            data,
        }),
    resolveTemplate,
});
