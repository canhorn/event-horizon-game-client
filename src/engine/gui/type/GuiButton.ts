import { EventState, Mesh, Observer } from "babylonjs";
import { Button, Vector2WithInfo } from "babylonjs-gui";
import { isObjectDefined } from "../../../core/object/ObjectCheck";
import objectMerge from "../../../core/object/ObjectMerge";
import { IGuiControlOptions, IGuiGridLocation } from "../api";
import { IGuiControl } from "../api/IGuiControl";
import { GuiControlType } from "../model/GuiControlType";
import { IGuiControlOptionsWithAnimation } from "./animation/api/IGuiControlOptionsWithAnimation";
import { runGuiAnimation } from "./animation/RunGuiAnimation";

export class GuiButton implements IGuiControl {
    public id: string;
    public options: GuiButtonControlOptions;
    public control: Button;
    public parentId?: string;
    public gridLocation?: IGuiGridLocation;
    get type(): GuiControlType {
        return GuiControlType.BUTTON;
    }
    get isVisible(): boolean {
        return this.control.isVisible;
    }
    set isVisible(value: boolean) {
        if (!runGuiAnimation(this.control, this.options, value)) {
            this.control.isVisible = value;
        }
    }

    constructor(
        id: string,
        controlOptions: IGuiControlOptions,
        gridLocation?: IGuiGridLocation
    ) {
        this.id = id;
        this.control = createControl(
            id,
            controlOptions as GuiButtonControlOptions
        );
        this.options = controlOptions as GuiButtonControlOptions;
        this.gridLocation = gridLocation;
    }
    public addControl(guiControl: IGuiControl) {
        throw new Error("GuiButton does not support adding of child Controls.");
    }
    public update(options: GuiButtonControlOptions) {
        if (
            isObjectDefined(options.onClick) &&
            isObjectDefined(this.options.onClickObserver)
        ) {
            this.control.onPointerClickObservable.remove(
                this.options.onClickObserver
            );
        }
        updateControl(this.control, options);
        this.options = objectMerge(this.options, options);
    }
    public linkWith(mesh: Mesh) {
        this.control.linkWithMesh(mesh);
    }
    public dispose() {
        this.control.children.forEach(control => control.dispose());
        this.control.dispose();
    }
}

const updateControl = (
    button: Button,
    options: GuiButtonControlOptions
): Button => {
    button.thickness = 0;
    objectMerge(button, options);
    button.background = button.isEnabled
        ? options.background || button.background
        : options.disabledColor || button.disabledColor;
    button.hoverCursor = button.isEnabled
        ? options.hoverCursor || button.hoverCursor || "pointer"
        : options.disabledHoverCursor || button.hoverCursor || "default";
    options.onClickObserver = button.onPointerClickObservable.add(
        options.onClick
    );
    return button;
};

const createControl = (
    idPrefix: string,
    options: GuiButtonControlOptions
): Button => {
    return updateControl(
        Button.CreateSimpleButton(`${idPrefix}-Button`, options.text),
        options
    );
};
export interface GuiButtonControlOptions
    extends IGuiControlOptionsWithAnimation {
    text: string;
    fontSize: number;
    color: string;
    height: number | string;
    background: string;
    disabledColor: string;
    onClick: (eventData: Vector2WithInfo, eventState: EventState) => void;
    onClickObserver: Observer<Vector2WithInfo> | null;

    isVisible?: boolean;
    isDisabled?: boolean;
    width?: number | string;
    paddingRight?: number | string;
    paddingLeft?: number | string;
    paddingBottom?: number | string;
    paddingTop?: number | string;
    hoverCursor?: string;
    disabledHoverCursor?: string;
    vAlignment?: 0 | 1 | 2;
    borderThickness: number;
    linkOffsetY?: number;
}
