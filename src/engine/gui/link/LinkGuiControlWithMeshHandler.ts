import { ICommandHandler } from "../../command/api/ICommandHandler";
import { ICommandResult } from "../../command/api/ICommandResult";
import { ICommandType } from "../../command/api/ICommandType";
import { Inject } from "../../ioc/Create";
import { IRenderingGui } from "../../renderer/api/IRenderingGui";
import { getGuiControl } from "../store/control/GuiControlStore";
import {
    LINK_GUI_CONTROL_WITH_MESH_COMMAND,
    LinkGuiControlWithMeshCommandData,
} from "./LinkGuiControlWithMeshCommand";

export class LinkGuiControlWithMeshHandler implements ICommandHandler {
    public type: ICommandType = LINK_GUI_CONTROL_WITH_MESH_COMMAND;

    constructor(
        private readonly _renderingGui: IRenderingGui = Inject(IRenderingGui)
    ) {}

    public handle({
        controlId,
        mesh,
    }: LinkGuiControlWithMeshCommandData): ICommandResult {
        const control = getGuiControl(controlId);
        if (control) {
            control.linkWithMesh(mesh);
        }

        return {
            success: true,
        };
    }
}
