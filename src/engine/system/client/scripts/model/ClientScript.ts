import { ILogger } from "../../../../../core/logger";
import { ServerScript } from "../../../server/model/ServerScript";
import { IClientScript } from "../api/IClientScript";

export class ClientScript extends ServerScript implements IClientScript {
    private _id: string;
    get id() {
        return this._id;
    }
    constructor(id: string, logger: ILogger, scriptString: string) {
        super(logger, scriptString);
        this._id = id;
    }
}
