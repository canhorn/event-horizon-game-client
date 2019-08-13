export interface IState {
    id: number;
    remove: boolean;
    name: string;

    update(): void;
    reset(): void;
}
