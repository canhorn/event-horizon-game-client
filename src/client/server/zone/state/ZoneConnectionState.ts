import { ZonePlayerConnection } from "../connection/ZonePlayerConnection";

const STATE: {
    connection: ZonePlayerConnection | undefined;
} = {
    connection: undefined,
};

export const startZonePlayerConnection = (
    serverUrl: string,
    accessToken: string
) => {
    if (STATE.connection) {
        STATE.connection.stopConnection("new_connection_starting");
    }
    Object.assign(STATE, {
        connection: new ZonePlayerConnection(),
    });
    if (STATE.connection) {
        STATE.connection.startConnection(serverUrl, accessToken);
    }
};

export const stopZonePlayerConnection = () => {
    if (STATE.connection) {
        STATE.connection.stopConnection("stop_connection_requested");
    }
    Object.assign(STATE, {
        connection: undefined,
    });
};

export const invokeMethodOnZonePlayerConnection = (
    method: string,
    args: any[]
) => {
    if (STATE.connection) {
        STATE.connection.invoke(method, ...args);
    }
};
