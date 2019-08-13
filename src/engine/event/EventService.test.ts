import { Logger } from "../logger/LoggerFactory";
import { EventServiceImpl } from "./EventServiceImpl";
import { IEventService } from "./IEventService";

it("run stress test of empty EventServiceImpl", () => {
    const eventService = new EventServiceImpl(
        new Logger("event_server_testing")
    );

    return runPerformanceTest(() =>
        eventService.publish({
            type: { key: "event" },
            data: {},
        })
    ).then(
        (result: { startTime: number; endTime: number; loopCount: number }) => {
            const timeTook = result.endTime - result.startTime;
            const perMillisecond = result.loopCount / timeTook;
            console.log(
                "run stress test of empty EventServiceImpl",
                JSON.stringify(
                    {
                        timeTook,
                        perMillisecond,
                    },
                    null,
                    4
                )
            );
        }
    );
});

it("run stress test of 1 Listeners EventServiceImpl", () => {
    const eventService = new EventServiceImpl(
        new Logger("event_server_testing")
    );
    fillEventServiceWithRandomListeners(1, eventService);

    return runPerformanceTest(() =>
        eventService.publish({
            type: { key: "event" },
            data: {},
        })
    ).then(
        (result: { startTime: number; endTime: number; loopCount: number }) => {
            const timeTook = result.endTime - result.startTime;
            const perMillisecond = result.loopCount / timeTook;
            console.log(
                "run stress test of 1 Listeners EventServiceImpl",
                JSON.stringify({ timeTook, perMillisecond }, null, 4)
            );
        }
    );
});

it("run stress test of 10 Listeners EventServiceImpl", () => {
    const eventService = new EventServiceImpl(
        new Logger("event_server_testing")
    );
    fillEventServiceWithRandomListeners(10, eventService);

    return runPerformanceTest(() =>
        eventService.publish({
            type: { key: "event" },
            data: {},
        })
    ).then(
        (result: { startTime: number; endTime: number; loopCount: number }) => {
            const timeTook = result.endTime - result.startTime;
            const perMillisecond = result.loopCount / timeTook;
            console.log(
                "run stress test of 10 Listeners EventServiceImpl",
                JSON.stringify({ timeTook, perMillisecond }, null, 4)
            );
        }
    );
});

it("run stress test of 100 Listeners EventServiceImpl", () => {
    const eventService = new EventServiceImpl(
        new Logger("event_server_testing")
    );
    fillEventServiceWithRandomListeners(100, eventService);

    return runPerformanceTest(() =>
        eventService.publish({
            type: { key: "listener_event_9" },
            data: {},
        })
    ).then(
        (result: { startTime: number; endTime: number; loopCount: number }) => {
            const timeTook = result.endTime - result.startTime;
            const perMillisecond = result.loopCount / timeTook;
            console.log(
                "run stress test of 100 Listeners EventServiceImpl",
                JSON.stringify({ timeTook, perMillisecond }, null, 4)
            );
        }
    );
});

function fillEventServiceWithRandomListeners(
    createCount: number,
    eventService: IEventService
) {
    for (let index = 0; index < createCount; index++) {
        eventService.addEventListener(
            { key: "listener_event_" + index },
            () => {},
            eventService
        );
    }
}

function runPerformanceTest(runFunction: () => void): Promise<any> {
    return new Promise((resolve, reject) => {
        let loopCount = 0;
        const startTime = performance.now();
        for (let index = 0; index < 10000000; index++) {
            runFunction();
            loopCount++;
        }
        const endTime = performance.now();
        resolve({
            startTime,
            endTime,
            loopCount,
        });
    });
}
