import { autobind } from "../../../core/autobind/autobind";
import { createLogger } from "../../logger/InjectLoggerDecorator";
import { ILogger } from "../../logger/LoggerFactory";
import { IEvent } from "../EventType";
import { getPublishedEventList } from "../publishedEvents/PublishedEvents";

export const checkForEventsPerSecond = () => {
    new EventPerSecondChecker();
};

class EventPerSecondChecker {
    private readonly _logger: ILogger;

    private lastCheckCount = getPublishedEventList().length;

    constructor() {
        this._logger = createLogger("EventPreSecondChecker");
        // setInterval(this.checkEventsPerSecond, 1000);
        // setInterval(this.analyzeEventsPerSecond, 5000);
    }

    @autobind
    public checkEventsPerSecond() {
        this._logger.debug(
            `Events per Second: ${getPublishedEventList().length -
                this.lastCheckCount}`
        );

        this.lastCheckCount = getPublishedEventList().length;
    }
    @autobind
    public analyzeEventsPerSecond() {
        this._logger.debug(
            "Events per Second Data",
            getPublishedEventList()
                .slice(
                    getPublishedEventList().length -
                        (getPublishedEventList().length - this.lastCheckCount)
                )
                .map(a => a.type.key)
        );
    }
}
