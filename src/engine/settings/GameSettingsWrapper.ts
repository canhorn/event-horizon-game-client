import { IGameConfiguration } from "./IGameSettings";

export class GameSettingsWrapper implements IGameConfiguration {
    public appendToTag: string = "";
    constructor(configuration: IGameConfiguration) {
        Object.assign(this, configuration);
    }
}
