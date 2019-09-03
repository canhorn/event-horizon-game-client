import { IPlayerEntity } from "../api/IPlayerEntity";

const STATE: IPlayerState = {
    player: undefined,
};

export const setClientPlayer = (player: IPlayerEntity): void => {
    if (STATE.player) {
        STATE.player.dispose();
    }
    Object.assign(STATE, {
        player,
    });
};

export const getClientPlayer = (): IPlayerEntity | undefined => STATE.player;

interface IPlayerState {
    player: IPlayerEntity | undefined;
}
