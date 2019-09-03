import {
    LocalPlayerActionCommandData,
    LOCAL_PLAYER_ACTION_COMMAND,
    LocalPlayerActionCommandResultType,
} from "./LocalPlayerActionCommand";
import { localePlayerActionMove } from "./move/LocalePlayerActionMove";
import {
    ICommandHandler,
    ICommandType,
    ICommandResult,
} from "../../core/command";

/**
 * Name: LocalPlayerActionCommandHandler
 * Type: Command
 */
export class LocalPlayerActionCommandHandler implements ICommandHandler {
    public type: ICommandType = LOCAL_PLAYER_ACTION_COMMAND;
    constructor() {}
    public handle({
        method,
        args,
    }: LocalPlayerActionCommandData): ICommandResult<
        LocalPlayerActionCommandResultType
    > {
        console.log({ method, args });
        switch (method) {
            case "Move":
                localePlayerActionMove(args);
                break;
        }
        return {
            success: true,
        };
    }
}
