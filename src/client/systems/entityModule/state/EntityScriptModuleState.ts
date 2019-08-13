import { Dictionary } from "../../../../core/collection/Dictionary";
import { IDictionary } from "../../../../core/collection/IDictionary";
import { IEntityScriptModule } from "../api/IEntityScriptModule";

const STATE: IEntityScriptModuleState = {
    base: new Dictionary(),
    player: new Dictionary(),
};

export const setBaseScriptModule = (
    baseScriptModule: IEntityScriptModule
): void => {
    STATE.base.setValue(baseScriptModule.name, baseScriptModule);
};
export const getBaseScriptModules = (): IEntityScriptModule[] =>
    STATE.base.values();

export const setPlayerScriptModule = (
    playerScriptModule: IEntityScriptModule
): void => {
    STATE.player.setValue(playerScriptModule.name, playerScriptModule);
};
export const getPlayerScriptModules = (): IEntityScriptModule[] =>
    STATE.player.values();

interface IEntityScriptModuleState {
    base: IDictionary<string, IEntityScriptModule>;
    player: IDictionary<string, IEntityScriptModule>;
}
