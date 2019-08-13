import {
    BoundingBoxGizmo,
    Mesh,
    Scene,
    SceneLoader,
    Space,
    Vector3,
} from "babylonjs";
import { Inject } from "../../../../../../ioc/Create";
import { IGuid } from "../../../../../../math/guid/IGuid";
import { convertToEngineMesh } from "../../../../../../renderer/EngineMesh";

export const GLTFMeshBuilderLoader = (
    filePath: string,
    fileName: string,
    heightOffset: number,
    scene: Scene,
    guid: IGuid = Inject(IGuid)
): Promise<Mesh> =>
    new Promise(resolve => {
        // The first parameter can be set to null to load all meshes and skeletons
        SceneLoader.ImportMesh(
            undefined,
            filePath,
            fileName,
            scene,
            (meshes, _, __, ___) => {
                const name = `loaded_model_mesh_${guid.guid()}`;
                const mesh = new Mesh(name);
                mesh.addChild(meshes[0]);
                meshes.forEach(childMesh => {
                    childMesh.parent = mesh;
                    childMesh.isPickable = false;
                });
                const boundingMesh = convertToEngineMesh(
                    BoundingBoxGizmo.MakeNotPickableAndWrapInBoundingBox(mesh)
                );
                boundingMesh.name = name;
                boundingMesh.setEnabled(false);
                boundingMesh.setPivotPoint(
                    new Vector3(0, heightOffset, 0),
                    Space.LOCAL
                );
                resolve(mesh);
            }
        );
    });
