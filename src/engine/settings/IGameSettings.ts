export abstract class IGameConfiguration {
    public abstract appendToTag: string;
    [key: string]: any;
}

export const getConfigurationProperty = <T>(
    configuration: IGameConfiguration,
    property: string
): T => configuration[property] as T;
