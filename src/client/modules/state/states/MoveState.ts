import { Mesh, Vector3 } from "babylonjs";
import { Inject } from "../../../../core/ioc";
import { Entity } from "../../../../engine/entity/model/Entity";
import { IRenderingTime } from "../../../../engine/renderer/api/IRenderingTime";
import { IHeightResolver } from "../../../systems/height/api/IHeightResolver";
import { IState } from "../api/IState";

const DEFAULT_MOVE_SPEED: number = 100;
const DEFAULT_ROTATION_SPEED: number = 0.1;
const FORWARD_DIRECTION: Vector3 = Vector3.Forward();
const RIGHT_DIRECTION: Vector3 = Vector3.Right();

export class MoveState extends Entity implements IState {
    public name: string;
    public remove: boolean;

    private _entityId: number;
    private currentPosition: () => Vector3;
    private currentRotation: () => Mesh;
    private distanceEpsilon: number;
    private path: Vector3[];
    private _setCurrentMoveTo: (currentMoveTo: Vector3) => void;
    private _speed: number;

    constructor(
        entityId: number,
        name: string,
        currentPosition: () => Vector3,
        currentRotation: () => Mesh,
        distanceEpsilon: number,
        path: Vector3[],
        setCurrentMoveTo: (currentMoveTo: Vector3) => void,
        speed: number,
        private readonly _renderingTime: IRenderingTime = Inject(
            IRenderingTime
        ),
        private readonly _heightResolver: IHeightResolver = Inject(
            IHeightResolver
        )
    ) {
        super();
        this.name = name;
        this.remove = false;

        this._entityId = entityId;
        this.currentPosition = currentPosition;
        this.currentRotation = currentRotation;
        this.distanceEpsilon = distanceEpsilon || 0.5;
        this.path = path || [];
        this._setCurrentMoveTo = setCurrentMoveTo;
        this._speed = speed || 1;
    }
    public reset(): void {
        this.remove = false;
        this.path = [];
    }

    public update(): void {
        const deltaTime = this._renderingTime.deltaTime;
        if (this.path.length > 0) {
            const currentMoveTo = this.path[0];
            this._setCurrentMoveTo(currentMoveTo);
            const currentPos = this.currentPosition();
            const toDestination = currentMoveTo.subtract(currentPos);
            const distanceToDestination = toDestination.length();

            if (distanceToDestination >= this.distanceEpsilon) {
                const direction = toDestination.normalize();
                this.Move(direction, deltaTime);
                this.Rotate(toDestination);
            } else {
                this.path.shift();
            }
        } else {
            this.remove = true;
        }
    }

    private Move(direction: Vector3, deltaTime: number) {
        const velocity = direction.multiply(
            new Vector3(
                (deltaTime / DEFAULT_MOVE_SPEED) * this._speed,
                0,
                (deltaTime / DEFAULT_MOVE_SPEED) * this._speed
            )
        );
        const position = this.currentPosition();
        position.addInPlace(velocity);
        position.y = this._heightResolver.findHeight(position.x, position.z);
    }

    private Rotate(direction: Vector3) {
        const currentEntity = this.currentRotation();
        const targetDirection = direction;
        if (targetDirection.lengthSquared() > 0.0) {
            targetDirection.normalize();
        }
        const facingDirection = currentEntity.getDirection(FORWARD_DIRECTION);
        const strafeDirection = currentEntity.getDirection(RIGHT_DIRECTION);

        const faceTargetDot = Vector3.Dot(facingDirection, targetDirection);
        let angle = -Math.acos(faceTargetDot);
        if (isNaN(angle)) {
            return;
        }
        const sideToRotate = Vector3.Dot(strafeDirection, targetDirection);

        if (sideToRotate > 0) {
            angle = -angle;
        }

        currentEntity.addRotation(0, angle * DEFAULT_ROTATION_SPEED, 0);
    }
}
