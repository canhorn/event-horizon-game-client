import React, { useLayoutEffect } from "react";
import { Configuration } from "../core/configuration/Configuration";
import { createLogger, ILogger } from "../core/logger";
import { Startup } from "../engine/Startup";
import { TestGame } from "../games/TestGame";

export default function GameView() {
    useLayoutEffect(() => {
        startGame();
    });
    return <div id="game-window" />;
}

const GAMES: { startup?: any } = {};
const startGame = (logger: ILogger = createLogger("GameView")) => {
    try {
        if (GAMES.startup) {
            GAMES.startup.stop();
            GAMES.startup = undefined;
        }
        Configuration.setConfig("DEBUG", true);
        // Configuration.setConfig("TRACE", true);

        GAMES.startup = new Startup(
            {
                appendToTag: "game-window",
                user: { accessToken: "locale-user-access-token" },
                coreServerUrl: "locale-core-server",
            },
            TestGame
        );
        GAMES.startup.run();
    } catch (ex) {
        logger.error("Game threw exception", ex);
    }
};
