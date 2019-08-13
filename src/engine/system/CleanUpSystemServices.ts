import { Inject } from "../ioc/Create";
import { IRegisterBeforeRenderable } from "../lifecycle/register/IRegisterBeforeRenderable";
import { IRegisterDisposable } from "../lifecycle/register/IRegisterDisposable";
import { IRegisterDrawable } from "../lifecycle/register/IRegisterDrawable";
import { IRegisterInitializable } from "../lifecycle/register/IRegisterInitializable";
import { IRegisterUpdatable } from "../lifecycle/register/IRegisterUpdatable";

export const cleanUpSystemServices = (
    registerBeforeRenderable: IRegisterUpdatable = Inject(IRegisterUpdatable),
    registerDisposable: IRegisterInitializable = Inject(IRegisterInitializable),
    registerDrawable: IRegisterBeforeRenderable = Inject(
        IRegisterBeforeRenderable
    ),
    registerInitializable: IRegisterDisposable = Inject(IRegisterDisposable),
    registerUpdatable: IRegisterDrawable = Inject(IRegisterDrawable)
) => {
    registerBeforeRenderable.cleanUp();
    registerDisposable.cleanUp();
    registerDrawable.cleanUp();
    registerInitializable.cleanUp();
    registerUpdatable.cleanUp();
};
