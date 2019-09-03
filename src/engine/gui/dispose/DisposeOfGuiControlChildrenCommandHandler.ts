import {
    ICommandHandler,
    ICommandResult,
    ICommandService,
    ICommandType,
} from "../../../core/command";
import { Inject } from "../../../core/ioc/api/Inject";
import { isObjectDefined } from "../../../core/object/ObjectCheck";
import { getChildrenOfGuiControl } from "../store/control/GuiControlChildrenStore";
import { createDisposeOfGuiCommand } from "./DisposeOfGuiCommand";
import {
    DISPOSE_OF_GUI_CONTROL_CHILDREN_COMMAND,
    DisposeOfGuiControlChildrenCommandData,
    DisposeOfGuiControlChildrenCommandResultType,
} from "./DisposeOfGuiControlChildrenCommand";

/**
 * Name: DisposeOfGuiControlChildrenCommandHandler
 * Type: Command
 */
export class DisposeOfGuiControlChildrenCommandHandler
    implements ICommandHandler {
    public type: ICommandType = DISPOSE_OF_GUI_CONTROL_CHILDREN_COMMAND;
    constructor(
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        )
    ) {}
    public handle({
        controlId,
    }: DisposeOfGuiControlChildrenCommandData): ICommandResult<
        DisposeOfGuiControlChildrenCommandResultType
    > {
        const childGuiList = getChildrenOfGuiControl(controlId);
        if (isObjectDefined(childGuiList)) {
            childGuiList.forEach(childGuiId =>
                this._commandService.send(
                    createDisposeOfGuiCommand({ id: childGuiId })
                )
            );
        }
        return {
            success: true,
        };
    }
}
