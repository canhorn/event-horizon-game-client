import {
    ICommandHandler,
    ICommandResult,
    ICommandService,
    ICommandType,
} from "../../../core/command";
import { Inject } from "../../../core/ioc";
import { createLogger, ILogger } from "../../../core/logger";
import { isObjectNotDefined } from "../../../core/object/ObjectCheck";
import { GuiFromData } from "../model/GuiFromData";
import { setGuiInStore } from "../store/GuiStore";
import { getGuiLayoutDataFromStore } from "../store/layout/GuiLayoutDataStore";
import {
    CREATE_GUI_COMMAND,
    CreateGuiCommandData,
    CreateGuiCommandResultType,
} from "./CreateGuiCommand";

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

    public handle({
        id,
        layoutId,
        controlDataList,
        parentControlId,
    }: CreateGuiCommandData): ICommandResult<CreateGuiCommandResultType> {
        const layoutData = getGuiLayoutDataFromStore(layoutId);
        if (isObjectNotDefined(layoutData)) {
            return {
                success: false,
                result: "layout_data_not_registered",
            };
        }
        setGuiInStore(
            new GuiFromData(id, layoutData, controlDataList, parentControlId)
        );
        return {
            success: true,
        };
    }
}
