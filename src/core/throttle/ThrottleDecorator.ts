import { throttle } from "./Throttle";

export function throttleMethod(threshold: number) {
    return function(
        this: any,
        target: any,
        propertyKey: string,
        descriptor: PropertyDescriptor
    ) {
        let method = descriptor.value;
        descriptor.value = throttle(function(this: any) {
            return method.apply(this, arguments);
        }, threshold);
    };
}
