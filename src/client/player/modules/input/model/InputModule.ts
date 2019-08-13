import { autobind } from "../../../../../core/autobind/autobind";
import { throttle } from "../../../../../core/throttle/Throttle";
import { takeScreenshotEvent } from "../../../../../engine/debugging/screenshot/TakeScreenshotEvent";
import { IEventService } from "../../../../../engine/event/IEventService";
import { InputOptions } from "../../../../../engine/input/InputModel";
import { IRegisterInput } from "../../../../../engine/input/IRegisterInput";
import { IUnregisterInput } from "../../../../../engine/input/IUnregisterInput";
import { Inject } from "../../../../../engine/ioc/Create";
import { createLogger } from "../../../../../engine/logger/InjectLoggerDecorator";
import { ILogger } from "../../../../../engine/logger/LoggerFactory";
import { LifeCycleModule } from "../../../../../engine/module/model/LifeCycleModule";
import { IQueryService } from "../../../../../engine/query/IQueryService";
import { IObjectEntity } from "../../../../entity/api/IObjectEntity";
import { createQueryForEntity } from "../../../../entity/tracked/query/QueryForEntity";
import { createTypeTag } from "../../../../entity/tracked/tagTypes/CreateTypeTag";
import { createRunInteractionEvent } from "../../../../modules/interactionIndicator/run/RunInteractionEvent";
import { MoveDirection } from "../../../../systems/move/model/MoveDirection";
import { createPlayerActionEvent } from "../../../action/PlayerActionEvent";
import {
    PlayerAction,
    PlayerAction_DECREASE_ENTITY_HP,
    PlayerAction_INCREASE_ENTITY_HP,
    PlayerAction_TESTING_PATH_ENTITY_TO_PLAYER,
} from "../../../actions/api/PlayerActions";
import { IPlayerEntity } from "../../../api/IPlayerEntity";
import { createSetCameraToFollowEvent } from "../../camera/set/SetCameraToFollowEvent";
import { createSetCameraToFreeEvent } from "../../camera/set/SetCameraToFreeEvent";
import { IInputModule } from "../api/IInputModule";

const PLAYER_MOVEMENT_DELAY: number = 100;

export class InputModule extends LifeCycleModule implements IInputModule {
    private _throttledMovePlayerEvent: (moveDirection: MoveDirection) => void;

    constructor(
        private player: IPlayerEntity,
        private readonly _logger: ILogger = createLogger("InputModule"),
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _queryService: IQueryService = Inject(IQueryService),
        private readonly _registerInput: IRegisterInput = Inject(
            IRegisterInput
        ),
        private readonly _unregisterInput: IUnregisterInput = Inject(
            IUnregisterInput
        )
    ) {
        super();
        this.initialize();
        this._throttledMovePlayerEvent = throttle(
            this.movePlayerEvent,
            PLAYER_MOVEMENT_DELAY,
            this
        );
    }
    public registerInput(options: InputOptions) {
        this._registerInput.register(options);
    }
    public unRegisterInput(options: InputOptions) {
        this._unregisterInput.unregister(options);
    }
    public resetToDefaultLayout() {
        this.disposeOfKeyboard();
        this.initKeyboard();
    }
    public initialize(): void {
        this.initKeyboard();
    }
    public update(): void {}
    public dispose(): void {
        this.disposeOfKeyboard();
    }

    private initKeyboard() {
        this._registerInput.register({
            key: "f",
            released: this.onPublishInteractionEvent,
        });

        this._registerInput.register({
            key: "w",
            pressed: this.moveForward,
            released: this.moveActionReleased,
        });
        this._registerInput.register({
            key: "a",
            pressed: this.moveLeft,
            released: this.moveActionReleased,
        });
        this._registerInput.register({
            key: "d",
            pressed: this.moveRight,
            released: this.moveActionReleased,
        });
        this._registerInput.register({
            key: "s",
            pressed: this.moveBack,
            released: this.moveActionReleased,
        });
        this._registerInput.register({
            key: "1",
            released: this.changeToFreeCamera,
        });
        this._registerInput.register({
            key: "2",
            released: this.changeToFollowCamera,
        });
        this._registerInput.register({
            key: "6",
            released: this.moveRandomEntityToPlayer,
        });

        this._registerInput.register({
            key: "9",
            pressed: this.increasePlayerHealth,
        });
        this._registerInput.register({
            key: "0",
            pressed: this.decreasePlayerHealth,
        });

        this._registerInput.register({
            key: "m",
            pressed: this.takeScreenshot,
        });
    }

