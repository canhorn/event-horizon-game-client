import { ICommandHandler } from "../../../../command/api/ICommandHandler";
import { ICommandResult } from "../../../../command/api/ICommandResult";
import { ICommandType } from "../../../../command/api/ICommandType";
import { IEventService } from "../../../../event/IEventService";
import { Inject } from "../../../../ioc/Create";
import { ClientAssetInstance } from "../model/ClientAssetInstance";
import { setClientAssetInstance } from "../store/ClientAssetStore";
import { createClientAssetInstanceRegisteredEvent } from "./ClientAssetInstanceRegisteredEvent";
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
    }: RegisterClientAssetInstanceCommandData): ICommandResult {
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
