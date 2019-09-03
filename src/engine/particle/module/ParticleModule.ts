import { ParticleSystem } from "babylonjs";
import { Inject } from "../../../core/ioc";
import { IRenderingScene } from "../../renderer/api/IRenderingScene";
import { updateParticleSystem } from "../impl/ParticleSystem";
import { IParticleSettings } from "../model/IParticleSettings";
import { IParticleModule } from "./IParticleModule";

export class ParticleModule implements IParticleModule {
    private _id: number;
    private _settings: IParticleSettings;
    private _particleSystem: ParticleSystem;

    public get id() {
        return this._id;
    }
    public get settings() {
        return this._settings;
    }
    public get particleSystem() {
        return this._particleSystem;
    }

    constructor(
        id: number,
        settings: IParticleSettings,
        particleSystem: ParticleSystem,
        private readonly _renderingScene: IRenderingScene = Inject(
            IRenderingScene
        )
    ) {
        this._id = id;
        this._settings = settings;
        this._particleSystem = particleSystem;
    }

    public start() {
        this._particleSystem.start();
    }
    public stop() {
        this._particleSystem.stop();
    }
    public dispose() {
        this._particleSystem.dispose();
    }
    public update(settings: IParticleSettings) {
        this._particleSystem = updateParticleSystem(
            this._particleSystem,
            (this._settings = settings),
            this._renderingScene.scene
        );
    }
}
