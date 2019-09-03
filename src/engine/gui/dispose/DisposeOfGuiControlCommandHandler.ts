import {
    ICommandHandler,
    ICommandResult,
    ICommandService,
    ICommandType,
} from "../../../core/command";
import { Inject } from "../../../core/ioc";
import { isObjectDefined } from "../../../core/object/ObjectCheck";
import { getChildrenOfGuiControl } from "../store/control/GuiControlChildrenStore";
import {
    getGuiControlFromStore,
    removeGuiControlFromStore,
} from "../store/control/GuiControlStore";
import { createDisposeOfGuiCommand } from "./DisposeOfGuiCommand";
import { createDisposeOfGuiControlChildrenCommand } from "./DisposeOfGuiControlChildrenCommand";
import {
    DISPOSE_OF_GUI_CONTROL_COMMAND,
    DisposeOfGuiControlCommandData,
    DisposeOfGuiControlCommandResultType,
} from "./DisposeOfGuiControlCommand";

/**
 * Name: DisposeOfGuiControlCommandHandler
 * Type: Command
 */
export class DisposeOfGuiControlCommandHandler implements ICommandHandler {
    public type: ICommandType = DISPOSE_OF_GUI_CONTROL_COMMAND;
    constructor(
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        )
    ) {}
    public handle({
        guiId,
        controlId,
    }: DisposeOfGuiControlCommandData): ICommandResult<
        DisposeOfGuiControlCommandResultType
    > {
        const control = getGuiControlFromStore(guiId, controlId);
        if (isObjectDefined(control)) {
            this._commandService.send(
                createDisposeOfGuiControlChildrenCommand({
                    controlId: control.id,
                })
            );
            control.dispose();
            removeGuiControlFromStore(guiId, controlId);
        }
        return {
            success: true,
        };
    }
}
