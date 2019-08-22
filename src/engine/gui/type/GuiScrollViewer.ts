import { Mesh } from "babylonjs";
import { Control, Rectangle, ScrollViewer, StackPanel } from "babylonjs-gui";
import { isObjectDefined } from "../../../core/object/ObjectCheck";
import objectMerge from "../../../core/object/ObjectMerge";
import { Inject } from "../../ioc/Create";
import { ISystemWindow } from "../../system/window/api/ISystemWindow";
import {
    GuiControl,
    GuiControlOptions,
    GuiControlType,
    GuiGridLocation,
} from "../model";

const _pointerPointerOver: boolean = false;

/**
 * BUG: Issue with buttons on animation transition.
 * They get stuck after the first open/close transition
 */
export class GuiScrollViewer implements GuiControl {
    get type(): GuiControlType {
        return GuiControlType.Panel;
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
    public gridLocation?: GuiGridLocation;

    private _alphaTransitionHandler: number = 1;

    constructor(
        id: string,
        options: GuiControlOptions,
        gridLocation?: GuiGridLocation,
        private readonly _window: ISystemWindow = Inject(ISystemWindow)
    ) {
        this.id = id;
        this.options = options as GuiScrollViewerControlOptions;
        this.control = createControl(this.options);
        this.gridLocation = gridLocation;
    }
    public addControl(guiControl: GuiControl) {
        this.control.addControl(guiControl.control);
    }
    public update(options: GuiControlOptions) {
        throw new Error("Method not implemented.");
    }
    public linkWithMesh(mesh: Mesh) {
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

export interface GuiScrollViewerControlOptions extends GuiControlOptions {
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
