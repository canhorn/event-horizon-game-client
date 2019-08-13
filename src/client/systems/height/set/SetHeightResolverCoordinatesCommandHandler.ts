import { ICommandHandler } from "../../../../engine/command/api/ICommandHandler";
import { ICommandResult } from "../../../../engine/command/api/ICommandResult";
import { ICommandType } from "../../../../engine/command/api/ICommandType";
import { Inject } from "../../../../engine/ioc/Create";
import { ISetHeightResolver } from "../api/IHeightResolver";
import {
    SET_HEIGHT_RESOLVER_COORDINATES_COMMAND,
    SetHeightResolverCoordinatesCommandData,
} from "./SetHeightResolverCoordinatesCommand";

/**
 * Name: SetHeightResolverCoordinatesCommand
 * Type: Command
 */
export class SetHeightResolverCoordinatesCommandHandler
    implements ICommandHandler {
    public type: ICommandType = SET_HEIGHT_RESOLVER_COORDINATES_COMMAND;
    constructor(
        private readonly _setHeightResolver: ISetHeightResolver = Inject(
            ISetHeightResolver
        )
    ) {}
    public handle({
        heightCoordinates,
    }: SetHeightResolverCoordinatesCommandData): ICommandResult {
        this._setHeightResolver.setCoordinates(heightCoordinates);
        return {
            success: true,
        };
    }
}
