import { AnimationGroup } from "babylonjs";
import { Dictionary } from "../../../../core/collection/Dictionary";
import { IDictionary } from "../../../../core/collection/IDictionary";
import { IEventService } from "../../../../core/event";
import { Inject } from "../../../../core/ioc";
import { IEntity } from "../../../../engine/entity/api/IEntity";
import { LifeCycleModule } from "../../../../engine/module/model/LifeCycleModule";
import {
    ENTITY_ENTERING_VIEW_EVENT,
    EntityEnteringViewEventData,
} from "../../inView/entering/EntityEnteringViewEvent";
import { ENTITY_EXITING_VIEW_EVENT } from "../../inView/exiting/EntityExitingViewEvent";
import { IAnimationModule } from "../api/IAnimationModule";
import {
    ANIMATION_LIST_LOADED_EVENT,
    AnimationLoadedEventData,
} from "../listLoaded/AnimationListLoadedEvent";
import {
    PLAY_ANIMATION_EVENT,
    PlayAnimationEventData,
} from "../play/PlayAnimationEvent";

export class AnimationModule extends LifeCycleModule
    implements IAnimationModule {
    private _enabled: boolean = true;
    private _entity: IEntity;
    private _animationList: IDictionary<
        string,
        AnimationGroup
    > = new Dictionary();
    private _currentAnimation: string = "__invalid__";

    constructor(
        entity: IEntity,
        private readonly _eventService: IEventService = Inject(IEventService)
    ) {
        super();
        this._entity = entity;
        this._eventService.on(
            ANIMATION_LIST_LOADED_EVENT,
            this.onAnimationListLoaded,
            this
        );
        // Add play animation listener
        this._eventService.on(PLAY_ANIMATION_EVENT, this.onPlayAnimation, this);
        this._eventService.on(
            ENTITY_ENTERING_VIEW_EVENT,
            this.onEnteringView,
            this
        );
        this._eventService.on(
            ENTITY_EXITING_VIEW_EVENT,
            this.onExitingView,
            this
        );
    }
    public dispose(): void {
        this._eventService.off(
            ANIMATION_LIST_LOADED_EVENT,
            this.onAnimationListLoaded,
            this
        );
        this._eventService.off(
            PLAY_ANIMATION_EVENT,
            this.onPlayAnimation,
            this
        );
        this._eventService.off(
            ENTITY_ENTERING_VIEW_EVENT,
            this.onEnteringView,
            this
        );
        this._eventService.off(
            ENTITY_EXITING_VIEW_EVENT,
            this.onExitingView,
            this
        );
    }
    public update(): void {}

    private onAnimationListLoaded({
        entityId,
        animationList,
    }: AnimationLoadedEventData) {
        if (entityId !== this._entity.id) {
            return;
        }
        this._animationList.clear();
        animationList.forEach(animation =>
            this._animationList.setValue(animation.name, animation)
        );
        this._animationList.forEach((_, value) => value.pause());
    }
    private onPlayAnimation({ entityId, animation }: PlayAnimationEventData) {
        if (
            entityId !== this._entity.id ||
            this._currentAnimation === animation
        ) {
            return;
        }
        const currentAnimation = this._animationList.getValue(
            this._currentAnimation
        );
        if (currentAnimation) {
            currentAnimation.pause();
        }
        const nextAnimation = this._animationList.getValue(animation);
        if (nextAnimation) {
            if (this._enabled) {
                nextAnimation.play(true);
            }
            this._currentAnimation = animation;
        }
    }
    private onEnteringView({ entityId }: EntityEnteringViewEventData) {
        if (this._entity.id !== entityId) {
            return;
        }
        const currentAnimation = this._animationList.getValue(
            this._currentAnimation
        );
        if (currentAnimation) {
            currentAnimation.play();
        }
        this._enabled = true;
    }
    private onExitingView(entityId: number) {
        if (this._entity.id !== entityId) {
            return;
        }
        const currentAnimation = this._animationList.getValue(
            this._currentAnimation
        );
        if (currentAnimation) {
            currentAnimation.pause();
        }
        this._enabled = false;
    }
}
