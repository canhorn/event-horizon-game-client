import {
    ICommandHandler,
    ICommandResult,
    ICommandType,
} from "../../../../core/command";
import { Inject } from "../../../../core/ioc";
import { ISetHeightResolver } from "../api/IHeightResolver";
import {
    SET_HEIGHT_RESOLVER_COORDINATES_COMMAND,
    SetHeightResolverCoordinatesCommandData,
    SetHeightResolverCoordinatesCommandResultType,
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
    }: SetHeightResolverCoordinatesCommandData): ICommandResult<
        SetHeightResolverCoordinatesCommandResultType
    > {
        this._setHeightResolver.setCoordinates(heightCoordinates);
        return {
            success: true,
        };
    }
}
