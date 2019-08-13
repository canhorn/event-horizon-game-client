export interface IServerScript {
    isRunnable: boolean;
    run<T>(data: any): T;
}
