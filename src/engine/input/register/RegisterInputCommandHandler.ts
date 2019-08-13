import { ICommandHandler } from "../../command/api/ICommandHandler";
import { ICommandResult } from "../../command/api/ICommandResult";
import { ICommandType } from "../../command/api/ICommandType";
import { Inject } from "../../ioc/Create";
import { IRegisterInput } from "../IRegisterInput";
import {
    IRegisterInputCommandData,
    REGISTER_INPUT_COMMAND,
} from "./RegisterInputCommand";

export class RegisterInputCommandHandler implements ICommandHandler {
    public type: ICommandType = REGISTER_INPUT_COMMAND;

    constructor(
        private readonly _registerInput: IRegisterInput = Inject(IRegisterInput)
    ) {}

    public handle(data: IRegisterInputCommandData): ICommandResult {
        this._registerInput.register(data);
        return { success: true };
    }
}
