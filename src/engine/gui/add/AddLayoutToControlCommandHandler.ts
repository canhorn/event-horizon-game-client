import { isObjectDefined } from "../../../core/object/ObjectCheck";
import { ICommandHandler } from "../../command/api/ICommandHandler";
import { ICommandResult } from "../../command/api/ICommandResult";
import { ICommandService } from "../../command/api/ICommandService";
import { ICommandType } from "../../command/api/ICommandType";
import { Inject } from "../../ioc/Create";
import { createLogger } from "../../logger/InjectLoggerDecorator";
import { activateGuiLayoutCommand } from "../activate/ActivateLayoutCommand";
import { registerGuiControlCommand } from "../register/RegisterControlCommand";
import { getGuiControl } from "../store/control/GuiControlStore";
import { addGuiLayoutCommand } from "./AddLayoutCommand";
import {
    ADD_LAYOUT_TO_CONTROL_COMMAND,
    AddLayoutToControlCommandData,
} from "./AddLayoutToControlCommand";
import { addGuiTemplateCommand } from "./AddTemplateCommand";

export class AddLayoutToControlCommandHandler implements ICommandHandler {
    public type: ICommandType = ADD_LAYOUT_TO_CONTROL_COMMAND;

    constructor(
        private readonly _logger = createLogger(
            "AddLayoutToControlCommandHandler"
        ),
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        )
    ) {}

    public handle({
        targetControlId,
        templateList,
        registerControlList,
        layout,
    }: AddLayoutToControlCommandData): ICommandResult {
        this._logger.debug("Creating a Layout and adding it to a Control", {
            targetControlId,
            templateList,
            registerControlList,
            layout,
        });
        // Get Target Control
        const targetControl = getGuiControl(targetControlId);
        this._logger.debug("Target Control", targetControl);
        if (!isObjectDefined(targetControl)) {
            return {
                success: false,
                result: "target_control_not_found",
            };
        }
        // Add Layout
        this._commandService.send(
            addGuiLayoutCommand({
                layout,
            })
        );

        // Add Templates
        templateList.forEach(template =>
            this._commandService.send(
                addGuiTemplateCommand({
                    template,
                })
            )
        );

        // Register Controls
        registerControlList.forEach(registeringControl =>
            this._commandService.send(
                registerGuiControlCommand(registeringControl)
            )
        );

        // Add this control to Gui
        this._commandService.send(
            activateGuiLayoutCommand({
                layoutId: layout.id,
                parentId: targetControlId,
            })
        );
        return {
            success: true,
        };
    }
}
