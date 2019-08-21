import { translation } from "../../../../../core/i18n/I18nServices";
import {
    isObjectDefined,
    isObjectNotDefined,
} from "../../../../../core/object/ObjectCheck";
import objectMerge from "../../../../../core/object/ObjectMerge";
import { ICommandService } from "../../../../../engine/command/api/ICommandService";
import { activateGuiLayoutCommand } from "../../../../../engine/gui/activate/ActivateLayoutCommand";
import { createCreateGuiCommand } from "../../../../../engine/gui/create/CreateGuiCommand";
import { createDisposeOfGuiLayoutCommand } from "../../../../../engine/gui/dispose/DisposeOfGuiLayoutCommand";
import { GuiGridLocation } from "../../../../../engine/gui/model/GuiGridLocation";
import {
    RegisterControlCommandData,
    registerGuiControlCommand,
} from "../../../../../engine/gui/register/RegisterControlCommand";
import { Inject } from "../../../../../engine/ioc/Create";
import { LifeCycleEntity } from "../../../../../engine/lifecycle/model/LifeCycleEntity";
import { runClientScript } from "../../../../../engine/system/client/scripts/run/RunClientScript";

interface GuiLayout {
    id: string;
    sort: number;
    layer?: number;
    controlList?: GuiLayoutControl[];
    initializeScript?: string;
    disposeScript?: string;
    updateScript?: string;
    drawScript?: string;
}

interface GuiLayoutControl {
    id: string;
    sort: number;
    layer?: number;
    templateId: string;
    options?: any;
    gridLocation?: GuiGridLocation;
    controlList?: GuiLayoutControl[];
}

export class DataDrivenGuiLayout extends LifeCycleEntity {
    private _initialized: boolean = false;
    private _runActivate: boolean = false;
    constructor(
        private _layout: GuiLayout,
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        )
    ) {
        super();
    }
    public activate(): void {
        if (this._initialized) {
            this._commandService.send(
                activateGuiLayoutCommand({
                    layoutId: this._layout.id,
                })
            );
        } else {
            this._runActivate = true;
        }
    }
    public initialize(): void {
        this._commandService.send(
            createCreateGuiCommand({
                layoutList: [this._layout],
                templateList: [],
            })
        );

        this.getFlattenedControls().forEach(control =>
            this._commandService.send(registerGuiControlCommand(control))
        );
        this._initialized = true;
        if (this._runActivate) {
            this.activate();
        }
        if (isObjectDefined(this._layout.initializeScript)) {
            runClientScript(
                `data_driven_gui-${this._layout.id}-initialize`,
                this._layout.initializeScript,
                this
            );
        }
    }
    public onDispose(): void {
        if (isObjectDefined(this._layout.disposeScript)) {
            runClientScript(
                `data_driven_gui-${this._layout.id}-initialize`,
                this._layout.disposeScript,
                this
            );
        }

        this._commandService.send(
            createDisposeOfGuiLayoutCommand({
                layoutId: this._layout.id,
            })
        );
    }
    public update(): void {
        if (isObjectDefined(this._layout.updateScript)) {
            runClientScript(
                `data_driven_gui-${this._layout.id}-initialize`,
                this._layout.updateScript,
                this
            );
        }
    }
    public draw(): void {
        if (isObjectDefined(this._layout.drawScript)) {
            runClientScript(
                `data_driven_gui-${this._layout.id}-initialize`,
                this._layout.drawScript,
                this
            );
        }
    }

    private getFlattenedControls(): RegisterControlCommandData[] {
        return this.flattenControlListInto([], this._layout.controlList);
    }
    private flattenControlListInto(
        array: RegisterControlCommandData[],
        controlList: GuiLayoutControl[] = []
    ) {
        return controlList.reduce(
            (
                current: RegisterControlCommandData[],
                prevValue: GuiLayoutControl
            ) => {
                this.flattenControlListInto(current, prevValue.controlList);
                current.push({
                    controlId: prevValue.id,
                    ...prevValue,
                    options: objectMerge(prevValue.options || {}, {
                        text: createOptionTextValueFromKey(prevValue.options),
                        onClick: createOptionOnClickScriptFromOnClick(
                            this._layout,
                            prevValue
                        ),
                    }),
                });
                return current;
            },
            array
        );
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
    layout: GuiLayout,
    control: GuiLayoutControl
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
            `data_driven_gui-${layout.id}-script_${options.onClickScript}`,
            options.onClickScript,
            {
                layout,
                control,
            }
        );
    };
};
