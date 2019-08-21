import { Mesh } from "babylonjs";
import { Control, Rectangle, StackPanel } from "babylonjs-gui";
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
export class GuiPanel implements GuiControl {
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
    public options: GuiPanelControlOptions;
    public control: Control;
    public innerControl: StackPanel;
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
        this.options = options as GuiPanelControlOptions;
        const [control, stackPanel] = createControl(this.id, this.options);
        this.control = control;
        this.innerControl = stackPanel;
        this.gridLocation = gridLocation;
    }
    public addControl(guiControl: GuiControl) {
        this.innerControl.addControl(guiControl.control);
    }
    public update(options: GuiControlOptions) {
        throw new Error("Method not implemented.");
    }
    public linkWithMesh(mesh: Mesh) {
        this.control.linkWithMesh(mesh);
    }
    public dispose() {
        this.innerControl.dispose();
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
    options: GuiPanelControlOptions
): [Control, StackPanel] => {
    const panel = new StackPanel();
    panel.isHitTestVisible = false;
    panel.horizontalAlignment = 0;
    panel.verticalAlignment = 0;

    objectMerge(panel, options);

    if (options.enableScrolling) {
        // Will need to update BabylonJS version
        // TODO: Implement: https://doc.babylonjs.com/how_to/scrollviewer
        // // To enable scrolling we also need to force hit detection to true.
        // rectangle.isHitTestVisible = true;
        // const onMouseWheelEvent: EventListenerOrEventListenerObject = event => {
        //     const wheelEvent = event as WheelEvent;
        //     if (_pointerPointerOver && isObjectDefined(panel.parent)) {
        //         if (wheelEvent.deltaY > 0) {
        //             // Scroll Text Area Down
        //             if (
        //                 panel.heightInPixels + panel.topInPixels >
        //                 panel.parent.heightInPixels
        //             ) {
        //                 panel.top = panel.topInPixels - 5;
        //             }
        //         }
        //         if (wheelEvent.deltaY < 0) {
        //             // Push Text Area Up
        //             panel.top = panel.topInPixels + 5;
        //             if (panel.topInPixels >= 0) {
        //                 panel.top = 0;
        //             }
        //         }
        //     }
        // };
        // rectangle.onPointerEnterObservable.add(() => {
        //     _pointerPointerOver = true;
        //     document.addEventListener("mousewheel", onMouseWheelEvent, false);
        // });
        // rectangle.onPointerOutObservable.add(() => {
        //     _pointerPointerOver = false;
        //     document.removeEventListener(
        //         "mousewheel",
        //         onMouseWheelEvent,
        //         false
        //     );
        // });
    }
    return [panel, panel];
};

export interface GuiPanelControlOptions extends GuiControlOptions {
    top?: number;
    isVertical?: boolean;
    enableScrolling?: boolean;
    horizontalAlignment: 0 | 1 | 2;
    verticalAlignment?: 0 | 1 | 2;
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