    private disposeOfKeyboard() {
        this._unregisterInput.unregister({
            key: "f",
            released: this.onPublishInteractionEvent,
        });

        this._unregisterInput.unregister({
            key: "w",
            pressed: this.moveForward,
            released: this.moveActionReleased,
        });
        this._unregisterInput.unregister({
            key: "a",
            pressed: this.moveLeft,
            released: this.moveActionReleased,
        });
        this._unregisterInput.unregister({
            key: "d",
            pressed: this.moveRight,
            released: this.moveActionReleased,
        });
        this._unregisterInput.unregister({
            key: "s",
            pressed: this.moveBack,
            released: this.moveActionReleased,
        });
        this._unregisterInput.unregister({
            key: "1",
            released: this.changeToFreeCamera,
        });
        this._unregisterInput.unregister({
            key: "2",
            released: this.changeToFollowCamera,
        });
        this._unregisterInput.unregister({
            key: "6",
            released: this.moveRandomEntityToPlayer,
        });

        this._unregisterInput.unregister({
            key: "9",
            pressed: this.increasePlayerHealth,
        });
        this._unregisterInput.unregister({
            key: "0",
            pressed: this.decreasePlayerHealth,
        });

        // this._unregisterInput.unregister({
        //     key: "k",
        //     pressed: this.runTestSkill
        // });

        this._unregisterInput.unregister({
            key: "m",
            pressed: this.takeScreenshot,
        });
    }

    @autobind
    private onPublishInteractionEvent() {
        this._eventService.publish(createRunInteractionEvent({}));
    }

    @autobind
    private moveForward() {
        this._throttledMovePlayerEvent(MoveDirection.Forward);
    }
    @autobind
    private moveLeft() {
        this._throttledMovePlayerEvent(MoveDirection.Left);
    }
    @autobind
    private moveRight() {
        this._throttledMovePlayerEvent(MoveDirection.Right);
    }
    @autobind
    private moveBack() {
        this._throttledMovePlayerEvent(MoveDirection.Backwards);
    }

    @autobind
    private movePlayerEvent(moveDirection: MoveDirection) {
        this._eventService.publish(
            createPlayerActionEvent({
                action: PlayerAction.MOVE,
                data: moveDirection,
            })
        );
    }
    @autobind
    private moveActionReleased() {
        this._eventService.publish(
            createPlayerActionEvent({
                action: PlayerAction.STOP,
            })
        );
    }

    @autobind
    private changeToFreeCamera() {
        this._eventService.publish(createSetCameraToFreeEvent({}));
    }
    @autobind
    private changeToFollowCamera() {
        this._eventService.publish(createSetCameraToFollowEvent({}));
    }
    @autobind
    private moveRandomEntityToPlayer() {
        this.getAllMoveToPlayer();
    }

    @autobind
    private getAllMoveToPlayer() {
        this._queryService
            .query(
                createQueryForEntity<IPlayerEntity>({
                    not: true,
                    tag: createTypeTag("player"),
                })
            )
            .result.forEach(entity =>
                this._eventService.publish(
                    createPlayerActionEvent({
                        action: PlayerAction_TESTING_PATH_ENTITY_TO_PLAYER,
                        data: entity.getProperty("id"),
                    })
                )
            );
    }

    @autobind
    private increasePlayerHealth() {
        this._queryService
            .query(
                createQueryForEntity<IPlayerEntity>({
                    tag: createTypeTag("player"),
                })
            )
            .result.slice(0, 1)
            .forEach(({ entityId }) =>
                this._eventService.publish(
                    createPlayerActionEvent({
                        action: PlayerAction_INCREASE_ENTITY_HP,
                        data: {
                            entityId,
                            points: 1,
                        },
                    })
                )
            );
    }

    @autobind
    private decreasePlayerHealth() {
        this._queryService
            .query(
                createQueryForEntity<IPlayerEntity>({
                    tag: createTypeTag("player"),
                })
            )
            .result.slice(0, 1)
            .forEach(({ entityId }) =>
                this._eventService.publish(
                    createPlayerActionEvent({
                        action: PlayerAction_DECREASE_ENTITY_HP,
                        data: {
                            entityId,
                            points: 1,
                        },
                    })
                )
            );
    }

    @autobind
    private runTestSkill() {
        this._queryService
            .query(
                createQueryForEntity<IObjectEntity>({
                    not: true,
                    tag: createTypeTag("player"),
                })
            )
            .result.slice(0, 1)
            .forEach(entity =>
                this._eventService.publish(
                    createPlayerActionEvent({
                        action: "Player.RUN_SKILL",
                        data: {
                            casterId: this.player.entityId,
                            targetId: entity.entityId,
                            skillId: "fire_ball",
                        },
                    })
                )
            );
    }

    @autobind
    private takeScreenshot() {
        this._eventService.publish(takeScreenshotEvent);
    }
}
