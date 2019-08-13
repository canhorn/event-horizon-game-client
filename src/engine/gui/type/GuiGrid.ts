import { Mesh } from "babylonjs";
import { Container, Grid } from "babylonjs-gui";
import { isObjectNotDefined } from "../../../core/object/ObjectCheck";
import objectMerge from "../../../core/object/ObjectMerge";
import { ErrorCode } from "../../assert/Assert";
import {
    GuiControl,
    GuiControlOptions,
    GuiControlType,
    GuiGridLocation,
} from "../model";

export class GuiGrid implements GuiControl {
    public id: string;
    public options: GuiControlOptions;
    public control: Grid;
    public parentId?: string;
    public gridLocation?: GuiGridLocation;
    get type(): GuiControlType {
        return GuiControlType.Grid;
    }
    get isVisible(): boolean {
        return this.control.isVisible;
    }
    set isVisible(value: boolean) {
        this.control.isVisible = value;
    }

    constructor(
        id: string,
        options: GuiControlOptions,
        gridLocation?: GuiGridLocation
    ) {
        this.id = id;
        this.options = options;
        this.control = createControl(options as GuiGridControlOptions);
        this.gridLocation = gridLocation;
    }
    public addControl(guiControl: GuiControl) {
        if (!guiControl.gridLocation) {
            throw new ErrorCode(
                "Grid Location is required in GuiGrid",
                "invalid_grid_location"
            );
        }
        this.control.addControl(
            guiControl.control,
            guiControl.gridLocation.row,
            guiControl.gridLocation.column
        );
        correctCellsHitTestVisible((this.control as unknown) as IGridWithCells);
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
}

/**
 * This updates the internal cells of a controls to make them also transparent to mouse clicks.
 * @param control The exposed _cells based control
 */
const correctCellsHitTestVisible = (control: IGridWithCells): void => {
    const cells = control._cells;
    if (isObjectNotDefined(cells)) {
        return;
    }
    for (const cell in cells) {
        cells[cell].isHitTestVisible = false;
    }
};

interface IGridWithCells {
    _cells: { [key: string]: Container };
}

const createControl = (options: GuiGridControlOptions): Grid => {
    const grid = new Grid();
    grid.isHitTestVisible = false;

    grid.background = options.backgroundColor;

    grid.paddingBottom = `${options.paddingBottom}px`;
    grid.paddingTop = `${options.paddingTop}px`;
    grid.paddingLeft = `${options.paddingLeft}px`;
    grid.paddingRight = `${options.paddingRight}px`;

    objectMerge(grid, options);

    const columnCount = options.column || 0;
    for (let index = 0; index < columnCount; index++) {
        grid.addColumnDefinition(1);
    }

    const rowCount = options.row || 0;
    for (let index = 0; index < rowCount; index++) {
        grid.addRowDefinition(1);
    }

    return grid;
};

export interface GuiGridControlOptions extends GuiControlOptions {
    column: number;
    row: number;
    backgroundColor: string;
    paddingBottom: number;
    paddingTop: number;
    paddingLeft: number;
    paddingRight: number;
}
