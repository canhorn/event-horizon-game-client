import { CommandType, ICommand, ICommandType } from "../../../core/command";

/**
 * Name: SetupAccountCommand
 * NameSpace: Account
 * Type: Command
 */
export const SETUP_ACCOUNT_COMMAND = new CommandType(
    "Account.SETUP_ACCOUNT_COMMAND"
);
class CommandClass
    implements
        ICommand<SetupAccountCommandData, SetupAccountCommandResultType> {
    public type: ICommandType = SETUP_ACCOUNT_COMMAND;
    public data?: SetupAccountCommandData;
}
const instanceOfCommand = new CommandClass();
export const createSetupAccountCommand = (
    data: SetupAccountCommandData
): ICommand<SetupAccountCommandData, SetupAccountCommandResultType> => {
    instanceOfCommand.data = data;
    return instanceOfCommand;
};
export interface SetupAccountCommandData {}
export type SetupAccountCommandResultType = undefined;
