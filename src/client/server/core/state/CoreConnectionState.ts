import { CoreConnection } from "../connection/CoreConnection";

const STATE: {
    connection: CoreConnection | null;
} = {
    connection: null,
};

export const startCoreConnection = (serverUrl: string, accessToken: string) => {
    if (STATE.connection) {
        STATE.connection.stopConnection("new_connection_starting");
    }
    Object.assign(STATE, {
        connection: new CoreConnection(),
    });
    if (STATE.connection) {
        STATE.connection.startConnection(serverUrl, accessToken);
    }
};

export const stopCoreConnection = () => {
    if (STATE.connection) {
        STATE.connection.stopConnection("stop_connection_requested");
    }
    Object.assign(STATE, {
        connection: null,
    });
};
