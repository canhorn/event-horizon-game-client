import { KeyEvent } from "keyboardjs";

export abstract class IInputPressedEventSender {
    public abstract sendEvent(e?: KeyEvent): void;
}

export abstract class IInputReleasedEventSender {
    public abstract sendEvent(e?: KeyEvent): void;
}
