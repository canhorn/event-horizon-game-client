import { IAccountUser } from "./IAccountUser";

export interface IAccountState {
    accessToken: string;
    user: IAccountUser | null;
}
