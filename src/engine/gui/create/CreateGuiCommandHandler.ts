import { isObjectNotDefined } from "../../../core/object/ObjectCheck";
import { ICommandHandler } from "../../command/api/ICommandHandler";
import { ICommandResult } from "../../command/api/ICommandResult";
import { ICommandService } from "../../command/api/ICommandService";
import { ICommandType } from "../../command/api/ICommandType";
import { Inject } from "../../ioc/Create";
import { createLogger } from "../../logger/InjectLoggerDecorator";
import { ILogger } from "../../logger/LoggerFactory";
import { addGuiLayoutCommand } from "../add/AddLayoutCommand";
import { addGuiTemplateCommand } from "../add/AddTemplateCommand";
import { CREATE_GUI_COMMAND, CreateGuiCommandData } from "./CreateGuiCommand";

export class CreateGuiCommandHandler implements ICommandHandler {
    public type: ICommandType = CREATE_GUI_COMMAND;

    constructor(
        private readonly _logger: ILogger = createLogger(
            "CreateGuiCommandHandler"
        ),
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        )
    ) {}

    public handle(data: CreateGuiCommandData): ICommandResult {
        if (isObjectNotDefined(data)) {
            this._logger.error(
                "Error Creating Gui from Layout. Ignoring Gui Creation."
            );
            return {
                success: false,
                result: "invalid_command_data",
            };
        }
        const { templateList, layoutList } = data;
        templateList.forEach(template =>
            this._commandService.send(addGuiTemplateCommand({ template }))
        );
        layoutList.forEach(layout =>
            this._commandService.send(addGuiLayoutCommand({ layout }))
        );
        return {
            success: true,
        };
    }
}
