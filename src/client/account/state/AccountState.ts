import { IAccountState } from "../api/IAccountState";
import { IAccountUser } from "../api/IAccountUser";

const STATE: IAccountState = {
    accessToken: "",
    user: null,
};

export const getAccountState = (): IAccountState => {
    Object.assign({}, STATE);
    return STATE;
};
export const setAccountAccessToken = (accessToken: string) =>
    Object.assign(STATE, {
        accessToken,
    });
export const setAccountUser = (user: IAccountUser) =>
    Object.assign(STATE, {
        user,
    });
