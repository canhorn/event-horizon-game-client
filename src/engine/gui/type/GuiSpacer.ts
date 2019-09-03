import { Mesh } from "babylonjs";
import { Control, Rectangle } from "babylonjs-gui";
import objectMerge from "../../../core/object/ObjectMerge";
import { IGuiControl, IGuiControlOptions, IGuiGridLocation } from "../api";
import { GuiControlType } from "../model/GuiControlType";

export class GuiSpacer implements IGuiControl {
    public id: string;
    public options: IGuiControlOptions;
    public control: Control;
    public parentId?: string;
    public gridLocation?: IGuiGridLocation;
    get type(): GuiControlType {
        return GuiControlType.SPACER;
    }
    get isVisible(): boolean {
        return this.control.isVisible;
    }
    set isVisible(value: boolean) {
        this.control.isVisible = value;
    }

    constructor(
        id: string,
        options: IGuiControlOptions,
        gridLocation?: IGuiGridLocation
    ) {
        this.id = id;
        this.options = options;
        this.control = createControl(options as GuiSpacerControlOptions);
        this.gridLocation = gridLocation;
    }
    public addControl(guiControl: IGuiControl) {
        throw new Error("GuiSpacer does not support adding of Control.");
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
}

const createControl = (options: GuiSpacerControlOptions): Control => {
    const padding = new Rectangle();
    padding.height = `${options.padding}px`;
    padding.width = `${options.padding}px`;
    padding.thickness = 0;
    padding.isHitTestVisible = false;

    objectMerge(padding, options);

    return padding;
};

export interface GuiSpacerControlOptions extends IGuiControlOptions {
    padding: number;
}
