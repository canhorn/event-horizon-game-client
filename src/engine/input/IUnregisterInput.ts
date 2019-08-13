import { InputOptions } from "./InputModel";

export abstract class IUnregisterInput {
    public abstract unregister(options: InputOptions): void;
}
