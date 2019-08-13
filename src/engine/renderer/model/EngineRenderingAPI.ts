import {
    Color3,
    Mesh,
    StandardMaterial,
    Vector3,
    VertexBuffer,
    VertexData,
} from "babylonjs";
import { IEngineRenderingAPI } from "../api/IEngineRenderingAPI";

export class EngineRenderingAPI implements IEngineRenderingAPI {
    public StandardMaterial: typeof StandardMaterial = StandardMaterial;
    public Mesh: typeof Mesh = Mesh;
    public VertexBuffer: typeof VertexBuffer = VertexBuffer;
    public Vector3: typeof Vector3 = Vector3;
    public Color3: typeof Color3 = Color3;
    public VertexData: typeof VertexData = VertexData;
}
