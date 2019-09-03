import { Inject } from "../../../core/ioc";
import { Entity } from "../../entity/model/Entity";
import { IDisposable } from "../IDisposable";
import { IDrawable } from "../IDrawable";
import { IInitializable } from "../IInitializable";
import { IUpdatable } from "../IUpdatable";
import { IRegisterDisposable } from "../register/IRegisterDisposable";
import { IRegisterInitializable } from "../register/IRegisterInitializable";
import { IRegisterUpdatable } from "../register/IRegisterUpdatable";

export abstract class LifeCycleEntity extends Entity
    implements IInitializable, IDisposable, IDrawable, IUpdatable {
    constructor(
        private readonly _registerInitializable: IRegisterInitializable = Inject(
            IRegisterInitializable
        ),
        private readonly _registerDisposable: IRegisterDisposable = Inject(
            IRegisterDisposable
        ),
        private readonly _registerUpdatable: IRegisterUpdatable = Inject(
            IRegisterUpdatable
        ),
        private readonly _registerDraw: IRegisterUpdatable = Inject(
            IRegisterUpdatable
        )
    ) {
        super();
        this._registerInitializable.register(this);
        this._registerDisposable.register(this);
    }
    public postInitialize(): void {
        this._registerUpdatable.register(this);
        this._registerDraw.register(this);
    }
    public dispose(): void {
        this.onDispose();
        this._registerDraw.unregister(this);
        this._registerUpdatable.unregister(this);
        this._registerDisposable.unregister(this);
        this._registerInitializable.unregister(this);
    }
    public abstract initialize(): void;
    public abstract onDispose(): void;
    public abstract update(): void;
    public abstract draw(): void;
}
