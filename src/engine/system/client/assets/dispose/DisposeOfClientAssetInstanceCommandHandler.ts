import { isObjectDefined } from "../../../../../core/object/ObjectCheck";
import { ICommandHandler } from "../../../../command/api/ICommandHandler";
import { ICommandResult } from "../../../../command/api/ICommandResult";
import { ICommandType } from "../../../../command/api/ICommandType";
import {
    getClientAssetInstance,
    removeClientAssetInstance,
} from "../store/ClientAssetStore";
import {
    DISPOSE_OF_CLIENT_ASSET_INSTANCE_COMMAND,
    DisposeOfClientAssetInstanceCommandData,
} from "./DisposeOfClientAssetInstanceCommand";

/**
 * Name: DisposeOfClientAssetInstanceCommand
 * Type: Command
 */
export class DisposeOfClientAssetInstanceCommandHandler
    implements ICommandHandler {
    public type: ICommandType = DISPOSE_OF_CLIENT_ASSET_INSTANCE_COMMAND;
    constructor() {}
    public handle({
        assetInstanceId,
    }: DisposeOfClientAssetInstanceCommandData): ICommandResult {
        const asset = getClientAssetInstance(assetInstanceId);
        if (isObjectDefined(asset)) {
            asset.dispose();
            removeClientAssetInstance(assetInstanceId);
        }
        return {
            success: true,
        };
    }
}
