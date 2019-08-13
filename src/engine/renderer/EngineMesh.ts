import { AbstractMesh, Mesh } from "babylonjs";

export class EngineMesh extends Mesh {
    public ownerEntityId?: number;
}

/**
 * Will convert a BabylonJS Mesh to an EngineMesh.
 *
 * @param mesh The mesh that should be converted to an EngineMesh.
 */
export const convertToEngineMesh = (mesh: Mesh): EngineMesh => {
    const engineMesh = mesh as EngineMesh;
    engineMesh.ownerEntityId = -1;
    return engineMesh;
};

/**
 * Returns the BablyonJS AbstractMesh or Mesh an an EngineMesh.
 * Use to access the API of the EngineMesh.
 *
 * @param mesh Pass in BabylonJS AbstractMesh or Mesh.
 * @returns Just a shadowed EngineMesh, does not have anything added.
 */
export const shadowAsEngineMesh = (mesh: AbstractMesh | Mesh): EngineMesh =>
    mesh as EngineMesh;
