import { translation } from '../../../../core/i18n/I18nServices';
import { ICommandService } from '../../../../engine/command/api/ICommandService';
import { IEventService } from '../../../../engine/event/IEventService';
import { activateGuiLayoutCommand } from '../../../../engine/gui/activate/ActivateLayoutCommand';
import { createCreateGuiCommand } from '../../../../engine/gui/create/CreateGuiCommand';
import { createDisposeOfGuiControlCommand } from '../../../../engine/gui/dispose/DisposeOfGuiControlCommand';
import { GuiControlLayout, GuiTemplate } from '../../../../engine/gui/model';
import { GuiControlType } from '../../../../engine/gui/model/GuiControlType';
import {
    RegisterControlCommandData,
    registerGuiControlCommand,
} from '../../../../engine/gui/register/RegisterControlCommand';
import { createUpdateGuiControlCommand } from '../../../../engine/gui/update/UpdateGuiControlCommand';
import { Inject } from '../../../../engine/ioc/Create';
import { LifeCycleEntity } from '../../../../engine/lifecycle/model/LifeCycleEntity';
import { createLogger } from '../../../../engine/logger/InjectLoggerDecorator';
import { ILogger } from '../../../../engine/logger/LoggerFactory';
import { IQueryService } from '../../../../engine/query/IQueryService';
import { ACCOUNT_CHANGED_EVENT } from '../../../account/changed/AccountChangedEvent';
import { createGetAccountQuery } from '../../../account/get/GetAccountQuery';
import { ZONE_CHANGED_EVENT } from '../../../zone/changed/ZoneChangedEvent';
import { createZoneDetailsQuery } from '../../../zone/query/ZoneDetailsQuery';
import { createStartSceneCommand } from '../../start/StartSceneCommand';
import GuiEditorGuiJson from './GuiEditor.Gui.json';

export class GuiEditorGui extends LifeCycleEntity {
    constructor(
        private readonly _logger: ILogger = createLogger('GuiEditorGui'),
        private readonly _queryService: IQueryService = Inject(IQueryService),
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        ),
        private readonly _eventService: IEventService = Inject(IEventService)
    ) {
        super();
    }
    public initialize(): void {
        // Create Main Menu GUI
        this._logger.debug('Main Menu Gui Initialize');
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
                layoutId: 'gui_editor',
            })
        );

        // Add Click events to controls
        this._commandService.send(
            createUpdateGuiControlCommand({
                controlId: 'gui_editor-account_details-button',
                options: {
                    text: translation('mainMenu_AccountDetails'),
                    onClick: () =>
                        this._commandService.send(
                            createStartSceneCommand({
                                sceneId: 'account-details',
                            })
                        ),
                },
            })
        );
        this._commandService.send(
            createUpdateGuiControlCommand({
                controlId: 'gui_editor-start_game-button',
                options: {
                    text: translation('mainMenu_StartGame'),
                    onClick: () =>
                        this._commandService.send(
                            createStartSceneCommand({
                                sceneId: 'zone',
                            })
                        ),
                },
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
                controlId: 'gui_editor-grid',
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
                controlId: 'gui_editor-account_details-button',
                options: {
                    isDisabled: false,
                },
            })
        );
    }
    private onZoneChanged() {
        this._commandService.send(
            createUpdateGuiControlCommand({
                controlId: 'gui_editor-start_game-button',
                options: {
                    isDisabled: false,
                },
            })
        );
    }

    private createGuiLayout(): GuiControlLayout[] {
        return [GuiEditorGuiJson.layout];
    }

    private createGuiTemplates() {
        return GuiEditorGuiJson.templateList;
    }

    private getControlsWithData(): RegisterControlCommandData[] {
        return GuiEditorGuiJson.controlList;
    }
}
