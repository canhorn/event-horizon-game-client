import { Mesh } from "babylonjs";
import { Rectangle } from "babylonjs-gui";
import { Inject } from "../../../core/ioc";
import objectMerge from "../../../core/object/ObjectMerge";
import { ISystemWindow } from "../../../core/window/api/ISystemWindow";
import { IGuiControl, IGuiControlOptions, IGuiGridLocation } from "../api";
import { IGuiAnimationOptions } from "../api/IGuiAnimationOptions";
import { GuiControlType } from "../model/GuiControlType";
import { isValidAnimation } from "./animation/IsValidAnimation";

export class GuiContainer implements IGuiControl {
    get type(): GuiControlType {
        return GuiControlType.CONTAINER;
    }
    get isVisible(): boolean {
        return this.control.isVisible;
    }
    set isVisible(value: boolean) {
        this.control.alpha = this._originalAlpha;
        this._window.clearInterval(this._alphaTransitionHandler);
        if (
            this.options.animation &&
            isValidAnimation(this.options.animation) &&
            this.options.animation.isEnabled
        ) {
            if (value) {
                this.control.isVisible = true;
                // Start the countdown to 1 alpha
                this.control.alpha = this.options.animation.transitionStart;
                this._alphaTransitionHandler = this.setupOpenTransitionHandler(
                    this.options.animation
                );
            } else {
                this._alphaTransitionHandler = this.setupCloseTransitionHandler(
                    this.options.animation
                );
            }
        } else {
            this.control.isVisible = value;
        }
    }
    public id: string;
    public options: GuiContainerControlOptions;
    public control: Rectangle;
    public parentId?: string;
    public gridLocation?: IGuiGridLocation;

    private _originalAlpha: number = 1;
    private _alphaTransitionHandler: number = 1;

    constructor(
        id: string,
        options: IGuiControlOptions,
        gridLocation?: IGuiGridLocation,
        private readonly _window: ISystemWindow = Inject(ISystemWindow)
    ) {
        this.id = id;
        this.options = options as GuiContainerControlOptions;
        this.control = createControl(id, options as GuiContainerControlOptions);
        this.gridLocation = gridLocation;
        this._originalAlpha = this.control.alpha;
    }
    public addControl(guiControl: IGuiControl) {
        this.control.addControl(guiControl.control);
    }
    public update(options: GuiContainerControlOptions) {
        throw new Error("GuiContainer does not support updating.");
    }
    public linkWith(mesh: Mesh) {
        this.control.linkWithMesh(mesh);
    }
    public dispose() {
        this.control.dispose();
    }
    private setupOpenTransitionHandler(animation: IGuiAnimationOptions) {
        const { transition, transitionEnd, transitionTime } = animation;
        return this._window.setInterval(() => {
            const { control } = this;
            control.alpha = control.alpha + transition;
            if (control.alpha >= transitionEnd) {
                control.alpha = transitionEnd;
                this._window.clearInterval(this._alphaTransitionHandler);
            }
        }, transitionTime);
    }
    private setupCloseTransitionHandler(animation: IGuiAnimationOptions) {
        const { transition, transitionStart, transitionTime } = animation;
        return this._window.setInterval(() => {
            const { control } = this;
            control.alpha = control.alpha - transition;
            if (control.alpha <= transitionStart) {
                control.alpha = transitionStart;
                this._window.clearInterval(this._alphaTransitionHandler);
                this.control.isVisible = false;
            }
        }, transitionTime);
    }
}

const createControl = (
    idPrefix: string,
    options: GuiContainerControlOptions
): Rectangle => {
    const background = new Rectangle(`${idPrefix}-Container`);
    background.isHitTestVisible = false;
    background.thickness = 0;

    objectMerge(background, options);

    return background;
};
export interface GuiContainerControlOptions extends IGuiControlOptions {
    width: number | string;
    height: number | string;
    alpha: number;
    horizontalAlignment: 0 | 1 | 2;
    verticalAlignment?: 0 | 1 | 2;
    background: string;
    cornerRadius: number;
    left: number;
    top: number;
    thickness: number;
    adaptHeightToChildren: boolean;
    animation?: IGuiAnimationOptions;
}
