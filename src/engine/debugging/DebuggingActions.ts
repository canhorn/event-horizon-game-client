import { Configuration } from "../../core/configuration/Configuration";

export const debugEnabled = () =>
    Configuration.getConfig<boolean>("DEBUG") || false;
export const traceEnabled = () =>
    Configuration.getConfig<boolean>("TRACE") || false;
