import {
    getConfigurationProperty,
    IGameConfiguration,
} from "../../../engine/settings/IGameSettings";
import { setAccountAccessToken } from "../state/AccountState";
import {
    SETUP_ACCOUNT_COMMAND,
    SetupAccountCommandResultType,
} from "./SetupAccountCommand";
import {
    ICommandHandler,
    ICommandType,
    ICommandResult,
} from "../../../core/command";
import { Inject } from "../../../core/ioc";

export class SetupAccountCommandHandler implements ICommandHandler {
    public type: ICommandType = SETUP_ACCOUNT_COMMAND;

    constructor(
        private readonly _gameSettings: IGameConfiguration = Inject(
            IGameConfiguration
        )
    ) {}

    public handle(): ICommandResult<SetupAccountCommandResultType> {
        setAccountAccessToken(
            getConfigurationProperty<{ accessToken: string }>(
                this._gameSettings,
                "user"
            ).accessToken
        );
        return {
            success: true,
        };
    }
}
