import { AdvancedDynamicTexture } from "babylonjs-gui";
// Example: https://www.babylonjs-playground.com/#KX33X8#60

export interface IGuiCanvas {
    root: AdvancedDynamicTexture;
    initialize(): void;
    dispose(): void;
}
