import { ICommand } from "../../../engine/command/api/ICommand";
import { ICommandType } from "../../../engine/command/api/ICommandType";
import { CommandType } from "../../../engine/command/model/CommandType";

export const SETUP_ACCOUNT_COMMAND = new CommandType(
    "Account.SETUP_ACCOUNT_COMMAND"
);
export class SetupAccountCommand implements ICommand {
    public type: ICommandType = SETUP_ACCOUNT_COMMAND;
    public data?: SetupAccountCommandData;
}

const setupAccountCommand = new SetupAccountCommand();

export const createSetupAccountCommand = (data: SetupAccountCommandData) => {
    setupAccountCommand.data = data;
    return setupAccountCommand;
};

export interface SetupAccountCommandData {}
