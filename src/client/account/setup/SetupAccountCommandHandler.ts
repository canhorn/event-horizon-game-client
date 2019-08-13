import { ICommandHandler } from "../../../engine/command/api/ICommandHandler";
import { ICommandResult } from "../../../engine/command/api/ICommandResult";
import { ICommandType } from "../../../engine/command/api/ICommandType";
import { Inject } from "../../../engine/ioc/Create";
import {
    getConfigurationProperty,
    IGameConfiguration,
} from "../../../engine/settings/IGameSettings";
import { setAccountAccessToken } from "../state/AccountState";
import { SETUP_ACCOUNT_COMMAND } from "./SetupAccountCommand";

export class SetupAccountCommandHandler implements ICommandHandler {
    public type: ICommandType = SETUP_ACCOUNT_COMMAND;

    constructor(
        private readonly _gameSettings: IGameConfiguration = Inject(
            IGameConfiguration
        )
    ) {}

    public handle(): ICommandResult {
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
