import * as KeyboardJS from "keyboardjs";
import { Inject } from "../../ioc/Create";
import {
    IInputPressedEventSender,
    IInputReleasedEventSender,
} from "../IInputEventSender";
import { InputOptions } from "../InputModel";
import { IRegisterInput } from "../IRegisterInput";

export const EMPTY_PRESSED = () => {};

export class RegisterInput implements IRegisterInput {
    constructor(
        private readonly _inputPressedSender: IInputPressedEventSender = Inject(
            IInputPressedEventSender
        ),
        private readonly _inputReleasedSender: IInputReleasedEventSender = Inject(
            IInputReleasedEventSender
        )
    ) {}

    public register(options: InputOptions) {
        KeyboardJS.bind(
            options.key,
            options.pressed || EMPTY_PRESSED,
            options.released
        );
        KeyboardJS.unbind(
            options.key,
            this._inputPressedSender.sendEvent,
            this._inputReleasedSender.sendEvent
        );
        KeyboardJS.bind(
            options.key,
            this._inputPressedSender.sendEvent,
            this._inputReleasedSender.sendEvent
        );
    }
}
