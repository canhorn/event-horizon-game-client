import { ErrorCode } from "../../../../core/assert/Assert";
import { Dictionary } from "../../../../core/collection/Dictionary";
import { IDictionary } from "../../../../core/collection/IDictionary";
import { isObjectDefined } from "../../../../core/object/ObjectCheck";
import { IZoneInfo } from "../../../server/zone/api/IZoneInfo";
import { IZoneAdminCommand } from "../api/IZoneAdminCommand";
import { ZoneAdminConnection } from "../connection/ZoneAdminConnection";

const STATE: {
    connectionMap: IDictionary<string, ZoneAdminConnection>;
} = {
    connectionMap: new Dictionary(),
};

export const startZoneAdminConnection = (
    zoneId: string,
    serverUrl: string,
    accessToken: string
) => {
    const zoneConnection = STATE.connectionMap.getValue(zoneId);
    if (isObjectDefined(zoneConnection)) {
        zoneConnection.stopConnection("new_connection_starting");
    }
    const newZoneConnection = new ZoneAdminConnection();
    newZoneConnection.startConnection(serverUrl, accessToken);
    STATE.connectionMap.setValue(zoneId, newZoneConnection);
    return newZoneConnection;
};

export const stopCoreAdminConnection = (zoneId: string) => {
    const zoneConnection = STATE.connectionMap.getValue(zoneId);
    if (isObjectDefined(zoneConnection)) {
        zoneConnection.stopConnection("stop_connection_requested");
    }
    STATE.connectionMap.remove(zoneId);
};

export const sendCoreAdminAction = (
    zoneId: string,
    command: IZoneAdminCommand
): Promise<void> => {
    const zoneConnection = STATE.connectionMap.getValue(zoneId);
    if (isObjectDefined(zoneConnection)) {
        return zoneConnection.adminAction(command);
    }
    return new Promise((_, reject) =>
        reject(
            new ErrorCode("Connection not started.", "connection_not_started")
        )
    );
};

export const getAdminZoneInfo = (zoneId: string): Promise<IZoneInfo> => {
    const zoneConnection = STATE.connectionMap.getValue(zoneId);
    if (isObjectDefined(zoneConnection)) {
        return zoneConnection.zoneInfo();
    }
    return new Promise((_, reject) =>
        reject(
            new ErrorCode("Connection not started.", "connection_not_started")
        )
    );
};
