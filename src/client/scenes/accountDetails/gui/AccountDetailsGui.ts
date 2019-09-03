import { ICommandService } from "../../../../core/command";
import { IEventService } from "../../../../core/event";
import { translation } from "../../../../core/i18n/I18nServices";
import { Inject } from "../../../../core/ioc";
import { createLogger, ILogger } from "../../../../core/logger";
import { createActivateGuiCommand } from "../../../../engine/gui/activate/ActivateGuiCommand";
import { IGuiControlData } from "../../../../engine/gui/api/IGuiControlData";
import { createCreateGuiCommand } from "../../../../engine/gui/create/CreateGuiCommand";
import { createDisposeOfGuiCommand } from "../../../../engine/gui/dispose/DisposeOfGuiCommand";
import { createRegisterGuiLayoutDataCommand } from "../../../../engine/gui/register/RegisterGuiLayoutDataCommand";
import { LifeCycleEntity } from "../../../../engine/lifecycle/model/LifeCycleEntity";
import { IAccountUser } from "../../../account/api/IAccountUser";
import AccountDetailsGuiJson from "./AccountDetails.Gui.json";
import { createCloseAccountDetailsGuiEvent } from "./close/CloseAccountDetailsGuiEvent";

export class AccountDetailsGui extends LifeCycleEntity {
    constructor(
        private readonly _accountUser: IAccountUser,
        private readonly _parentId?: string,
        private readonly _logger: ILogger = createLogger("AccountDetailsGui"),
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        ),
        private readonly _eventService: IEventService = Inject(IEventService)
    ) {
        super();
    }
    public initialize(): void {
        // Register GUI Layout Data
        this._commandService.send(
            createRegisterGuiLayoutDataCommand({
                layoutData: AccountDetailsGuiJson,
            })
        );
        // Create GUI
        this._commandService.send(
            createCreateGuiCommand({
                id: AccountDetailsGuiJson.id,
                layoutId: AccountDetailsGuiJson.id,
                controlDataList: this.getControlsWithData(),
            })
        );
        // Activate GUI
        this._commandService.send(
            createActivateGuiCommand({
                id: AccountDetailsGuiJson.id,
            })
        );
    }
    public update(): void {}
    public onDispose(): void {
        this._commandService.send(
            createDisposeOfGuiCommand({
                id: AccountDetailsGuiJson.id,
            })
        );
    }
    public draw(): void {}

    private getControlsWithData(): IGuiControlData[] {
        return [
            {
                controlId: "account_details-username",
                options: {
                    text:
                        this._accountUser.username ||
                        translation("account_NameNotSet"),
                },
            },
            {
                controlId: `account_details-start_game-button`,
                options: {
                    onClick: () =>
                        this._eventService.publish(
                            createCloseAccountDetailsGuiEvent({})
                        ),
                    linkOffsetY: 0 * -50,
                },
            },
        ];
    }
}
