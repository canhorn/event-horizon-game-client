import { ICommandType } from "./ICommandType";

export interface ICommand {
    type: ICommandType;
    data?: any;
}
