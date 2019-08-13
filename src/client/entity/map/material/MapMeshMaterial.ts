import {
    AbstractMesh,
    Matrix,
    Mesh,
    PointLight,
    Scene,
    StandardMaterial,
    SubMesh,
    Texture,
} from "babylonjs";
import { Inject } from "../../../../engine/ioc/Create";
import { IRenderingScene } from "../../../../engine/renderer/api/IRenderingScene";
import { createAssetLocationUrl } from "../../../assetServer/api/CreateAssetLocationUrl";

/**
 * This Material creates a material that will blend ground, grass, snow, sand, and rock textures.
 */
export class MapMeshMaterial extends StandardMaterial {
    private _settings: IGroundMaterialSettings;
    private light?: PointLight;
    private groundTexture: Texture;
    private grassTexture: Texture;
    private snowTexture: Texture;
    private sandTexture: Texture;
    private rockTexture: Texture;
    private blendTexture: Texture;
    private sandLimit: number;
    private rockLimit: number;
    private snowLimit: number;

    constructor(
        name: string,
        light?: PointLight,
        renderingScene: IRenderingScene = Inject(IRenderingScene)
    ) {
        super(name, renderingScene.scene);
        const scene = renderingScene.scene;
        if (light) {
            this.setLight(light);
        }
        const settings = (this._settings = DEFAULT_GROUND_MATERIAL_SETTINGS);
        const assetPath = createAssetLocationUrl(this._settings.assetPath);

        this.groundTexture = new Texture(
            this.buildAssetFile(assetPath, settings.groundTexture.file),
            scene
        );
        this.groundTexture.uScale = settings.groundTexture.uScale;
        this.groundTexture.vScale = settings.groundTexture.vScale;

        this.grassTexture = new Texture(
            this.buildAssetFile(assetPath, settings.grassTexture.file),
            scene
        );
        this.grassTexture.uScale = settings.grassTexture.uScale;
        this.grassTexture.vScale = settings.grassTexture.vScale;

        this.snowTexture = new Texture(
            this.buildAssetFile(assetPath, settings.snowTexture.file),
            scene
        );
        this.snowTexture.uScale = settings.snowTexture.uScale;
        this.snowTexture.vScale = settings.snowTexture.vScale;

        this.sandTexture = new Texture(
            this.buildAssetFile(assetPath, settings.sandTexture.file),
            scene
        );
        this.sandTexture.uScale = settings.sandTexture.uScale;
        this.sandTexture.vScale = settings.sandTexture.vScale;

        this.rockTexture = new Texture(
            this.buildAssetFile(assetPath, settings.rockTexture.file),
            scene
        );
        this.rockTexture.uScale = settings.rockTexture.uScale;
        this.rockTexture.vScale = settings.rockTexture.vScale;

        this.blendTexture = new Texture(
            this.buildAssetFile(assetPath, settings.blendTexture.file),
            scene
        );
        this.blendTexture.uOffset = Math.random();
        this.blendTexture.vOffset = Math.random();
        this.blendTexture.wrapU = Texture.MIRROR_ADDRESSMODE;
        this.blendTexture.wrapV = Texture.MIRROR_ADDRESSMODE;

        this.sandLimit = 1;
        this.rockLimit = 5;
        this.snowLimit = 8;
    }

    public setLight(light: PointLight) {
        this.light = light;
    }

    public needAlphaBlending() {
        return false;
    }
    public needAlphaTesting() {
        return false;
    }
    public isReadyForSubMesh(_: AbstractMesh, subMesh: SubMesh) {
        const engine = this.getScene().getEngine();

        if (!this.groundTexture.isReady()) {
            return false;
        }
        if (!this.snowTexture.isReady()) {
            return false;
        }
        if (!this.sandTexture.isReady()) {
            return false;
        }
        if (!this.rockTexture.isReady()) {
            return false;
        }
        if (!this.grassTexture.isReady()) {
            return false;
        }

        const defines = [];
        if (this.getScene().clipPlane) {
            defines.push("#define CLIPPLANE");
        }

        const join = defines.join("\n");
        const assetPath = createAssetLocationUrl(this._settings.assetPath);

        const effect =
            subMesh.effect ||
            engine.createEffect(
                `${assetPath}/Shaders/ground`,
                ["position", "normal", "uv"],
                [
                    "worldViewProjection",
                    "groundMatrix",
                    "sandMatrix",
                    "rockMatrix",
                    "snowMatrix",
                    "grassMatrix",
                    "blendMatrix",
                    "world",
                    "vLightPosition",
                    "vLimits",
                    "vClipPlane",
                ],
                [
                    "groundSampler",
                    "sandSampler",
                    "rockSampler",
                    "snowSampler",
                    "grassSampler",
                    "blendSampler",
                ],
                join
            );

        subMesh.setEffect(effect);
        if (!effect.isReady()) {
            return false;
        }

        this._wasPreviouslyReady = true;

        return true;
    }

