import { ICommandService } from "../../../core/command";
import { translation } from "../../../core/i18n/I18nServices";
import { Inject } from "../../../core/ioc";
import {
    isObjectDefined,
    isObjectNotDefined,
} from "../../../core/object/ObjectCheck";
import objectMerge from "../../../core/object/ObjectMerge";
import { LifeCycleEntity } from "../../lifecycle/model/LifeCycleEntity";
import { runClientScript } from "../../system/client/scripts/run/RunClientScript";
import { IGui } from "../api/IGui";
import { IGuiControlData } from "../api/IGuiControlData";
import { IGuiLayoutControlData } from "../api/IGuiLayoutControlData";
import { IGuiLayoutData } from "../api/IGuiLayoutData";
import { createDisposeOfGuiControlCommand } from "../dispose/DisposeOfGuiControlCommand";
import { createRegisterGuiControlCommand } from "../register/RegisterGuiControlCommand";
import { createSetupGuiLayoutCommand } from "../setup/SetupGuiLayoutCommand";
import { createUpdateGuiControlCommand } from "../update/UpdateGuiControlCommand";

export class GuiFromData extends LifeCycleEntity implements IGui {
    public get guiId(): string {
        return this._guiId;
    }
    public get layoutId(): string {
        return this._layout.id;
    }
    private _initialized: boolean = false;
    private _runActivate: boolean = false;
    private _flattenedControlList: IGuiLayoutControlData[] = [];

    constructor(
        private _guiId: string,
        private _layout: IGuiLayoutData,
        private _controlDataList?: IGuiControlData[],
        private _parentControlId?: string,
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        )
    ) {
        super();
    }
    public activate(): void {
        if (this._initialized) {
            this._flattenedControlList = this.getFlattenedControls();
            this._flattenedControlList.forEach(control =>
                this._commandService.send(
                    createRegisterGuiControlCommand({
                        guiId: this.guiId,
                        control,
                    })
                )
            );
            this._commandService.send(
                createSetupGuiLayoutCommand({
                    guiId: this.guiId,
                    layout: this._layout,
                    parentControlId: this._parentControlId,
                })
            );
            if (isObjectDefined(this._layout.activateScript)) {
                runClientScript(
                    `gui_from_data-${this.guiId}_${this.layoutId}-activate`,
                    this._layout.activateScript,
                    this
                );
            }
        } else {
            this._runActivate = true;
        }
    }
    public initialize(): void {
        if (isObjectDefined(this._layout.initializeScript)) {
            runClientScript(
                `gui_from_data-${this.guiId}_${this.layoutId}-initialize`,
                this._layout.initializeScript,
                this
            );
        }
        this._initialized = true;
        if (this._runActivate) {
            this.activate();
        }
    }
    public onDispose(): void {
        if (isObjectDefined(this._layout.disposeScript)) {
            runClientScript(
                `gui_from_data-${this.guiId}_${this.layoutId}-initialize`,
                this._layout.disposeScript,
                this
            );
        }

        this._flattenedControlList.forEach(control =>
            this._commandService.send(
                createDisposeOfGuiControlCommand({
                    guiId: this.guiId,
                    controlId: control.id,
                })
            )
        );
    }
    public update(): void {
        if (isObjectDefined(this._layout.updateScript)) {
            runClientScript(
                `gui_from_data-${this.guiId}_${this.layoutId}-initialize`,
                this._layout.updateScript,
                this
            );
        }
    }
    public draw(): void {
        if (isObjectDefined(this._layout.drawScript)) {
            runClientScript(
                `gui_from_data-${this.guiId}_${this.layoutId}-initialize`,
                this._layout.drawScript,
                this
            );
        }
    }
    public hide(): void {
        this._layout.controlList.forEach(control => {
            this._commandService.send(
                createUpdateGuiControlCommand({
                    guiId: this.guiId,
                    control: {
                        controlId: control.id,
                        isVisible: false,
                    },
                })
            );
        });
    }
    public show(): void {
        this._layout.controlList.forEach(control => {
            this._commandService.send(
                createUpdateGuiControlCommand({
                    guiId: this.guiId,
                    control: {
                        controlId: control.id,
                        isVisible: true,
                    },
                })
            );
        });
    }
    public linkWith(linkWith: any): void {
        this._layout.controlList.forEach(control => {
            this._commandService.send(
                createUpdateGuiControlCommand({
                    guiId: this.guiId,
                    control: {
                        controlId: control.id,
                        linkWith,
                    },
                })
            );
        });
    }

    private getFlattenedControls(): IGuiLayoutControlData[] {
        return this.flattenControlListInto([], this._layout.controlList);
    }
    private flattenControlListInto(
        array: IGuiLayoutControlData[],
        controlList: IGuiLayoutControlData[] = []
    ) {
        return controlList.reduce(
            (
                current: IGuiLayoutControlData[],
                prevValue: IGuiLayoutControlData
            ) => {
                this.flattenControlListInto(current, prevValue.controlList);
                current.push({
                    // controlId: prevValue.id, // TODO: To support reuse of layout data, look at appending the layout.id to the control values
                    ...prevValue,
                    options: objectMerge(prevValue.options || {}, {
                        ...this.getGeneratedOptions(
                            this.guiId,
                            this._layout,
                            prevValue
                        ),
                        ...this.getControlOptionsForControl(prevValue.id),
                    }),
                });
                return current;
            },
            array
        );
    }
    private getGeneratedOptions(
        guiId: string,
        layout: IGuiLayoutData,
        control: IGuiLayoutControlData
    ) {
        const options: { [key: string]: any } = {};
        const text = createOptionTextValueFromKey(control.options);
        const onClick = createOptionOnClickScriptFromOnClick(
            guiId,
            layout,
            control
        );
        if (isObjectDefined(text)) {
            options.text = text;
        }
        if (isObjectDefined(onClick)) {
            options.onClick = onClick;
        }
        return options;
    }
    private getControlOptionsForControl(controlId: string): any {
        return (
            (this._controlDataList || []).filter(
                controlData => controlData.controlId === controlId
            )[0] || { options: {} }
        ).options;
    }
}

const createOptionTextValueFromKey = (options?: any) => {
    if (isObjectNotDefined(options) || isObjectNotDefined(options.textKey)) {
        return undefined;
    }
    if (isObjectDefined(options.text)) {
        return options.text;
    }
    return translation(options.textKey);
};
const createOptionOnClickScriptFromOnClick = (
    guiId: string,
    layout: IGuiLayoutData,
    control: IGuiLayoutControlData
) => {
    const { options } = control;
    if (
        isObjectNotDefined(options) ||
        isObjectNotDefined(options.onClickScript)
    ) {
        return undefined;
    }
    if (isObjectDefined(options.onClick)) {
        return options.onClick;
    }
    return () => {
        runClientScript(
            `gui_from_data-${guiId}_${layout.id}-script_${options.onClickScript}`,
            options.onClickScript,
            {
                layout,
                control,
            }
        );
    };
};
