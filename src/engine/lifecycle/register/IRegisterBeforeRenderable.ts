import { IBeforeRenderable } from "../IBeforeRenderable";
import { IRegisterService } from "./IRegisterService";

export abstract class IRegisterBeforeRenderable extends IRegisterService<
    IBeforeRenderable
> {}
