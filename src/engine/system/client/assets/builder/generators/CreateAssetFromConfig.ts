import { Mesh, MeshBuilder } from "babylonjs";
import "babylonjs-loaders";
import { ErrorCode } from "../../../../../../core/assert/Assert";
import { IGuid } from "../../../../../../core/guid/IGuid";
import { Inject } from "../../../../../../core/ioc";
import { IRenderingScene } from "../../../../../renderer/api/IRenderingScene";
import { IBoxMeshConfig } from "../../api/configs/IBoxMeshConfig";
import { IGLTFMeshConfig } from "../../api/configs/IGLTFMeshConfig";
import { ISphereMeshConfig } from "../../api/configs/ISphereMeshConfig";
import { IClientAsset } from "../../api/IClientAsset";
import { GLTFMeshBuilderLoader } from "./gltf/GLTFMeshBuilder";

export const createMeshFromConfig = (
    clientAsset: IClientAsset<
        ISphereMeshConfig | IBoxMeshConfig | IGLTFMeshConfig
    >,
    renderingScene: IRenderingScene = Inject(IRenderingScene),
    guid: IGuid = Inject(IGuid)
): Promise<Mesh> => {
    const mesh: ISphereMeshConfig | IBoxMeshConfig | IGLTFMeshConfig =
        clientAsset.data;
    return new Promise((resolve, reject) => {
        if (mesh.type === "SPHERE") {
            resolve(
                MeshBuilder.CreateSphere(
                    `loaded_model_mesh_${guid.guid()}`,
                    mesh,
                    renderingScene.scene
                )
            );
        } else if (mesh.type === "BOX") {
            resolve(
                MeshBuilder.CreateBox(
                    `loaded_model_mesh_${guid.guid()}`,
                    mesh,
                    renderingScene.scene
                )
            );
        } else if (mesh.type === "GLTF") {
            resolve(
                GLTFMeshBuilderLoader(
                    mesh.path,
                    mesh.file,
                    mesh.heightOffset,
                    renderingScene.scene
                )
            );
        } else {
            reject(new ErrorCode(`No supported type.`, "not_supported_type"));
        }
    });
};
