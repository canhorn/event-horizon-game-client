import { StartCoreServerConnectionCommandLocallyHandler } from "./coreConnection/start/StartCoreServerConnectionCommandLocallyHandler";
import { StartZonePlayerConnectionCommandHandler } from "./zoneConnection/StartZonePlayerConnectionCommandHandler";
import { InvokeMethodOnLocalZoneConnectionCommandHandler } from "./zoneConnection/InvokeMethodOnLocalZoneConnectionCommandHandler";
import { LocalPlayerActionCommandHandler } from "./playerActions/LocalPlayerActionCommandHandler";
import { ICommandHandlerRegister } from "../core/command";
import { Inject } from "../core/ioc";

/**
 * This needs to be called after the Client Services setup, this will override the external connection with local ones.
 * This makes the game an offline capable.
 *
 * @param commandHandlerRegister (optional) Necessary for setup, can be overridden in testing.
 */
export const useLocalShimServices = (
    commandHandlerRegister: ICommandHandlerRegister = Inject(
        ICommandHandlerRegister
    )
) => {
    commandHandlerRegister.register(
        StartCoreServerConnectionCommandLocallyHandler
    );
    commandHandlerRegister.register(StartZonePlayerConnectionCommandHandler);
    commandHandlerRegister.register(
        InvokeMethodOnLocalZoneConnectionCommandHandler
    );
    commandHandlerRegister.register(LocalPlayerActionCommandHandler);
};
