import { Mesh } from "babylonjs";
import { InputText } from "babylonjs-gui";
import { autobind } from "../../../core/autobind/autobind";
import objectMerge from "../../../core/object/ObjectMerge";
import { IGuiControl, IGuiControlOptions, IGuiGridLocation } from "../api";
import { GuiControlType } from "../model/GuiControlType";

export class GuiInput implements IGuiControl {
    public id: string;
    public options: GuiInputControlOptions;
    public control: InputText;
    public parentId?: string;
    public gridLocation?: IGuiGridLocation;
    get type(): GuiControlType {
        return GuiControlType.INPUT;
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
        this.options = options as GuiInputControlOptions;
        this.control = createControl(this.options);
        this.gridLocation = gridLocation;
        if (this.options.onClick) {
            this.control.processKey = this.processEnterKey;
        }
    }
    public addControl(guiControl: IGuiControl) {
        throw new Error("GuiInput does not support adding of Control.");
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

    @autobind
    private processEnterKey(keyCode: number, key: string, evt?: KeyboardEvent) {
        if (keyCode === 13) {
            this.options.onClick(this.control.text);
        }
        InputText.prototype.processKey.call(this.control, keyCode, key);
    }
}

const createControl = (options: GuiInputControlOptions): InputText => {
    const padding = new InputText();

    objectMerge(padding, options);

    return padding;
};

export interface GuiInputControlOptions extends IGuiControlOptions {
    alpha: number;
    autoStretchWidth: boolean;
    width: string;
    height: string;
    fontSize: number;
    horizontalAlignment: 0 | 1 | 2;
    verticalAlignment?: 0 | 1 | 2;
    color: string;
    background: string;
    placeholderText: string;
    focusedBackground: string;
    left: number;
    top: number;
    thickness: number;
    cornerRadius: number;

    onClick: (text: string) => void;
}
