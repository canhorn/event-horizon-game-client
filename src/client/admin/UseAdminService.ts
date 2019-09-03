import { ICommandHandlerRegister } from "../../core/command";
import { IEventHandlerRegister } from "../../core/event";
import { Inject } from "../../core/ioc";
import { RunAdminActionOnServerCommandHandler } from "./action/RunAdminActionOnServerCommandHandler";
import { StartAdminCoreServerConnectionCommandHandler } from "./core/start/StartAdminCoreServerConnectionCommandHandler";
import { SendZoneAdminCommandToServerCommandHandler } from "./zone/command/SendZoneAdminCommandToServerCommandHandler";
import { FetchAdminZoneListEventHandler } from "./zone/fetch/FetchAdminZoneListEventHandler";
import { SetAdminZoneListCommandHandler } from "./zone/set/SetAdminZoneListCommandHandler";

export const useAdminService = (
    eventHandlerRegister: IEventHandlerRegister = Inject(IEventHandlerRegister),
    commandHandlerRegister: ICommandHandlerRegister = Inject(
        ICommandHandlerRegister
    )
) => {
    eventHandlerRegister.register(FetchAdminZoneListEventHandler);
    commandHandlerRegister.register(
        StartAdminCoreServerConnectionCommandHandler
    );
    commandHandlerRegister.register(SetAdminZoneListCommandHandler);
    commandHandlerRegister.register(RunAdminActionOnServerCommandHandler);
    commandHandlerRegister.register(SendZoneAdminCommandToServerCommandHandler);
};
