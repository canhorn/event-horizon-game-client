export const APP_CONFIG: IAppConfig = {
    supportedLocaleList: ["en_US", "de_DE", "fr_FR"],
};

export interface IAppConfig {
    supportedLocaleList: string[];
}
