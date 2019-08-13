import { IDisposable } from "../../../lifecycle/IDisposable";
import { IInitializable } from "../../../lifecycle/IInitializable";
import { IUpdatable } from "../../../lifecycle/IUpdatable";
import { IModule } from "../../../module/IModule";

export interface IServerModule
    extends IModule,
        IInitializable,
        IDisposable,
        IUpdatable {}
