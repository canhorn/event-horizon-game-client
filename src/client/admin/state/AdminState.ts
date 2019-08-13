import { IZoneDetails } from "../../zone/api/IZoneDetails";
import { IAdminState } from "../api/IAdminState";

const STATE: IAdminState = {
    zoneServerList: [],
};

export const setZoneServerList = (zoneServerList: IZoneDetails[]): void => {
    Object.assign(STATE, {
        zoneServerList,
    });
};
export const getZoneServerList = (): IZoneDetails[] => {
    return STATE.zoneServerList;
};
export const getState = (): IAdminState => STATE;
export const getZoneDetails = (zoneId: string): IZoneDetails | undefined => {
    return STATE.zoneServerList.filter(zone => zone.id === zoneId)[0];
};
