import { Mesh } from "babylonjs";
import { ICommand } from "../../command/api/ICommand";
import { ICommandType } from "../../command/api/ICommandType";
import { CommandType } from "../../command/model/CommandType";

export const LINK_GUI_CONTROL_WITH_MESH_COMMAND = new CommandType(
    "GUI.LINK_GUI_CONTROL_WITH_MESH_COMMAND"
);

export class LinkGuiControlWithMeshCommand implements ICommand {
    public type: ICommandType = LINK_GUI_CONTROL_WITH_MESH_COMMAND;
    constructor(public data: LinkGuiControlWithMeshCommandData) {}
}

export interface LinkGuiControlWithMeshCommandData {
    controlId: string;
    mesh: Mesh;
}
