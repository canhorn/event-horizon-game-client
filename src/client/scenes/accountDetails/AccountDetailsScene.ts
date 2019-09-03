import { ICommandService } from "../../../core/command";
import { IEventService } from "../../../core/event";
import { Inject } from "../../../core/ioc";
import { IQueryService } from "../../../core/query";
import { LifeCycleEntity } from "../../../engine/lifecycle/model/LifeCycleEntity";
import { IGameScene } from "../../../engine/scene/GameScene";
import { createGetAccountQuery } from "../../account/get/GetAccountQuery";
import { createStartSceneCommand } from "../start/StartSceneCommand";
import { AccountDetailsGui } from "./gui/AccountDetailsGui";
import { AccountNotLoadedGui } from "./gui/AccountNotLoadedGui";
import { CLOSE_ACCOUNT_DETAILS_GUI_EVENT } from "./gui/close/CloseAccountDetailsGuiEvent";

export class AccountDetailsScene extends LifeCycleEntity implements IGameScene {
    private accountDetails?: AccountDetailsGui;
    private accountNotLoaded?: AccountNotLoadedGui;
    constructor(
        private readonly _queryService: IQueryService = Inject(IQueryService),
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        )
    ) {
        super();
    }
    public initialize(): void {
        // On Account Details Gui Close
        this._eventService.on(
            CLOSE_ACCOUNT_DETAILS_GUI_EVENT,
            this.onGuiClose,
            this
        );
        // Query Account User
        const { user } = this._queryService.query(
            createGetAccountQuery({})
        ).result;
        if (!user) {
            // Show Account Not Loaded GUI
            this.accountNotLoaded = new AccountNotLoadedGui();
            return;
        }
        // Show Account Details GUI
        this.accountDetails = new AccountDetailsGui(user);
    }
    public update(): void {}
    public onDispose(): void {
        if (this.accountDetails) {
            this.accountDetails.dispose();
        }
        if (this.accountNotLoaded) {
            this.accountNotLoaded.dispose();
        }
        this._eventService.off(
            CLOSE_ACCOUNT_DETAILS_GUI_EVENT,
            this.onGuiClose,
            this
        );
    }
    public draw(): void {}
    private onGuiClose() {
        this._commandService.send(
            createStartSceneCommand({
                sceneId: "main-menu",
            })
        );
    }
}
