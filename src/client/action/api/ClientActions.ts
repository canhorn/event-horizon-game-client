import { Vector3 } from "babylonjs";
import { EventType, IEventType } from "../../../core/event";
import { IObjectEntityDetails } from "../../entity/api/IObjectEntityDetails";

export const CLIENT_ACTION_ENTITY_CHANGED: string = "EntityClientChanged";
export const CLIENT_ACTION_ENTITY_CHANGED_EVENT: IEventType = new EventType(
    CLIENT_ACTION_ENTITY_CHANGED
);

export const CLIENT_ACTION_ENTITY_MOVE: string = "EntityClientMove";
export const CLIENT_ACTION_ENTITY_MOVE_EVENT: IEventType = new EventType(
    CLIENT_ACTION_ENTITY_MOVE
);
export interface ClientActionEntityMoveEventData {
    entityId: number;
    moveTo: Vector3;
}

export const CLIENT_ACTION_ENTITY_REGISTERED: string = "EntityRegistered";
export const CLIENT_ACTION_ENTITY_REGISTERED_EVENT: IEventType = new EventType(
    CLIENT_ACTION_ENTITY_REGISTERED
);
export interface ClientActionRegisterEntityData {
    entity: IObjectEntityDetails;
}

export const CLIENT_ACTION_ENTITY_UNREGISTERED: string = "EntityUnregistered";
export const CLIENT_ACTION_ENTITY_UNREGISTERED_EVENT: IEventType = new EventType(
    CLIENT_ACTION_ENTITY_UNREGISTERED
);
export interface ClientActionEntityUnregisterEventData {
    entityId: number;
}

export const CLIENT_RUN_SKILL_ACTION: string = "RunSkillAction";
export const CLIENT_RUN_SKILL_ACTION_EVENT: IEventType = new EventType(
    CLIENT_RUN_SKILL_ACTION
);
export interface ClientRunSkillActionEventData {
    action: string;
    data: any;
}
