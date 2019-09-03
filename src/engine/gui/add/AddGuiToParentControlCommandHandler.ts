import {
    ICommandHandler,
    ICommandResult,
    ICommandType,
} from "../../../core/command";
import { ICommandService } from "../../../core/command/api/ICommandService";
import { Inject } from "../../../core/ioc";
import { createLogger, ILogger } from "../../../core/logger";
import { isObjectNotDefined } from "../../../core/object/ObjectCheck";
import { createCreateGuiCommand } from "../create/CreateGuiCommand";
import { getGuiControlFromStoreByGeneratedId } from "../store/control/GuiControlStore";
import { getGuiFromStore } from "../store/GuiStore";
import {
    ADD_GUI_TO_PARENT_CONTROL_COMMAND,
    AddGuiToParentControlCommandData,
    AddGuiToParentControlCommandResultType,
} from "./AddGuiToParentControlCommand";

/**
 * Name: AddGuiToParentControlCommandHandler
 * Type: Command
 */
export class AddGuiToParentControlCommandHandler implements ICommandHandler {
    public type: ICommandType = ADD_GUI_TO_PARENT_CONTROL_COMMAND;
    constructor(
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        ),
        private readonly _logger: ILogger = createLogger(
            "AddGuiToParentControlCommandHandler"
        )
    ) {}
    public handle({
        id,
        layoutId,
        parentControlId,
    }: AddGuiToParentControlCommandData): ICommandResult<
        AddGuiToParentControlCommandResultType
    > {
        // Get Parent Control
        const parentControl = getGuiControlFromStoreByGeneratedId(
            parentControlId
        );
        if (isObjectNotDefined(parentControl)) {
            return {
                success: false,
                result: "gui_parent_control_not_found",
            };
        }
        // Create the new GUI
        const {
            success: successfullyCreatedGui,
            result: createdGuiResult,
        } = this._commandService.send(
            createCreateGuiCommand({
                id,
                layoutId,
                parentControlId,
            })
        );
        // Get newly created GUI
        const childGui = getGuiFromStore(id);
        if (!successfullyCreatedGui || isObjectNotDefined(childGui)) {
            this._logger.error("Failed to create GUI Child", {
                id,
                layoutId,
                parentControlId,
                createdGuiResult,
            });
            return {
                success: false,
                result: "failed_to_create_child_gui",
            };
        }

        return {
            success: true,
        };
    }
}
