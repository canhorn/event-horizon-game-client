import objectMerge from "../../../../../core/object/ObjectMerge";

const STATE: {
    clientActionsPerSecond: number;
    totalClientActions: number;
} = {
    clientActionsPerSecond: 0,
    totalClientActions: 0,
};

let lastUpdate = Date.now();

export const incrementClientAction = () => {
    objectMerge(STATE, {
        totalClientActions: STATE.totalClientActions + 1,
    });
};
export const clientActionsPerSecond = (): number =>
    STATE.clientActionsPerSecond;

export const captureActionsPerSecond = (): void => {
    const thisUpdate = Date.now();
    const actionPerSecondUpdate = thisUpdate - lastUpdate;
    if (actionPerSecondUpdate >= 1000) {
        const { totalClientActions } = STATE;
        objectMerge(STATE, {
            clientActionsPerSecond:
                totalClientActions / (actionPerSecondUpdate / 1000),
            totalClientActions: 0,
        });
        lastUpdate = thisUpdate;
    }
};
