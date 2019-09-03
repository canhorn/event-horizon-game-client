import {
    ICommandHandler,
    ICommandResult,
    ICommandType,
} from "../../../../../core/command";
import { isObjectDefined } from "../../../../../core/object/ObjectCheck";
import {
    getClientAssetInstance,
    removeClientAssetInstance,
} from "../store/ClientAssetStore";
import {
    DISPOSE_OF_CLIENT_ASSET_INSTANCE_COMMAND,
    DisposeOfClientAssetInstanceCommandData,
    DisposeOfClientAssetInstanceCommandResultType,
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
    }: DisposeOfClientAssetInstanceCommandData): ICommandResult<
        DisposeOfClientAssetInstanceCommandResultType
    > {
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
