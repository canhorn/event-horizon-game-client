import { Vector3 } from "babylonjs";
import { IEventService } from "../../../../core/event";
import { Inject } from "../../../../core/ioc";
import { LifeCycleModule } from "../../../../engine/module/model/LifeCycleModule";
import { ClientActionEntityMoveEventData } from "../../../action/api/ClientActions";
import { IObjectEntity } from "../../../entity/api/IObjectEntity";
import { createEntityMovingEvent } from "../../../entity/moving/EntityMovingEvent";
import { IHeightResolver } from "../../../systems/height/api/IHeightResolver";
import { IMeshModule, MESH_MODULE_NAME } from "../../mesh/api/IMeshModule";
import { IStateModule, STATE_MODULE_NAME } from "../../state/api/IStateModule";
import { MoveState } from "../../state/states/MoveState";
import { IMoveModule } from "../api/IMoveModule";

export class MoveModule extends LifeCycleModule implements IMoveModule {
    public enabled: boolean = true;
    private _meshModule: IMeshModule;
    private _stateModule: IStateModule;
    private _currentMoveTo: Vector3 = Vector3.Zero();

    constructor(
        protected readonly _entity: IObjectEntity,
        protected readonly _speed: number,
        private readonly _heightResolver: IHeightResolver = Inject(
            IHeightResolver
        ),
        protected readonly _eventService: IEventService = Inject(IEventService)
    ) {
        super();
        this._meshModule = _entity.getProperty<IMeshModule>(MESH_MODULE_NAME);
        this._stateModule = _entity.getProperty<IStateModule>(
            STATE_MODULE_NAME
        );
    }

    public update(): void {}
    public dispose(): void {}

    public canMove(data: ClientActionEntityMoveEventData) {
        return true;
    }

    public onMove(data: ClientActionEntityMoveEventData): void {
        if (!this.enabled || !this.canMove(data)) {
            return;
        }
        const newMoveTo = this.mapMoveTo(data.moveTo);
        if (this._currentMoveTo.equals(newMoveTo)) {
            // nothing to do
            return;
        }
        this._currentMoveTo = newMoveTo;
        this._stateModule.clear();
        this._stateModule.add(
            new MoveState(
                this._entity.id,
                "move_entity",
                () => this._meshModule.mesh.position,
                () => this._meshModule.mesh,
                0.3,
                [this._currentMoveTo],
                (currentMoveTo: Vector3) =>
                    (this._currentMoveTo = currentMoveTo),
                this._speed
            )
        );
        this.emitEntityMovingEvent();
    }

    private mapMoveTo(moveTo: Vector3) {
        return new Vector3(
            moveTo.x,
            this._heightResolver.findHeight(moveTo.x, moveTo.z),
            moveTo.z
        );
    }
    private emitEntityMovingEvent() {
        this._eventService.publish(
            createEntityMovingEvent({
                entityId: this._entity.id,
            })
        );
    }
}
