import { autobind } from "../../../core/autobind/autobind";
import { ICommandResult } from "../../command/api/ICommandResult";
import { ICommandService } from "../../command/api/ICommandService";
import { IEventService } from "../../event/IEventService";
import { activateGuiLayoutCommand } from "../../gui/activate/ActivateLayoutCommand";
import { createCreateGuiCommand } from "../../gui/create/CreateGuiCommand";
import { createDisposeOfGuiLayoutCommand } from "../../gui/dispose/DisposeOfGuiLayoutCommand";
import { createHideLayoutCommand } from "../../gui/hide/HideLayoutCommand";
import { GuiControlLayout } from "../../gui/model";
import {
    RegisterControlCommandData,
    registerGuiControlCommand,
} from "../../gui/register/RegisterControlCommand";
import { createShowLayoutCommand } from "../../gui/show/ShowLayoutCommand";
import { Inject } from "../../ioc/Create";
import { LifeCycleEntity } from "../../lifecycle/model/LifeCycleEntity";
import { createLogger } from "../../logger/InjectLoggerDecorator";
import { ILogger } from "../../logger/LoggerFactory";
import { IGuid } from "../../math/guid/IGuid";
import {
    SHOW_DEBUGGING_MESSAGE_EVENT,
    ShowDebuggingMessageEventData,
} from "../message/ShowDebuggingMessageEvent";
import {
    CLOSE_DEBUGGING_WINDOW_COMMAND,
    CloseDebuggingWindowCommandData,
} from "../open/CloseDebuggingWindowCommand";
import {
    OPEN_DEBUGGING_WINDOW_COMMAND,
    OpenDebuggingWindowCommandData,
} from "../open/OpenDebuggingWindowCommand";

const PENDING_MESSAGES: string[] = [];
export class DebuggingGui extends LifeCycleEntity {
    constructor(
        private readonly _logger: ILogger = createLogger("DebuggingGui"),
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        ),
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _guid: IGuid = Inject(IGuid)
    ) {
        super();
        _eventService.addEventListener(
            SHOW_DEBUGGING_MESSAGE_EVENT,
            this.showMessage,
            this
        );
        _commandService.addListener(
            OPEN_DEBUGGING_WINDOW_COMMAND,
            this.openDebuggingWindow,
            this
        );
        this._commandService.addListener(
            CLOSE_DEBUGGING_WINDOW_COMMAND,
            this.closeDebuggingWindow,
            this
        );
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
                layoutId: "debugging_console",
            })
        );
        this._commandService.send(
            createHideLayoutCommand({
                layoutId: "debugging_console",
            })
        );
        this.postPendingMessages();
    }
    public start(): void {}
    public update(): void {}
    public onDispose(): void {
        this._commandService.send(
            createDisposeOfGuiLayoutCommand({
                layoutId: "debugging_console",
            })
        );
        this._eventService.removeEventListener(
            SHOW_DEBUGGING_MESSAGE_EVENT,
            this.showMessage,
            this
        );
        this._commandService.removeListener(
            OPEN_DEBUGGING_WINDOW_COMMAND,
            this.openDebuggingWindow,
            this
        );
        this._commandService.removeListener(
            CLOSE_DEBUGGING_WINDOW_COMMAND,
            this.closeDebuggingWindow,
            this
        );
    }
    public draw(): void {}

    private openDebuggingWindow(
        _: OpenDebuggingWindowCommandData
    ): ICommandResult {
        this._commandService.send(
            createShowLayoutCommand({
                layoutId: "debugging_console",
            })
        );
        return {
            success: true,
        };
    }

    private closeDebuggingWindow(
        _: CloseDebuggingWindowCommandData
    ): ICommandResult {
        this._commandService.send(
            createHideLayoutCommand({
                layoutId: "debugging_console",
            })
        );
        return {
            success: true,
        };
    }

    private createGuiTemplates() {
        return [
            {
                id: "debugging_console-Grid",
                type: "Grid",
                options: {
                    column: 3,
                    row: 3,
                    backgroundColor: "transparent",
                    paddingBottom: 5,
                    paddingTop: 5,
                    paddingLeft: 5,
                    paddingRight: 5,
                },
            },
            {
                id: "debugging_console-Container",
                type: "Container",
                options: {
                    width: "66%",
                    height: "50%",
                    alpha: 0.5,
                    horizontalAlignment: 0,
                    verticalAlignment: 0,
                    background: "black",
                    cornerRadius: 20,
                    left: 20,
                    top: 20,
                    thickness: 0,
                },
            },
            {
                id: "debugging_console-Panel",
                type: "Panel",
                options: {
                    verticalAlignment: 1,
                    horizontalAlignment: 0,
                    top: -15,
                    left: 15,
                    enableScrolling: true,
                },
            },
            {
                // Stack Panel, horizontal
                id: "debugging_console-Log_Panel",
                type: "Panel",
                options: {
                    top: -45,
                    isVertical: false,
                    verticalAlignment: 1,
                    horizontalAlignment: 0,
                    isPointerBlocker: false,
                },
            },
            {
                // Message Text
                id: "debugging_console-Log_Message",
                type: "Text",
                options: {
                    alpha: 1,
                    color: "white",
                    width: "600px",
                    height: "20px",
                    fontSize: "14px",
                    textHorizontalAlignment: 0,

                    text: "message_text",
                },
            },
        ];
    }

    private getControlsWithData(): RegisterControlCommandData[] {
        return [
            {
                controlId: "debugging_console-Grid",
                templateId: "debugging_console-Grid",
            },
            {
                controlId: "debugging_console-Container",
                templateId: "debugging_console-Container",
            },
            {
                controlId: "debugging_console-Panel",
                templateId: "debugging_console-Panel",
            },
        ];
    }

    private createGuiLayout(): GuiControlLayout[] {
        return [
            {
                id: "debugging_console",
                sort: 0,
                controlList: [
                    {
                        id: "debugging_console-Grid",
                        sort: 0,
                    },
                    {
                        id: "debugging_console-Container",
                        sort: 1,
                        controlList: [
                            {
                                id: "debugging_console-Panel",
                                sort: 0,
                            },
                        ],
                    },
                ],
            },
        ];
    }
    private showMessage({ message }: ShowDebuggingMessageEventData) {
        PENDING_MESSAGES.push(message);
    }
    @autobind
    private postPendingMessages() {
        let message = PENDING_MESSAGES.pop();
        while (message) {
            this.postMessage(this._guid.guid(), message);
            message = PENDING_MESSAGES.pop();
        }
        window.setTimeout(this.postPendingMessages, 1000);
    }
    private postMessage(index: string, message: string) {
        this._commandService.send({
            type: {
                key: "GUI.ADD_LAYOUT_TO_CONTROL_COMMAND",
            },
            data: {
                targetControlId: "debugging_console-Panel",
                registerControlList: [
                    {
                        controlId: "debugging_console-Log_Panel-" + index,
                        templateId: "debugging_console-Log_Panel",
                    },
                    {
                        controlId: "debugging_console-Log_Message-" + index,
                        templateId: "debugging_console-Log_Message",
                        options: {
                            text: message,
                        },
                    },
                ],
                templateList: [],
                layout: {
                    id: "debugging_console-Panel-" + index,
                    count: 0,
                    controlList: [
                        {
                            id: "debugging_console-Log_Panel-" + index,
                            sort: 0,
                            controlList: [
                                {
                                    id:
                                        "debugging_console-Log_Message-" +
                                        index,
                                    sort: 0,
                                },
                            ],
                        },
                    ],
                },
            },
        });
    }
}
