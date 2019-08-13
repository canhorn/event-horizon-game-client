import { Container } from "../ioc/typescript-ioc";
import { ILoggerFactory } from "./LoggerFactory";

// export function InjectLogger(loggerName: string): any {
//     return function InjectPropertyDecorator(
//         target: object,
//         propertyKey: string
//     ) {
//         const key = propertyKey;
//         const propKey = `__${key}`;
//         Object.assign(target, {
//             get [key](): any {
//                 return this[propKey]
//                     ? this[propKey]
//                     : (this[propKey] = getLogger(loggerName));
//             },
//             set [key](newValue: any) {
//                 this[propKey] = newValue;
//             }
//         });
//     };

//     function getLogger(loggerName: string) {
//         debugger;
//         const loggerFactory: ILoggerFactory = Container.get(ILoggerFactory);
//         return loggerFactory.create(loggerName);
//     }
// }

export const createLogger = (loggerName: string) =>
    Container.get(ILoggerFactory).create(loggerName);
