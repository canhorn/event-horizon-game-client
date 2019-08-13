import dateFormat from "dateformat";
import { throttleMethod } from "../../core/throttle/ThrottleDecorator";
import { debugEnabled, traceEnabled } from "../debugging/DebuggingActions";

export abstract class ILogger {
    public abstract log(message: string, data?: any): void;
    public abstract debug(message: string, data?: any): void;
    public abstract error(message: string, data?: any): void;
    public abstract trace(message: string, data?: any): void;
}

export interface ILogMessage {
    level: string;
    message: string;
    data: any;
}

export const LOGGED_MESSAGE_LIST: ILogMessage[] = [];
(window as any).LOGGED_MESSAGES = LOGGED_MESSAGE_LIST;

export class Logger implements ILogger {
    private _name: string;
    private _isDebug: boolean;
    private _isTrace: boolean;

    constructor(name: string) {
        this._name = name;
        this._isDebug = debugEnabled();
        this._isTrace = traceEnabled();
    }

    public log(message: string, data: any = "") {
        const messageToLog = `[${this.formattedNowDate()}] [INFO]: [${
            this._name
        }] \r\n\t${message}`;
        this.throttledLog(messageToLog, data);
        LOGGED_MESSAGE_LIST.push({
            level: "INFO",
            message: messageToLog,
            data,
        });
    }
    public debug(message: string, data: any = "") {
        this.formattedNowDate();
        if (!this._isDebug) {
            return;
        }
        const messageToLog = `[${this.formattedNowDate()}] [DEBUG]: [${
            this._name
        }] \r\n\t${message}`;
        console.info(messageToLog, data);
        LOGGED_MESSAGE_LIST.push({
            level: "DEBUG",
            message: messageToLog,
            data,
        });
    }
    public error(message: string, data: any = "") {
        const messageToLog = `[${this.formattedNowDate()}] [ERROR]: [${
            this._name
        }] \r\n\t${message}`;
        console.error(messageToLog, data);
        LOGGED_MESSAGE_LIST.push({
            level: "ERROR",
            message: messageToLog,
            data,
        });
    }
    public trace(message: string, data: any = "") {
        if (this._isTrace) {
            const messageToLog = `[${this.formattedNowDate()}] [TRACE]: [${
                this._name
            }] \r\n\t${message}`;
            this.throttledTrace(messageToLog, data);
            LOGGED_MESSAGE_LIST.push({
                level: "TRACE",
                message: messageToLog,
                data,
            });
        }
    }
    @throttleMethod(10000)
    private throttledLog(messageToLog: string, data: any = "") {
        console.log(messageToLog, data);
    }
    // @throttleMethod(10000)
    private throttledTrace(messageToLog: string, data: any = "") {
        console.log(messageToLog, data);
        console.trace();
    }

    /**
     * 01-14-2019 21:22:45.0123456-06:00
     */
    private formattedNowDate() {
        const now = new Date();
        const formattedOffset = dateFormat(now, "o");
        return (
            dateFormat(now, "mm-dd-yyyy HH:MM:ss.l") +
            formattedOffset.slice(0, 3) +
            ":" +
            formattedOffset.slice(3)
        );
    }
}

export abstract class ILoggerFactory {
    public abstract create(loggerName: string): ILogger;
}

export class LoggerFactory implements ILoggerFactory {
    public create(loggerName: string): ILogger {
        return new Logger(loggerName);
    }
}
