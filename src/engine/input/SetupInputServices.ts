import { createSingletonService } from "../ioc/Create";
import {
    IInputPressedEventSender,
    IInputReleasedEventSender,
} from "./IInputEventSender";
import {
    InputPressedEventSender,
    InputReleasedEventSender,
} from "./impl/InputEventSender";
import { RegisterInput } from "./impl/RegisterInput";
import { UnregisterInput } from "./impl/UnregisterInput";
import { IRegisterInput } from "./IRegisterInput";
import { IUnregisterInput } from "./IUnregisterInput";

export const setupInputServices = () => {
    createSingletonService(IInputPressedEventSender, InputPressedEventSender);
    createSingletonService(IInputReleasedEventSender, InputReleasedEventSender);
    createSingletonService(IRegisterInput, RegisterInput);
    createSingletonService(IUnregisterInput, UnregisterInput);
};
