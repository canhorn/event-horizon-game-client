import { ICommandHandler } from "../../../../../core/command";
import { ICommandResult } from "../../../../../core/command";
import { ICommandType } from "../../../../../core/command";
import { IEventService } from "../../../../../core/event";
import { Inject } from "../../../../../core/ioc";
import { ClientAssetInstance } from "../model/ClientAssetInstance";
import { setClientAssetInstance } from "../store/ClientAssetStore";
import { createClientAssetInstanceRegisteredEvent } from "./ClientAssetInstanceRegisteredEvent";
import { RegisterClientAssetInstanceCommandResultType } from "./RegisterClientAssetInstanceCommand";
import {
    REGISTER_CLIENT_ASSET_INSTANCE_COMMAND,
    RegisterClientAssetInstanceCommandData,
} from "./RegisterClientAssetInstanceCommand";

/**
 * Name: RegisterClientAssetInstanceCommand
 * Type: Command
 */
export class RegisterClientAssetInstanceCommandHandler
    implements ICommandHandler {
    public type: ICommandType = REGISTER_CLIENT_ASSET_INSTANCE_COMMAND;
    constructor(
        private readonly _eventService: IEventService = Inject(IEventService)
    ) {}
    public handle({
        assetInstanceId,
        mesh,
        position,
    }: RegisterClientAssetInstanceCommandData): ICommandResult<
        RegisterClientAssetInstanceCommandResultType
    > {
        const clientAssetInstance = new ClientAssetInstance(
            assetInstanceId,
            mesh,
            position
        );
        setClientAssetInstance(clientAssetInstance);
        this._eventService.publish(
            createClientAssetInstanceRegisteredEvent({
                clientAssetInstance,
            })
        );
        return {
            success: true,
        };
    }
}
