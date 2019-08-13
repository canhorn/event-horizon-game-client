import { translation } from "../../../../core/i18n/I18nServices";
import { ICommandService } from "../../../../engine/command/api/ICommandService";
import { IEventService } from "../../../../engine/event/IEventService";
import { activateGuiLayoutCommand } from "../../../../engine/gui/activate/ActivateLayoutCommand";
import { createCreateGuiCommand } from "../../../../engine/gui/create/CreateGuiCommand";
import { createDisposeOfGuiControlCommand } from "../../../../engine/gui/dispose/DisposeOfGuiControlCommand";
import { GuiControlLayout, GuiTemplate } from "../../../../engine/gui/model";
import { GuiControlType } from "../../../../engine/gui/model/GuiControlType";
import {
    RegisterControlCommandData,
    registerGuiControlCommand,
} from "../../../../engine/gui/register/RegisterControlCommand";
import { createUpdateGuiControlCommand } from "../../../../engine/gui/update/UpdateGuiControlCommand";
import { Inject } from "../../../../engine/ioc/Create";
import { LifeCycleEntity } from "../../../../engine/lifecycle/model/LifeCycleEntity";
import { createLogger } from "../../../../engine/logger/InjectLoggerDecorator";
import { ILogger } from "../../../../engine/logger/LoggerFactory";
import { IQueryService } from "../../../../engine/query/IQueryService";
import { ACCOUNT_CHANGED_EVENT } from "../../../account/changed/AccountChangedEvent";
import { createGetAccountQuery } from "../../../account/get/GetAccountQuery";
import { ZONE_CHANGED_EVENT } from "../../../zone/changed/ZoneChangedEvent";
import { createZoneDetailsQuery } from "../../../zone/query/ZoneDetailsQuery";
import { createStartSceneCommand } from "../../start/StartSceneCommand";

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
            createCreateGuiCommand({
                layoutList: this.createGuiLayout(),
                templateList: this.createGuiTemplates(),
            })
        );

        this.getControlsWithData({
            accountDetailsDisabled: accountInfo.user === null,
            zoneDetailsAvailable,
        }).forEach(control =>
            this._commandService.send(registerGuiControlCommand(control))
        );

        this._commandService.send(
            activateGuiLayoutCommand({
                layoutId: "main_menu",
            })
        );

        this._eventService.addEventListener(
            ACCOUNT_CHANGED_EVENT,
            this.onAccountChanged,
            this
        );
        this._eventService.addEventListener(
            ZONE_CHANGED_EVENT,
            this.onZoneChanged,
            this
        );
    }
    public start(): void {}
    public update(): void {}
    public onDispose(): void {
        this._commandService.send(
            createDisposeOfGuiControlCommand({
                controlId: "main_menu-grid",
            })
        );

        this._eventService.removeEventListener(
            ACCOUNT_CHANGED_EVENT,
            this.onAccountChanged,
            this
        );
        this._eventService.removeEventListener(
            ZONE_CHANGED_EVENT,
            this.onZoneChanged,
            this
        );
    }
    public draw(): void {}
    private onAccountChanged() {
        this._commandService.send(
            createUpdateGuiControlCommand({
                controlId: "main_menu-account_details-button",
                options: {
                    isDisabled: false,
                },
            })
        );
    }
    private onZoneChanged() {
        this._commandService.send(
            createUpdateGuiControlCommand({
                controlId: "main_menu-start_game-button",
                options: {
                    isDisabled: false,
                },
            })
        );
    }

    private createGuiTemplates() {
        const layoutTemplate: GuiTemplate = {
            id: "main_menu-grid",
            type: GuiControlType.Grid,
            options: {
                column: 3,
                row: 3,
                backgroundColor: "transparent",
                paddingBottom: 5,
                paddingTop: 5,
                paddingLeft: 5,
                paddingRight: 5,
            },
        };
        const skillPanel: GuiTemplate = {
            id: "main_menu-panel",
            type: GuiControlType.Panel,
            gridLocation: {
                row: 1,
                column: 1,
            },
            options: {},
        };
        const skillSpacer: GuiTemplate = {
            id: `main_menu-spacer`,
            type: GuiControlType.Spacer,
            options: {
                padding: 10,
            },
        };
        const skillButtonControl: GuiTemplate = {
            id: `main_menu-button`,
            type: GuiControlType.Button,
            options: {
                isDisabled: true,
                width: "130px",
                height: "35px",
                text: "",
                textSize: 16,
                textColor: "white",
                backgroundColor: "black",
                disabledColor: "gray",
                disabledHoverCursor: "mouse",
                alignment: 2,
                vAlignment: 2,
                borderThickness: 0,
                onClick: () => {},
            },
        };
        return [layoutTemplate, skillPanel, skillSpacer, skillButtonControl];
    }

    private getControlsWithData({
        accountDetailsDisabled,
        zoneDetailsAvailable,
    }: {
        accountDetailsDisabled: boolean;
        zoneDetailsAvailable: boolean;
    }): RegisterControlCommandData[] {
        return [
            {
                controlId: "main_menu-grid",
                templateId: "main_menu-grid",
            },
            {
                controlId: "main_menu-panel",
                templateId: "main_menu-panel",
            },
            {
                controlId: "main_menu-spacer",
                templateId: "main_menu-spacer",
            },
            {
                controlId: `main_menu-start_game-button`,
                templateId: `main_menu-button`,
                options: {
                    isDisabled: !zoneDetailsAvailable,
                    text: translation("mainMenu_StartGame"),
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
                templateId: `main_menu-button`,
                options: {
                    isDisabled: accountDetailsDisabled,
                    text: translation("mainMenu_AccountDetails"),
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

    private createGuiLayout(): GuiControlLayout[] {
        return [
            {
                id: "main_menu",
                sort: 0,
                controlList: [
                    {
                        id: "main_menu-grid",
                        sort: 0,
                        controlList: [
                            {
                                id: "main_menu-panel",
                                sort: 0,
                                controlList: [
                                    {
                                        id: "main_menu-start_game-button",
                                        sort: 0,
                                    },
                                    {
                                        id: "main_menu-spacer",
                                        sort: 1,
                                    },
                                    {
                                        id: "main_menu-account_details-button",
                                        sort: 2,
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ];
    }
}
