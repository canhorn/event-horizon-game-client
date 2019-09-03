import { EventType, IEvent } from "../../../../core/event";
import { IServerModuleScripts } from "../api/IServerModuleScripts";

export const ADD_SERVER_MODULE_SCRIPT_EVENT = new EventType(
    "ENGINE.ADD_SERVER_MODULE_SCRIPT_EVENT"
);

const addServerModuleScriptEvent: IEvent = {
    type: ADD_SERVER_MODULE_SCRIPT_EVENT,
};

export const createAddServerModuleScriptEvent = (
    data: IServerModuleScripts
): IEvent => {
    addServerModuleScriptEvent.data = data;
    return addServerModuleScriptEvent;
};
