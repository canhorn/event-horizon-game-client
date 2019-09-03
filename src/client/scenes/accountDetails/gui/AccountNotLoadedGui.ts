import { ICommandService } from "../../../../core/command";
import { IEventService } from "../../../../core/event";
import { Inject } from "../../../../core/ioc";
import { createLogger, ILogger } from "../../../../core/logger";
import { createActivateGuiCommand } from "../../../../engine/gui/activate/ActivateGuiCommand";
import { IGuiControlData } from "../../../../engine/gui/api/IGuiControlData";
import { createCreateGuiCommand } from "../../../../engine/gui/create/CreateGuiCommand";
import { createDisposeOfGuiCommand } from "../../../../engine/gui/dispose/DisposeOfGuiCommand";
import { createRegisterGuiLayoutDataCommand } from "../../../../engine/gui/register/RegisterGuiLayoutDataCommand";
import { LifeCycleEntity } from "../../../../engine/lifecycle/model/LifeCycleEntity";
import AccountNotLoadedGuiJson from "./AccountNotLoaded.Gui.json";
import { createCloseAccountDetailsGuiEvent } from "./close/CloseAccountDetailsGuiEvent";

export class AccountNotLoadedGui extends LifeCycleEntity {
    constructor(
        private readonly _parentId?: string,
        private readonly _logger: ILogger = createLogger("AccountNotLoadedGui"),
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
                layoutData: AccountNotLoadedGuiJson,
            })
        );
        // Create GUI
        this._commandService.send(
            createCreateGuiCommand({
                id: AccountNotLoadedGuiJson.id,
                layoutId: AccountNotLoadedGuiJson.id,
                controlDataList: this.getControlsWithData(),
            })
        );
        // Activate GUI
        this._commandService.send(
            createActivateGuiCommand({
                id: AccountNotLoadedGuiJson.id,
            })
        );
    }
    public start(): void {}
    public update(): void {}
    public onDispose(): void {
        this._commandService.send(
            createDisposeOfGuiCommand({
                id: AccountNotLoadedGuiJson.id,
            })
        );
    }
    public draw(): void {}

    private getControlsWithData(): IGuiControlData[] {
        return [
            {
                controlId: `account_not_loaded-start_game-button`,
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
