import { Curve3, HemisphericLight, Light, Vector3 } from "babylonjs";
import { Inject } from "../../../../core/ioc";
import { createLogger, ILogger } from "../../../../core/logger";
import { IRenderingScene } from "../../../../engine/renderer/api/IRenderingScene";
import { ILightEntity } from "../../api/ILightEntity";
import { ILightSettings } from "../../api/ILightSettings";
import { TrackedEntity } from "../../tracked/model/TrackedEntity";
import { createNameTag } from "../../tracked/tagTypes/CreateNameTag";
import { createTypeTag } from "../../tracked/tagTypes/CreateTypeTag";

export class HemisphericLightEntity extends TrackedEntity
    implements ILightEntity {
    get renderLight(): Light {
        return this._light;
    }
    private _light!: HemisphericLight;
    private _lightMovementVectorList: Vector3[] = [];

    constructor(
        private readonly _lightSettings: ILightSettings,
        private readonly _logger: ILogger = createLogger("GlobalLightEntity"),
        private readonly _renderingScene: IRenderingScene = Inject(
            IRenderingScene
        )
    ) {
        super();
    }

    public initialize(): void {
        this._logger.debug("Initialize");
        const { name, tags } = this._lightSettings;
        (tags || []).forEach(tag => this._tags.push(tag));
        this._tags.push(createTypeTag("light"), createNameTag(name));
        this._light = new HemisphericLight(
            name,
            new Vector3(0, 75, -10),
            this._renderingScene.scene
        );
    }
    public onDispose(): void {
        this._light.dispose();
    }
    public update(): void {
        if (this._lightSettings.enableDayNightCycle) {
            this.runSunlightMovement();
        }
    }
    public draw(): void {}

    private runSunlightMovement() {
        const lightMovementVector = this._lightMovementVectorList.shift();
        if (lightMovementVector) {
            this._light.direction.set(
                lightMovementVector.x,
                lightMovementVector.y,
                lightMovementVector.z
            );
            this._light.intensity = lightMovementVector.y / 500;
        }
        if (this._lightMovementVectorList.length === 0) {
            this._lightMovementVectorList = this.moveSunLight();
        }
    }

    private moveSunLight() {
        const multiplier = 4;
        return Curve3.CreateCatmullRomSpline(
            [
                new Vector3(10 * multiplier, 7 * multiplier, -25 * multiplier),
                new Vector3(5 * multiplier, 25 * multiplier, -25 * multiplier),
                new Vector3(0 * multiplier, 50 * multiplier, -25 * multiplier),
                new Vector3(-5 * multiplier, 25 * multiplier, -25 * multiplier),
                new Vector3(-10 * multiplier, 7 * multiplier, -25 * multiplier),
                new Vector3(-10 * multiplier, 7 * multiplier, -25 * multiplier),
                new Vector3(-5 * multiplier, 7 * multiplier, -25 * multiplier),
                new Vector3(0 * multiplier, 7 * multiplier, -25 * multiplier),
                new Vector3(5 * multiplier, 7 * multiplier, -25 * multiplier),
                new Vector3(10 * multiplier, 7 * multiplier, -25 * multiplier),
            ],
            360
        ).getPoints();
    }
}
