import { Mesh } from "babylonjs";
import { StackPanel } from "babylonjs-gui";
import { Inject } from "../../../core/ioc";
import objectMerge from "../../../core/object/ObjectMerge";
import { ISystemWindow } from "../../../core/window";
import { IGuiControl, IGuiControlOptions, IGuiGridLocation } from "../api";
import { GuiControlType } from "../model/GuiControlType";
import { IGuiControlOptionsWithAnimation } from "./animation/api/IGuiControlOptionsWithAnimation";
import { runGuiAnimation } from "./animation/RunGuiAnimation";

export class GuiPanel implements IGuiControl {
    get type(): GuiControlType {
        return GuiControlType.PANEL;
    }
    get isVisible(): boolean {
        return this.control.isVisible;
    }
    set isVisible(value: boolean) {
        if (!runGuiAnimation(this.control, this.options, value)) {
            this.control.isVisible = value;
        }
    }
    public id: string;
    public options: GuiPanelControlOptions;
    public control: StackPanel;
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
        this.options = options as GuiPanelControlOptions;
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
}

const createControl = (options: GuiPanelControlOptions): StackPanel => {
    const panel = new StackPanel();

    objectMerge(panel, options);

    return panel;
};

export interface GuiPanelControlOptions
    extends IGuiControlOptionsWithAnimation {
    top?: number;
    isVertical?: boolean;
    enableScrolling?: boolean;
    horizontalAlignment: 0 | 1 | 2;
    verticalAlignment?: 0 | 1 | 2;
}
