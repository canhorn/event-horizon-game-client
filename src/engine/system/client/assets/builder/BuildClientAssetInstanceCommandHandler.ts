import { ICommandHandler } from "../../../../command/api/ICommandHandler";
import { ICommandResult } from "../../../../command/api/ICommandResult";
import { ICommandService } from "../../../../command/api/ICommandService";
import { ICommandType } from "../../../../command/api/ICommandType";
import { Inject } from "../../../../ioc/Create";
import { IAssetScriptConfig } from "../api/configs/IAssetScriptConfig";
import { IBoxMeshConfig } from "../api/configs/IBoxMeshConfig";
import { IGLTFMeshConfig } from "../api/configs/IGLTFMeshConfig";
import { ISphereMeshConfig } from "../api/configs/ISphereMeshConfig";
import { IClientAsset } from "../api/IClientAsset";
import { createRegisterClientAssetInstanceCommand } from "../register/RegisterClientAssetInstanceCommand";
import {
    BUILD_CLIENT_ASSET_INSTANCE_COMMAND,
    BuildClientAssetInstanceCommandData,
} from "./BuildClientAssetInstanceCommand";
import {
    getClientAssetMeshFromCache,
    setClientAssetMeshInCache,
} from "./cache/ClientAssetMeshCache";
import { createMeshFromConfig } from "./generators/CreateAssetFromConfig";
import { createMeshFromScript } from "./generators/CreateMeshFromScript";

/**
 * Name: BuildClientAssetInstanceCommand
 * Type: Command
 */
export class BuildClientAssetInstanceCommandHandler implements ICommandHandler {
    public type: ICommandType = BUILD_CLIENT_ASSET_INSTANCE_COMMAND;
    constructor(
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        )
    ) {}
    public handle({
        assetInstanceId,
        clientAsset,
        position,
    }: BuildClientAssetInstanceCommandData): ICommandResult {
        // Create the ClientAsset Instance
        if (clientAsset.type === "MESH") {
            const cacheMesh = getClientAssetMeshFromCache(clientAsset.id);
            if (cacheMesh) {
                new Promise(resolve => resolve()).then(_ =>
                    this._commandService.send(
                        createRegisterClientAssetInstanceCommand({
                            assetInstanceId,
                            mesh: cacheMesh,
                            position,
                        })
                    )
                );
            } else {
                createMeshFromConfig(clientAsset as IClientAsset<
                    ISphereMeshConfig | IBoxMeshConfig | IGLTFMeshConfig
                >).then(mesh =>
                    this._commandService.send(
                        createRegisterClientAssetInstanceCommand({
                            assetInstanceId,
                            mesh: setClientAssetMeshInCache(
                                clientAsset.id,
                                mesh
                            ),
                            position,
                        })
                    )
                );
            }
        } else if (clientAsset.type === "SCRIPT") {
            const cacheMesh = getClientAssetMeshFromCache(clientAsset.id);
            if (cacheMesh) {
                new Promise(resolve => resolve()).then(_ =>
                    this._commandService.send(
                        createRegisterClientAssetInstanceCommand({
                            assetInstanceId,
                            mesh: cacheMesh,
                            position,
                        })
                    )
                );
            } else {
                createMeshFromScript(clientAsset as IClientAsset<
                    IAssetScriptConfig
                >).then(mesh =>
                    this._commandService.send(
                        createRegisterClientAssetInstanceCommand({
                            assetInstanceId,
                            mesh: setClientAssetMeshInCache(
                                clientAsset.id,
                                mesh
                            ),
                            position,
                        })
                    )
                );
            }
        } else {
            return {
                success: false,
                result: "invalid_type",
            };
        }
        return {
            success: true,
        };
    }
}
