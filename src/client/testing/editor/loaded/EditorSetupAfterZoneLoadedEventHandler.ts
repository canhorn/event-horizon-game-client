import { ICommandService } from "../../../../engine/command/api/ICommandService";
import { IEventType } from "../../../../engine/event/EventType";
import {
    IEventHandler,
    IEventService,
} from "../../../../engine/event/IEventService";
import { Inject } from "../../../../engine/ioc/Create";
import { IInitializable } from "../../../../engine/lifecycle/IInitializable";
import { IRegisterInitializable } from "../../../../engine/lifecycle/register/IRegisterInitializable";
import { createLogger } from "../../../../engine/logger/InjectLoggerDecorator";
import { ILogger } from "../../../../engine/logger/LoggerFactory";
import { IGuid } from "../../../../engine/math/guid/IGuid";
import { IModule } from "../../../../engine/module/IModule";
import { LifeCycleModule } from "../../../../engine/module/model/LifeCycleModule";
import { IQueryService } from "../../../../engine/query/IQueryService";
import { createQueryForEntity } from "../../../entity/tracked/query/QueryForEntity";
import { createTypeTag } from "../../../entity/tracked/tagTypes/CreateTypeTag";
import { IPlayerEntity } from "../../../player/api/IPlayerEntity";
import {
    IInputModule,
    INPUT_MODULE_NAME,
} from "../../../player/modules/input/api/IInputModule";
import {
    ZONE_LOADED_EVENT,
    ZoneLoadedEventData,
} from "../../../zone/load/ZoneLoadedEvent";

/**
 * Event Name: EditorSetupAfterZoneLoadedEventHandler
 * Type: Event
 */
export class EditorSetupAfterZoneLoadedEventHandler implements IEventHandler {
    public type: IEventType = ZONE_LOADED_EVENT;
    constructor(
        private readonly _guid: IGuid = Inject(IGuid),
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _queryService: IQueryService = Inject(IQueryService),
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        )
    ) {}
    public handle({  }: ZoneLoadedEventData): void {
        // Get Player
        const playerQuery = this._queryService.query(
            createQueryForEntity<IPlayerEntity>({
                tag: createTypeTag("player"),
            })
        );
        if (!playerQuery.success || playerQuery.result.length === 0) {
            return; // dont care, player not found
        }
        const player = playerQuery.result[0];
        player.registerModule(EDITOR_MODULE_NAME, new EditorModule(player));
    }
}

export const EDITOR_MODULE_NAME = "EDITOR_MODULE_NAME";
export interface IEditorModule extends IModule {}
export class EditorModule extends LifeCycleModule
    implements IEditorModule, IInitializable {
    constructor(
        private player: IPlayerEntity,
        private readonly _logger: ILogger = createLogger("InputModule"),
        private readonly _registerInitializable: IRegisterInitializable = Inject(
            IRegisterInitializable
        ),
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _queryService: IQueryService = Inject(IQueryService)
    ) {
        super();
        _registerInitializable.register(this);
    }
    public initialize(): void {}
    public postInitialize(): void {
        const inputModule = this.player.getProperty<IInputModule>(
            INPUT_MODULE_NAME
        );
        inputModule.registerInput({
            key: "alt+shift+e",
            released: this.onEnableEditor,
        });
    }
    public update(): void {}
    public dispose(): void {
        const inputModule = this.player.getProperty<IInputModule>(
            INPUT_MODULE_NAME
        );
        inputModule.unRegisterInput({
            key: "alt+shift+e",
            released: this.onEnableEditor,
        });
        this._registerInitializable.unregister(this);
    }
    private onEnableEditor() {
        alert("Enable editor");
    }
}
