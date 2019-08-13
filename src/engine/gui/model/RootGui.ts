import { GuiControlLayout, GuiRegisteringControl, GuiTemplate } from ".";
import { ICommandService } from "../../command/api/ICommandService";
import { Inject } from "../../ioc/Create";
import { LifeCycleEntity } from "../../lifecycle/model/LifeCycleEntity";
import { createLogger } from "../../logger/InjectLoggerDecorator";
import { ILogger } from "../../logger/LoggerFactory";
import { activateGuiLayoutCommand } from "../activate/ActivateLayoutCommand";
import { IGuiConfiguration } from "../api/IGuiConfiguration";
import { createCreateGuiCommand } from "../create/CreateGuiCommand";
import { createDisposeOfGuiLayoutCommand } from "../dispose/DisposeOfGuiLayoutCommand";
import {
    RegisterControlCommandData,
    registerGuiControlCommand,
} from "../register/RegisterControlCommand";

export abstract class RootGui extends LifeCycleEntity {
    constructor(
        protected _guiConfiguration: IGuiConfiguration,
        private readonly _logger: ILogger = createLogger("RootGui"),
        protected readonly _commandService: ICommandService = Inject(
            ICommandService
        )
    ) {
        super();
    }
    public abstract onPostInitialize(): void;
    public abstract onInitialize(): void;
    public abstract onUpdate(): void;
    public abstract onDispose(): void;
    public abstract onDraw(): void;
    public abstract createLayoutList(layoutId: string): GuiControlLayout[];
    public abstract createTemplateList(layoutId: string): GuiTemplate[];
    public abstract createControlList(
        layoutId: string
    ): GuiRegisteringControl[];

    public generateRootId(layoutId: string): string {
        return `root_gui-${this.id}-${layoutId}`;
    }

    public postInitialize(): void {
        super.postInitialize();
        this.onPostInitialize();
    }

    public initialize(): void {
        this._logger.debug("GUI Initializing");
        const { layoutId, parentId } = this._guiConfiguration;
        // Create the GUI Layout's and Template's
        this._commandService.send(
            createCreateGuiCommand({
                layoutList: this.createGuiLayout(
                    this.createLayoutList(layoutId)
                ),
                templateList: this.createGuiTemplates(
                    this.createTemplateList(layoutId)
                ),
            })
        );

        // Register the GUI Controls, built from Template's
        this.getControlsWithData(this.createControlList(layoutId)).forEach(
            control =>
                this._commandService.send(registerGuiControlCommand(control))
        );
        // Activate the Layout List
        this.createLayoutList(layoutId).map(layout => {
            this._commandService.send(
                activateGuiLayoutCommand({
                    layoutId: this.generateRootId(layout.id),
                    parentId,
                })
            );
        });
        this._logger.debug("GUI Initialized");
        this.onInitialize();
    }

    public update(): void {
        this.onUpdate();
    }

    public dispose(): void {
        this.createLayoutList(
            this.generateRootId(this._guiConfiguration.layoutId)
        ).map(({ id: layoutId }) =>
            this._commandService.send(
                createDisposeOfGuiLayoutCommand({
                    layoutId,
                })
            )
        );
        super.dispose();
    }

    public draw(): void {
        this.onDraw();
    }

    private createGuiLayout(
        layoutList: GuiControlLayout[]
    ): GuiControlLayout[] {
        return layoutList.map(layout => ({
            ...layout,
            id: this.generateRootId(layout.id),
            controlList: this.createGuiLayoutControlList(layout.controlList),
        }));
    }

    private createGuiLayoutControlList(
        controlList?: GuiControlLayout[]
    ): GuiControlLayout[] | undefined {
        if (!controlList) {
            return controlList;
        }
        return controlList.map(control => ({
            ...control,
            id: this.generateRootId(control.id),
            controlList: this.createGuiLayoutControlList(control.controlList),
        }));
    }

    private createGuiTemplates(templateList: GuiTemplate[]) {
        return templateList.map(template => ({
            ...template,
            id: this.generateRootId(template.id),
        }));
    }

    private getControlsWithData(
        controlList: GuiRegisteringControl[]
    ): RegisterControlCommandData[] {
        return controlList.map(control => ({
            ...control,
            controlId: this.generateRootId(control.controlId),
            templateId: this.generateRootId(control.templateId),
        }));
    }
}
