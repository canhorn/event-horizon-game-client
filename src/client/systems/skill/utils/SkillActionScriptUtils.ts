import { IEventService } from "../../../../core/event";
import { Inject } from "../../../../core/ioc";
import { resolveTemplate } from "../../../../core/string/ResolveTemplate";
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
