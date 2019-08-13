import { Mesh } from "babylonjs";
import { IModule } from "../../../../engine/module/IModule";

/**
 * Name: Mesh
 * For: Entity
 */
export const MESH_MODULE_NAME = "MESH_MODULE_NAME";
export interface IMeshModule extends IModule {
    mesh: Mesh;
}
