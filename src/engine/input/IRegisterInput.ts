import { InputOptions } from "./InputModel";

export abstract class IRegisterInput {
    public abstract register(options: InputOptions): void;
}
