import * as KeyboardJS from "keyboardjs";
import { Inject } from "../../ioc/Create";
import {
    IInputPressedEventSender,
    IInputReleasedEventSender,
} from "../IInputEventSender";
import { InputOptions } from "../InputModel";
import { IUnregisterInput } from "../IUnregisterInput";

export class UnregisterInput implements IUnregisterInput {
    constructor(
        private readonly _inputPressedSender: IInputPressedEventSender = Inject(
            IInputPressedEventSender
        ),
        private readonly _inputReleasedSender: IInputReleasedEventSender = Inject(
            IInputReleasedEventSender
        )
    ) {}

    public unregister(options: InputOptions) {
        KeyboardJS.unbind(options.key, options.pressed, options.released);
        KeyboardJS.unbind(
            options.key,
            this._inputPressedSender.sendEvent,
            this._inputReleasedSender.sendEvent
        );
    }
}
