export interface IClientAsset<T = {}> {
    id: string;
    type: string;
    name: string;
    data: T;
}
