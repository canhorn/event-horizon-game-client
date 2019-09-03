import { Mesh } from "babylonjs";
import { ScrollViewer } from "babylonjs-gui";
import { Inject } from "../../../core/ioc";
import { isObjectDefined } from "../../../core/object/ObjectCheck";
import objectMerge from "../../../core/object/ObjectMerge";
import { ISystemWindow } from "../../../core/window";
import { IGuiControl, IGuiControlOptions, IGuiGridLocation } from "../api";
import { GuiControlType } from "../model/GuiControlType";

export class GuiScrollViewer implements IGuiControl {
    get type(): GuiControlType {
        return GuiControlType.SCROLL_VIEWER;
    }
    get isVisible(): boolean {
        return this.control.isVisible;
    }
    set isVisible(value: boolean) {
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
    public options: GuiScrollViewerControlOptions;
    public control: ScrollViewer;
    public parentId?: string;
    public gridLocation?: IGuiGridLocation;

    private _alphaTransitionHandler: number = 1;

    constructor(
        id: string,
        options: IGuiControlOptions,
        gridLocation?: IGuiGridLocation,
        private readonly _window: ISystemWindow = Inject(ISystemWindow)
    ) {
        this.id = id;
        this.options = options as GuiScrollViewerControlOptions;
        this.control = createControl(this.options);
        this.gridLocation = gridLocation;
    }
    public addControl(guiControl: IGuiControl) {
        this.control.addControl(guiControl.control);
    }
    public update(options: IGuiControlOptions) {
        throw new Error("Method not implemented.");
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

const createControl = (options: GuiScrollViewerControlOptions): ScrollViewer =>
    objectMerge(new ScrollViewer(), options);

export interface GuiScrollViewerControlOptions extends IGuiControlOptions {
    animation?: IGuiAnimationOptions;
}

// TODO: Move this into to api and validation namespaces, will be used in other controls; ie GuiBar
export const isValidAnimation = (animation: IGuiAnimationOptions): boolean => {
    return (
        isObjectDefined(animation.isEnabled) &&
        isObjectDefined(animation.transition) &&
        isObjectDefined(animation.transitionEnd) &&
        isObjectDefined(animation.transitionStart) &&
        isObjectDefined(animation.transitionTime)
    );
};
export interface IGuiAnimationOptions {
    isEnabled: boolean;
    transition: number;
    transitionStart: number;
    transitionEnd: number;
    transitionTime: number;
}
