"use strict";

export class ContainerConfig {
    public static addSource(patterns: string | string[], baseDir?: string) {
        const requireGlob = require("require-glob");
        baseDir = baseDir || process.cwd();
        requireGlob.sync(patterns, {
            cwd: baseDir,
        });
    }
}
