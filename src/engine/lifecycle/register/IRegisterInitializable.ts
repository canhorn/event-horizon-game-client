import { IInitializable } from "../IInitializable";
import { IRegisterService } from "./IRegisterService";

export abstract class IRegisterInitializable extends IRegisterService<
    IInitializable
> {}
