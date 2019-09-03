import { CommandType, ICommand, ICommandType } from "../../../core/command";

export const SETUP_ACCOUNT_COMMAND = new CommandType(
    "Account.SETUP_ACCOUNT_COMMAND"
);
export class SetupAccountCommand
    implements
        ICommand<SetupAccountCommandData, SetupAccountCommandResultType> {
    public type: ICommandType = SETUP_ACCOUNT_COMMAND;
    public data?: SetupAccountCommandData;
}

const setupAccountCommand = new SetupAccountCommand();

export const createSetupAccountCommand = (data: SetupAccountCommandData) => {
    setupAccountCommand.data = data;
    return setupAccountCommand;
};

export interface SetupAccountCommandData {}
export type SetupAccountCommandResultType = undefined;
