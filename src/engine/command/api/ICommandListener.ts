import { ICommandResult } from "./ICommandResult";

export abstract class ICommandListener {
    public abstract function: (data: any) => ICommandResult;
    public abstract context: Object;
}
