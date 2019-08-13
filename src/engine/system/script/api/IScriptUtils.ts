import { IEvent } from "../../../event/EventType";

export abstract class IScriptUtils {
    public abstract isObjectDefined(obj: any): boolean;
    public abstract createEvent(event: string, data?: any): IEvent;
    public abstract runClientScript(id: string, name: string, data: any): void;
    public abstract resolveTemplate(
        messageTemplate: string,
        templateData: any
    ): string;
    public abstract sendEvent(eventName: string, data: any): void;
}
