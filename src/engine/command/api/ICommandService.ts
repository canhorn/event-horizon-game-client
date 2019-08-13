import { ICommand } from "./ICommand";
import { ICommandResult } from "./ICommandResult";
import { ICommandType } from "./ICommandType";

export abstract class ICommandService {
    public abstract send(event: ICommand): ICommandResult;
    public abstract addListener(
        commandType: ICommandType,
        commandListener: (data: any) => ICommandResult,
        context: any
    ): ICommandService;
    public abstract removeListener(
        commandType: ICommandType,
        commandListener: (data: any) => ICommandResult,
        context: any
    ): ICommandService;
}
