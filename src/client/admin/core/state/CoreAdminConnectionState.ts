import { ErrorCode } from "../../../../engine/assert/Assert";
import { IZoneDetails } from "../../../zone/api/IZoneDetails";
import { CoreAdminConnection } from "../connection/CoreAdminConnection";

const STATE: {
    connection: CoreAdminConnection | null;
} = {
    connection: null,
};

export const startCoreAdminConnection = (
    serverUrl: string,
    accessToken: string
) => {
    if (STATE.connection) {
        STATE.connection.stopConnection("new_connection_starting");
    }
    Object.assign(STATE, {
        connection: new CoreAdminConnection(),
    });
    if (STATE.connection) {
        STATE.connection.startConnection(serverUrl, accessToken);
    }
};

export const stopCoreAdminConnection = () => {
    if (STATE.connection) {
        STATE.connection.stopConnection("stop_connection_requested");
    }
    Object.assign(STATE, {
        connection: null,
    });
};

export const getCoreAdminConnectionGetAllZones = (): Promise<
    IZoneDetails[]
> => {
    if (STATE.connection) {
        return STATE.connection.getAllZones();
    }
    return new Promise((_, reject) =>
        reject(
            new ErrorCode("Connection not started.", "connection_not_started")
        )
    );
};

export const sendCoreAdminAction = (action: string, data: any) => {
    if (STATE.connection) {
        return STATE.connection.adminAction(action, data);
    }
    return new Promise((_, reject) =>
        reject(
            new ErrorCode("Connection not started.", "connection_not_started")
        )
    );
};
