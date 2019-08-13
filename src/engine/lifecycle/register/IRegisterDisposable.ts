import { IDisposable } from "../IDisposable";
import { IRegisterService } from "./IRegisterService";

export abstract class IRegisterDisposable extends IRegisterService<
    IDisposable
> {}
