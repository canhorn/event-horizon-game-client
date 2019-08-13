import { translation } from "../../../../core/i18n/I18nServices";
import { ICommandService } from "../../../../engine/command/api/ICommandService";
import { IEventService } from "../../../../engine/event/IEventService";
import { activateGuiLayoutCommand } from "../../../../engine/gui/activate/ActivateLayoutCommand";
import { createCreateGuiCommand } from "../../../../engine/gui/create/CreateGuiCommand";
import { createDisposeOfGuiLayoutCommand } from "../../../../engine/gui/dispose/DisposeOfGuiLayoutCommand";
import { GuiControlLayout, GuiTemplate } from "../../../../engine/gui/model";
import { GuiControlType } from "../../../../engine/gui/model/GuiControlType";
import {
    RegisterControlCommandData,
    registerGuiControlCommand,
} from "../../../../engine/gui/register/RegisterControlCommand";
import { Inject } from "../../../../engine/ioc/Create";
import { LifeCycleEntity } from "../../../../engine/lifecycle/model/LifeCycleEntity";
import { createLogger } from "../../../../engine/logger/InjectLoggerDecorator";
import { ILogger } from "../../../../engine/logger/LoggerFactory";
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
        this._commandService.send(
            createCreateGuiCommand({
                layoutList: this.createGuiLayout(),
                templateList: this.createGuiTemplates(),
            })
        );

        this.getControlsWithData().forEach(control =>
            this._commandService.send(registerGuiControlCommand(control))
        );

        this._commandService.send(
            activateGuiLayoutCommand({
                layoutId: "account_not_loaded",
                parentId: this._parentId,
            })
        );
    }
    public start(): void {}
    public update(): void {}
    public onDispose(): void {
        this._logger.debug("Account Details Gui Disposed");
        this._commandService.send(
            createDisposeOfGuiLayoutCommand({
                layoutId: "account_not_loaded",
            })
        );
    }
    public draw(): void {}

    private createGuiTemplates() {
        const layoutTemplate: GuiTemplate = {
            id: "account_not_loaded-grid",
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
        const panel: GuiTemplate = {
            id: "account_not_loaded-panel",
            type: GuiControlType.Panel,
            options: {
                isVertical: true,
            },
        };
        const spacer: GuiTemplate = {
            id: `account_not_loaded-spacer`,
            type: GuiControlType.Spacer,
            options: {
                padding: 5,
            },
        };
        const text: GuiTemplate = {
            id: `account_not_loaded-text`,
            type: GuiControlType.Text,
            options: {
                width: "250px",
                height: "50px",
                text: "asdf",
                fontSize: 16,
                color: "white",
                backgroundColor: "green",
                alignment: 0,
            },
        };
        const button: GuiTemplate = {
            id: `account_not_loaded-button`,
            type: GuiControlType.Button,
            options: {
                width: 250,
                height: 40,
                text: "",
                textSize: 16,
                textColor: "white",
                backgroundColor: "black",
                disabledColor: "gray",
                hoverCursor: "pointer",
                disabledHoverCursor: "not-allowed",
                alignment: 2,
                vAlignment: 2,
                borderThickness: 0,
                linkOffsetY: -50,
                onClick: () => {},
            },
        };
        return [layoutTemplate, panel, spacer, text, button];
    }

    private getControlsWithData(): RegisterControlCommandData[] {
        return [
            {
                controlId: "account_not_loaded-grid",
                templateId: "account_not_loaded-grid",
            },
            {
                controlId: "account_not_loaded-topleft-panel",
                templateId: "account_not_loaded-panel",
                gridLocation: {
                    row: 0,
                    column: 0,
                },
            },
            {
                controlId: "account_not_loaded-middle-panel",
                templateId: "account_not_loaded-panel",
                gridLocation: {
                    row: 1,
                    column: 1,
                },
            },
            {
                controlId: "account_not_loaded-spacer",
                templateId: "account_not_loaded-spacer",
            },
            {
                controlId: "account_not_loaded-message",
                templateId: "account_not_loaded-text",
                options: {
                    isVisible: true,
                    text: translation("account_AccountNotLoaded"),
                },
            },
            {
                controlId: `account_not_loaded-start_game-button`,
                templateId: `account_not_loaded-button`,
                options: {
                    text: translation("account_BackToMainMenu"),
                    onClick: () =>
                        this._eventService.publish(
                            createCloseAccountDetailsGuiEvent({})
                        ),
                    linkOffsetY: 0 * -50,
                },
            },
        ];
    }

    private createGuiLayout(): GuiControlLayout[] {
        return [
            {
                id: "account_not_loaded",
                sort: 0,
                controlList: [
                    {
                        id: "account_not_loaded-grid",
                        sort: 0,
                        controlList: [
                            {
                                id: "account_not_loaded-topleft-panel",
                                sort: 0,
                                controlList: [
                                    {
                                        id:
                                            "account_not_loaded-start_game-button",
                                        sort: 0,
                                    },
                                ],
                            },
                            {
                                id: "account_not_loaded-middle-panel",
                                sort: 0,
                                controlList: [
                                    {
                                        id: "account_not_loaded-message",
                                        sort: 0,
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
