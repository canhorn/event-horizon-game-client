import {
    Color3,
    Mesh,
    StandardMaterial,
    Vector3,
    VertexBuffer,
    VertexData,
} from "babylonjs";

/**
 * This is an API to the Engine Used Rending API.
 */
export abstract class IEngineRenderingAPI {
    public abstract StandardMaterial: typeof StandardMaterial;
    public abstract Mesh: typeof Mesh;
    public abstract VertexBuffer: typeof VertexBuffer;
    public abstract Vector3: typeof Vector3;
    public abstract Color3: typeof Color3;
    public abstract VertexData: typeof VertexData;
}
