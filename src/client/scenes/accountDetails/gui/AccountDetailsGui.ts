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
import { IAccountUser } from "../../../account/api/IAccountUser";
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
        // Create Account Details GUI
        this._logger.debug("Account Details Gui Initialize", this._accountUser);
        this._commandService.send(
            createCreateGuiCommand({
                layoutList: this.createGuiLayout(),
                templateList: this.createGuiTemplates(),
            })
        );

        this.getControlsWithData().forEach(control =>
            this._commandService.send(registerGuiControlCommand(control))
        );

        this._logger.debug("Activate Account Details ");
        this._commandService.send(
            activateGuiLayoutCommand({
                layoutId: "account_details",
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
                layoutId: "account_details",
            })
        );
    }
    public draw(): void {}

    private createGuiTemplates() {
        const layoutTemplate: GuiTemplate = {
            id: "account_details-grid",
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
            id: "account_details-panel",
            type: GuiControlType.Panel,
            options: {
                isVertical: true,
            },
        };
        const spacer: GuiTemplate = {
            id: `account_details-spacer`,
            type: GuiControlType.Spacer,
            options: {
                padding: 5,
            },
        };
        const text: GuiTemplate = {
            id: `account_details-text`,
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
            id: `account_details-button`,
            type: GuiControlType.Button,
            options: {
                width: "250px",
                height: "40px",
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
                controlId: "account_details-grid",
                templateId: "account_details-grid",
            },
            {
                controlId: "account_details-topleft-panel",
                templateId: "account_details-panel",
                gridLocation: {
                    row: 0,
                    column: 0,
                },
            },
            {
                controlId: "account_details-middle-panel",
                templateId: "account_details-panel",
                gridLocation: {
                    row: 1,
                    column: 1,
                },
            },
            {
                controlId: "account_details-spacer",
                templateId: "account_details-spacer",
            },
            {
                controlId: "account_details-username",
                templateId: "account_details-text",
                options: {
                    isVisible: true,
                    text:
                        this._accountUser.username ||
                        translation("account_NameNotSet"),
                },
            },
            {
                controlId: `account_details-start_game-button`,
                templateId: `account_details-button`,
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
                id: "account_details",
                sort: 0,
                controlList: [
                    {
                        id: "account_details-grid",
                        sort: 0,
                        controlList: [
                            {
                                id: "account_details-topleft-panel",
                                sort: 0,
                                controlList: [
                                    {
                                        id: "account_details-start_game-button",
                                        sort: 0,
                                    },
                                ],
                            },
                            {
                                id: "account_details-middle-panel",
                                sort: 0,
                                controlList: [
                                    {
                                        id: "account_details-username",
                                        sort: 0,
                                    },
                                    {
                                        id: "account_details-spacer",
                                        sort: 1,
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
