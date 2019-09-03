import {
    ICommandHandler,
    ICommandResult,
    ICommandType,
} from "../../../core/command";
import { Inject } from "../../../core/ioc";
import { IRegisterInput } from "../IRegisterInput";
import {
    REGISTER_INPUT_COMMAND,
    RegisterInputCommandData,
    RegisterInputCommandResultType,
} from "./RegisterInputCommand";

export class RegisterInputCommandHandler implements ICommandHandler {
    public type: ICommandType = REGISTER_INPUT_COMMAND;

    constructor(
        private readonly _registerInput: IRegisterInput = Inject(IRegisterInput)
    ) {}

    public handle(
        data: RegisterInputCommandData
    ): ICommandResult<RegisterInputCommandResultType> {
        this._registerInput.register(data);
        return { success: true };
    }
}
