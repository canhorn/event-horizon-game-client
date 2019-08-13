import { Color4, ParticleSystem, Scene, Texture, Vector3 } from "babylonjs";
import { isObjectDefined } from "../../../core/object/ObjectCheck";
import { IParticleSettings } from "../model/IParticleSettings";

export const createParticleSystem = (
    templateSettings: IParticleSettings,
    settings: IParticleSettings,
    scene: Scene
) => {
    const particleSettings = Object.assign({}, templateSettings, settings);
    return updateParticleSystem(
        new ParticleSystem(
            particleSettings.name || "default_name",
            particleSettings.capacity || 0,
            scene
        ),
        particleSettings,
        scene
    );
};
export const updateParticleSystem = (
    system: ParticleSystem,
    settings: IParticleSettings,
    scene: Scene
) => {
    if (isObjectDefined(settings.particleTexture)) {
        system.particleTexture && system.particleTexture.dispose();
        system.particleTexture = new Texture(
            settings.particleTexture || null,
            scene
        );
    }
    system.emitter = settings.emitter;

    system.minEmitBox =
        validateAsVector3(settings.minEmitBox) || system.minEmitBox;
    system.maxEmitBox =
        validateAsVector3(settings.maxEmitBox) || system.maxEmitBox;

    system.color1 = validateAsColor4(settings.color1) || system.color1;
    system.color2 = validateAsColor4(settings.color2) || system.color2;
    system.colorDead = validateAsColor4(settings.colorDead) || system.colorDead;

    system.minSize = settings.minSize || system.emitRate;
    system.maxSize = settings.maxSize || system.emitRate;
    system.minLifeTime = settings.minLifeTime || system.minLifeTime;
    system.maxLifeTime = settings.maxLifeTime || system.maxLifeTime;
    system.emitRate = settings.emitRate || system.emitRate;

    system.direction1 =
        validateAsVector3(settings.direction1) || system.direction1;
    system.direction2 =
        validateAsVector3(settings.direction2) || system.direction2;

    system.minAngularSpeed = settings.minAngularSpeed || system.minAngularSpeed;
    system.maxAngularSpeed = settings.maxAngularSpeed || system.maxAngularSpeed;

    system.minEmitPower = settings.minEmitPower || system.minEmitPower;
    system.maxEmitPower = settings.maxEmitPower || system.maxEmitPower;

    system.updateSpeed = settings.updateSpeed || system.updateSpeed;

    system.gravity = validateAsVector3(settings.gravity) || system.gravity;

    system.blendMode = settings.blendMode || system.blendMode;

    return system;
};

const validateAsVector3 = (vector?: Vector3) => {
    if (vector && !vector.getClassName) {
        return new Vector3(vector.x, vector.y, vector.z);
    }
    return vector;
};
const validateAsColor4 = (color?: Color4) => {
    if (color && !color.getClassName) {
        return new Color4(color.r, color.g, color.b, color.a);
    }
    return color;
};
