import { autobind } from "../../../core/autobind/autobind";
import { ICommandResult, ICommandService } from "../../../core/command";
import { IEventService } from "../../../core/event";
import { IGuid } from "../../../core/guid/IGuid";
import { Inject } from "../../../core/ioc";
import { createLogger, ILogger } from "../../../core/logger";
import { IQueryService } from "../../../core/query/api/IQueryService";
import { createActivateGuiCommand } from "../../gui/activate/ActivateGuiCommand";
import { createCreateGuiCommand } from "../../gui/create/CreateGuiCommand";
import { createDisposeOfGuiCommand } from "../../gui/dispose/DisposeOfGuiCommand";
import { createHideGuiCommand } from "../../gui/hide/HideGuiCommand";
import { createQueryForGenerateGuiControlId } from "../../gui/query/QueryForGenerateGuiControlId";
import { createRegisterGuiLayoutDataCommand } from "../../gui/register/RegisterGuiLayoutDataCommand";
import { createShowGuiCommand } from "../../gui/show/ShowGuiCommand";
import { LifeCycleEntity } from "../../lifecycle/model/LifeCycleEntity";
import {
    SHOW_DEBUGGING_MESSAGE_EVENT,
    ShowDebuggingMessageEventData,
} from "../message/ShowDebuggingMessageEvent";
import {
    CLOSE_DEBUGGING_WINDOW_COMMAND,
    CloseDebuggingWindowCommandData,
    CloseDebuggingWindowCommandResultType,
} from "../open/CloseDebuggingWindowCommand";
import {
    OPEN_DEBUGGING_WINDOW_COMMAND,
    OpenDebuggingWindowCommandData,
    OpenDebuggingWindowCommandResultType,
} from "../open/OpenDebuggingWindowCommand";
import DebuggingGuiJson from "./Debugging.Gui.json";
import DebuggingMessageGuiJson from "./Debugging.Gui_Message.json";

const PENDING_MESSAGES: string[] = [];
export class DebuggingGui extends LifeCycleEntity {
    constructor(
        private readonly _logger: ILogger = createLogger("DebuggingGui"),
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        ),
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _queryService: IQueryService = Inject(IQueryService),
        private readonly _guid: IGuid = Inject(IGuid)
    ) {
        super();
    }
    public initialize(): void {
        // Register GUI Layout Data
        this._commandService.send(
            createRegisterGuiLayoutDataCommand({
                layoutData: DebuggingGuiJson,
            })
        );
        this._commandService.send(
            createRegisterGuiLayoutDataCommand({
                layoutData: DebuggingMessageGuiJson,
            })
        );
        // Create GUI
        this._commandService.send(
            createCreateGuiCommand({
                id: DebuggingGuiJson.id,
                layoutId: DebuggingGuiJson.id,
            })
        );
        // Activate GUI
        this._commandService.send(
            createActivateGuiCommand({
                id: DebuggingGuiJson.id,
            })
        );

        this._eventService.on(
            SHOW_DEBUGGING_MESSAGE_EVENT,
            this.showMessage,
            this
        );
        this._commandService.addListener(
            OPEN_DEBUGGING_WINDOW_COMMAND,
            this.openDebuggingWindow,
            this
        );
        this._commandService.addListener(
            CLOSE_DEBUGGING_WINDOW_COMMAND,
            this.closeDebuggingWindow,
            this
        );
        this.postPendingMessages();
    }
    public start(): void {}
    public update(): void {}
    public onDispose(): void {
        this._commandService.send(
            createDisposeOfGuiCommand({
                id: DebuggingGuiJson.id,
            })
        );

        this._eventService.off(
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
    ): ICommandResult<OpenDebuggingWindowCommandResultType> {
        this._commandService.send(
            createShowGuiCommand({
                id: DebuggingGuiJson.id,
            })
        );
        return {
            success: true,
        };
    }

    private closeDebuggingWindow(
        _: CloseDebuggingWindowCommandData
    ): ICommandResult<CloseDebuggingWindowCommandResultType> {
        this._commandService.send(
            createHideGuiCommand({
                id: DebuggingGuiJson.id,
            })
        );
        return {
            success: true,
        };
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
        const newMessageGuiId = `GUI_Debugging-Message_${index}`;
        this._commandService.send(
            createCreateGuiCommand({
                id: newMessageGuiId,
                layoutId: DebuggingMessageGuiJson.id,
                parentControlId: this._queryService.query(
                    createQueryForGenerateGuiControlId({
                        guiId: DebuggingGuiJson.id,
                        controlId: "debugging_console-Panel",
                    })
                ).result,
                controlDataList: [
                    {
                        controlId: "debugging_console_message-text",
                        options: {
                            text: message,
                        },
                    },
                ],
            })
        );
        this._commandService.send(
            createActivateGuiCommand({
                id: newMessageGuiId,
            })
        );
    }
}
