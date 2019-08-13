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
import { IQueryService } from "../../../../engine/query/IQueryService";

export class ZoneRootGui extends LifeCycleEntity {
    constructor(
        private readonly _logger: ILogger = createLogger("ZoneGui"),
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        ),
        private readonly _queryService: IQueryService = Inject(IQueryService),
        private readonly _eventService: IEventService = Inject(IEventService)
    ) {
        super();
    }
    public initialize(): void {
        // Account Info
        this._logger.debug("Gui Initialize");
        // Create GUI
        this._commandService.send(
            createCreateGuiCommand({
                layoutList: this.createGuiLayout(),
                templateList: this.createGuiTemplates(),
            })
        );

        this.getControlsWithData({}).forEach(control =>
            this._commandService.send(registerGuiControlCommand(control))
        );

        this._commandService.send(
            activateGuiLayoutCommand({
                layoutId: "zone_root",
            })
        );
    }
    public update(): void {}
    public onDispose(): void {
        this._commandService.send(
            createDisposeOfGuiLayoutCommand({
                layoutId: "zone_root",
            })
        );
    }
    public draw(): void {}

    private createGuiTemplates() {
        const layoutTemplate: GuiTemplate = {
            id: "zone_root-grid",
            type: GuiControlType.Grid,
            options: {
                column: 3,
                row: 3,
                backgroundColor: "transparent",
            },
        };
        return [layoutTemplate];
    }

    private getControlsWithData({  }: {}): RegisterControlCommandData[] {
        return [
            {
                controlId: "zone_root-grid",
                templateId: "zone_root-grid",
            },
        ];
    }

    private createGuiLayout(): GuiControlLayout[] {
        return [
            {
                id: "zone_root",
                sort: 0,
                controlList: [
                    {
                        id: "zone_root-grid",
                        sort: 0,
                        controlList: [],
                    },
                ],
            },
        ];
    }
}
