import { Dictionary } from "../../../../../core/collection/Dictionary";
import { IDictionary } from "../../../../../core/collection/IDictionary";
import { IClientEntityInstance } from "../api/IClientEntityInstance";

const STORE: IDictionary<string, IClientEntityInstance> = new Dictionary<
    string,
    IClientEntityInstance
>();

export const allClientEntityInstances = () => STORE.values();

export const getClientEntityInstance = (
    id: string
): IClientEntityInstance | undefined => STORE.getValue(id);

export const containsClientEntityInstance = (id: string): boolean =>
    STORE.containsKey(id);

export const setClientEntityInstance = (
    entityInstance: IClientEntityInstance
): IClientEntityInstance => STORE.setValue(entityInstance.id, entityInstance);

export const removeClientEntityInstance = (
    id: string
): IClientEntityInstance | undefined => STORE.remove(id);
