import { IDisposable } from "../lifecycle/IDisposable";
import { IUpdatable } from "../lifecycle/IUpdatable";

export interface IModule extends IDisposable, IUpdatable {}
