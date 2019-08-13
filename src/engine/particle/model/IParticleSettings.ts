import { Color4, Mesh, Vector3 } from "babylonjs";

export interface IParticleSettings {
    name?: string;
    capacity?: number;
    particleTexture?: string | null;
    emitter: Mesh | Vector3;

    minEmitBox?: Vector3;
    maxEmitBox?: Vector3;
    color1?: Color4;
    color2?: Color4;
    colorDead?: Color4;
    minSize?: number;
    maxSize?: number;
    minLifeTime?: number;
    maxLifeTime?: number;
    emitRate?: number;
    gravity?: Vector3;
    direction1?: Vector3;
    direction2?: Vector3;
    minAngularSpeed?: number;
    maxAngularSpeed?: number;
    minEmitPower?: number;
    maxEmitPower?: number;
    updateSpeed?: number;

    blendMode?: number;
}
