import React, { useLayoutEffect } from 'react';
import { Configuration } from '../core/configuration/Configuration';
import { Startup } from '../engine/Startup';
import { Logger } from '../engine/logger/LoggerFactory';
import { TestGame } from '../games/TestGame';

export default function GameView() {
    useLayoutEffect(() => {
        startGame();
    });
    return <div id="game-window" />;
}

const GAMES: { startup?: any } = {};
const startGame = () => {
    try {
        if (GAMES.startup) {
            GAMES.startup.stop();
            GAMES.startup = undefined;
        }
        Configuration.setConfig('DEBUG', true);
        // Configuration.setConfig("TRACE", true);

        GAMES.startup = new Startup(
            {
                appendToTag: 'game-window',
                user: { accessToken: 'locale-user-access-token' },
                coreServerUrl: 'locale-core-server',
            },
            TestGame
        );
        GAMES.startup.run();
    } catch (ex) {
        new Logger('GameView').error('Game threw exception', ex);
    }
};
