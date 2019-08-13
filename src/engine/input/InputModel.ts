export interface InputOptions {
    key: string;
    pressed?: InputCallback;
    released?: InputCallback;
}

export type InputCallback = (e?: InputKeyEvent) => void;

export interface InputKeyEvent extends KeyboardEvent {
    preventRepeat(): void;
}
