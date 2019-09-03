import {
    ICommandHandler,
    ICommandResult,
    ICommandType,
} from "../../../core/command";
import { setGuiLayoutDataInStore } from "../store/layout/GuiLayoutDataStore";
import {
    REGISTER_GUI_LAYOUT_DATA_COMMAND,
    RegisterGuiLayoutDataCommandData,
    RegisterGuiLayoutDataCommandResultType,
} from "./RegisterGuiLayoutDataCommand";

/**
 * Name: RegisterGuiLayoutDataCommandHandler
 * Type: Command
 */
export class RegisterGuiLayoutDataCommandHandler implements ICommandHandler {
    public type: ICommandType = REGISTER_GUI_LAYOUT_DATA_COMMAND;
    public handle({
        layoutData,
    }: RegisterGuiLayoutDataCommandData): ICommandResult<
        RegisterGuiLayoutDataCommandResultType
    > {
        setGuiLayoutDataInStore(layoutData);
        return {
            success: true,
        };
    }
}
