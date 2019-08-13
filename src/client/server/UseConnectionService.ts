import { ICommandHandlerRegister } from "../../engine/command/api/ICommandHandlerRegister";
import { Inject } from "../../engine/ioc/Create";
import { StartCoreServerConnectionCommandHandler } from "./core/start/StartCoreServerConnectionCommandHandler";
import { InvokeMethodOnZoneConnectionCommandHandler } from "./zone/invoke/InvokeMethodOnZoneConnectionCommandHandler";
import { StartZonePlayerConnectionCommandHandler } from "./zone/start/StartZonePlayerConnectionCommandHandler";
import { StopZonePlayerConnectionCommandHandler } from "./zone/stop/StopZonePlayerConnectionCommandHandler";

export const useConnectionService = (
    commandHandlerRegister: ICommandHandlerRegister = Inject(
        ICommandHandlerRegister
    )
) => {
    commandHandlerRegister.register(StartCoreServerConnectionCommandHandler);
    commandHandlerRegister.register(StartZonePlayerConnectionCommandHandler);
    commandHandlerRegister.register(StopZonePlayerConnectionCommandHandler);
    commandHandlerRegister.register(InvokeMethodOnZoneConnectionCommandHandler);
};
