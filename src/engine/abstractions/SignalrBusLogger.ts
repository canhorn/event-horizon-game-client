import { LogLevel } from "@aspnet/signalr";
import { ILogger } from "../../core/logger";

export class SignalrBusLogger {
    constructor(private _logger: ILogger) {}
    public log(logLevel: LogLevel, message: string) {
        if (logLevel == LogLevel.Trace) {
            this._logger.trace(message);
        } else if (logLevel == LogLevel.Error) {
            this._logger.error(message);
        } else {
            this._logger.log(message);
        }
    }
}
