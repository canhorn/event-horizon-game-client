import objectMerge from "../../../core/object/ObjectMerge";
import { IZoneDetails } from "../api/IZoneDetails";

const STATE: {
    zone: IZoneDetails | undefined;
} = {
    zone: undefined,
};

export const setZoneDetails = (zone: IZoneDetails) => {
    Object.assign(STATE, {
        zone: { ...zone },
    });
};

export const getZoneDetails = (): IZoneDetails | undefined => {
    return STATE.zone;
};
