import { ICommandService } from "../../../../core/command";
import { IEventService } from "../../../../core/event";
import { Inject } from "../../../../core/ioc";
import { createLogger, ILogger } from "../../../../core/logger";
import { IQueryService } from "../../../../core/query";
import { createActivateGuiCommand } from "../../../../engine/gui/activate/ActivateGuiCommand";
import { IGuiControlData } from "../../../../engine/gui/api";
import { createCreateGuiCommand } from "../../../../engine/gui/create/CreateGuiCommand";
import { createDisposeOfGuiCommand } from "../../../../engine/gui/dispose/DisposeOfGuiCommand";
import { createRegisterGuiLayoutDataCommand } from "../../../../engine/gui/register/RegisterGuiLayoutDataCommand";
import { createUpdateGuiControlCommand } from "../../../../engine/gui/update/UpdateGuiControlCommand";
import { LifeCycleEntity } from "../../../../engine/lifecycle/model/LifeCycleEntity";
import { ACCOUNT_CHANGED_EVENT } from "../../../account/changed/AccountChangedEvent";
import { createGetAccountQuery } from "../../../account/get/GetAccountQuery";
import { ZONE_CHANGED_EVENT } from "../../../zone/changed/ZoneChangedEvent";
import { createZoneDetailsQuery } from "../../../zone/query/ZoneDetailsQuery";
import { createStartSceneCommand } from "../../start/StartSceneCommand";
import MainMenuGuiJson from "./MainMenu.Gui.json";

export class MainMenuGui extends LifeCycleEntity {
    constructor(
        private readonly _logger: ILogger = createLogger("MainMenuGui"),
        private readonly _queryService: IQueryService = Inject(IQueryService),
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        ),
        private readonly _eventService: IEventService = Inject(IEventService)
    ) {
        super();
    }
    public initialize(): void {
        // Account Info
        const { result: accountInfo } = this._queryService.query(
            createGetAccountQuery({})
        );
        // Account Info
        const { success: zoneDetailsAvailable } = this._queryService.query(
            createZoneDetailsQuery({})
        );
        // Create Main Menu GUI
        this._logger.debug("Main Menu Gui Initialize");
        this._commandService.send(
            createRegisterGuiLayoutDataCommand({
                layoutData: MainMenuGuiJson,
            })
        );
        this._commandService.send(
            createCreateGuiCommand({
                id: MainMenuGuiJson.id,
                layoutId: MainMenuGuiJson.id,
                controlDataList: this.getControlsWithData({
                    accountDetailsDisabled: accountInfo.user === null,
                    zoneDetailsAvailable,
                }),
            })
        );
        this._commandService.send(
            createActivateGuiCommand({ id: MainMenuGuiJson.id })
        );

        this._eventService.on(
            ACCOUNT_CHANGED_EVENT,
            this.onAccountChanged,
            this
        );
        this._eventService.on(ZONE_CHANGED_EVENT, this.onZoneChanged, this);
    }
    public start(): void {}
    public update(): void {}
    public onDispose(): void {
        this._commandService.send(
            createDisposeOfGuiCommand({
                id: MainMenuGuiJson.id,
            })
        );

        this._eventService.off(
            ACCOUNT_CHANGED_EVENT,
            this.onAccountChanged,
            this
        );
        this._eventService.off(ZONE_CHANGED_EVENT, this.onZoneChanged, this);
    }
    public draw(): void {}
    private onAccountChanged() {
        this._commandService.send(
            createUpdateGuiControlCommand({
                guiId: MainMenuGuiJson.id,
                control: {
                    controlId: "main_menu-account_details-button",
                    options: {
                        isDisabled: false,
                    },
                },
            })
        );
    }
    private onZoneChanged() {
        this._commandService.send(
            createUpdateGuiControlCommand({
                guiId: MainMenuGuiJson.id,
                control: {
                    controlId: "main_menu-start_game-button",
                    options: {
                        isDisabled: false,
                    },
                },
            })
        );
    }

    private getControlsWithData({
        accountDetailsDisabled,
        zoneDetailsAvailable,
    }: {
        accountDetailsDisabled: boolean;
        zoneDetailsAvailable: boolean;
    }): IGuiControlData[] {
        return [
            {
                controlId: `main_menu-start_game-button`,
                options: {
                    isDisabled: !zoneDetailsAvailable,
                    onClick: () =>
                        this._commandService.send(
                            createStartSceneCommand({
                                sceneId: "zone",
                            })
                        ),
                },
            },
            {
                controlId: `main_menu-account_details-button`,
                options: {
                    isDisabled: accountDetailsDisabled,
                    onClick: () =>
                        this._commandService.send(
                            createStartSceneCommand({
                                sceneId: "account-details",
                            })
                        ),
                },
            },
        ];
    }
}