    public bindForSubMesh(world: Matrix, _: Mesh, subMesh: SubMesh) {
        if (!subMesh.effect) {
            return;
        }
        subMesh.effect.setMatrix("world", world);
        subMesh.effect.setMatrix(
            "worldViewProjection",
            world.multiply(this.getScene().getTransformMatrix())
        );
        if (this.light) {
            subMesh.effect.setVector3(
                "vLightPosition",
                this.light.getAbsolutePosition()
            );
        }

        // Textures
        if (this.groundTexture) {
            subMesh.effect.setTexture("groundSampler", this.groundTexture);
            subMesh.effect.setMatrix(
                "groundMatrix",
                this.groundTexture.getTextureMatrix()
            );
        }
        if (this.sandTexture) {
            subMesh.effect.setTexture("sandSampler", this.sandTexture);
            subMesh.effect.setMatrix(
                "sandMatrix",
                this.sandTexture.getTextureMatrix()
            );
        }
        if (this.rockTexture) {
            subMesh.effect.setTexture("rockSampler", this.rockTexture);
            subMesh.effect.setMatrix(
                "rockMatrix",
                this.rockTexture.getTextureMatrix()
            );
        }
        if (this.snowTexture) {
            subMesh.effect.setTexture("snowSampler", this.snowTexture);
            subMesh.effect.setMatrix(
                "snowMatrix",
                this.snowTexture.getTextureMatrix()
            );
        }
        if (this.grassTexture) {
            subMesh.effect.setTexture("grassSampler", this.grassTexture);
            subMesh.effect.setMatrix(
                "grassMatrix",
                this.grassTexture.getTextureMatrix()
            );
        }
        if (this.blendTexture) {
            subMesh.effect.setTexture("blendSampler", this.blendTexture);
            subMesh.effect.setMatrix(
                "blendMatrix",
                this.blendTexture.getTextureMatrix()
            );
        }

        subMesh.effect.setFloat3(
            "vLimits",
            this.sandLimit,
            this.rockLimit,
            this.snowLimit
        );

        const clipPlane = this.getScene().clipPlane;
        if (clipPlane) {
            subMesh.effect.setFloat4(
                "vClipPlane",
                clipPlane.normal.x,
                clipPlane.normal.y,
                clipPlane.normal.z,
                clipPlane.d
            );
        }
    }

    public dispose() {
        if (this.grassTexture) {
            this.grassTexture.dispose();
        }
        if (this.groundTexture) {
            this.groundTexture.dispose();
        }
        if (this.snowTexture) {
            this.snowTexture.dispose();
        }
        if (this.sandTexture) {
            this.sandTexture.dispose();
        }
        if (this.rockTexture) {
            this.rockTexture.dispose();
        }

        super.dispose();
    }

    private buildAssetFile(assetPath: string, assetFile: string) {
        return `${assetPath}/${assetFile}`;
    }
}

const DEFAULT_GROUND_MATERIAL_SETTINGS: IGroundMaterialSettings = {
    assetPath: "/Assets/Material/Ground",
    lightName: "global_light",

    groundTexture: {
        file: "ground.jpg",
        uScale: 6.0,
        vScale: 6.0,
    },
    grassTexture: {
        file: "grass.jpg",
        uScale: 6.0,
        vScale: 6.0,
    },
    snowTexture: {
        file: "snow.jpg",
        uScale: 20.0,
        vScale: 20.0,
    },
    sandTexture: {
        file: "sand.jpg",
        uScale: 4.0,
        vScale: 4.0,
    },
    rockTexture: {
        file: "rock.jpg",
        uScale: 15.0,
        vScale: 15.0,
    },
    blendTexture: {
        file: "blend.png",
    },
    sandLimit: 1,
    rockLimit: 5,
    snowLimit: 8,
};

interface IGroundMaterialSettings {
    assetPath: string;
    lightName: string;

    groundTexture: IGroundMaterialTextureSettings;
    grassTexture: IGroundMaterialTextureSettings;
    snowTexture: IGroundMaterialTextureSettings;
    sandTexture: IGroundMaterialTextureSettings;
    rockTexture: IGroundMaterialTextureSettings;
    blendTexture: {
        file: string;
    };

    sandLimit: number;
    rockLimit: number;
    snowLimit: number;
}

interface IGroundMaterialTextureSettings {
    file: string;
    uScale: number;
    vScale: number;
}
