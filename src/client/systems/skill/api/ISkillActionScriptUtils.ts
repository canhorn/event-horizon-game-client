export interface ISkillActionScriptUtils {
    sendEvent: (eventName: string, data: any) => void;
    resolveTemplate: (messageTemplate: string, templateData: any) => string;
}
