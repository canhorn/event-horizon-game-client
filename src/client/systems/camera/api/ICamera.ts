export interface ICamera {
    id: number;
    initialize(): void;
    dispose(): void;
    update(): void;
    attachControl(): void;
    setAsActive(): void;
}
