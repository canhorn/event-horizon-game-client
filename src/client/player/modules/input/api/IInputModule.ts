import { InputOptions } from "../../../../../engine/input/InputModel";
import { IModule } from "../../../../../engine/module/IModule";

/**
 * Name: Input
 * For: Player
 */
export const INPUT_MODULE_NAME = "INPUT_MODULE_NAME";
export interface IInputModule extends IModule {
    registerInput(options: InputOptions): void;
    unRegisterInput(options: InputOptions): void;
    resetToDefaultLayout(): void;
}
