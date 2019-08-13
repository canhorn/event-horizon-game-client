import { LifeCycleModule } from "../../../../engine/module/model/LifeCycleModule";
import { IObjectEntity } from "../../../entity/api/IObjectEntity";
import { IState } from "../api/IState";
import { IStateModule } from "../api/IStateModule";

export class StateModule extends LifeCycleModule implements IStateModule {
    private _stateQueue: IState[] = [];

    public get size() {
        return this._stateQueue.length;
    }

    constructor(entity: IObjectEntity) {
        super();
    }

    public update() {
        // Check for to remove
        if (this.size > 0 && this.firstState().remove) {
            // Go through next state in list
            this._stateQueue = this.removeStateByIndex(this.firstState().id);
        }
        // Run only if not to be removed
        if (this.size > 0 && !this.firstState().remove) {
            this.firstState().update();
        }
    }
    public dispose(): void {
        this.clear();
    }

    public removeStateByIndex(id: number): IState[] {
        return this._stateQueue.filter(value => value.id !== id);
    }

    public add(state: IState): void {
        this._stateQueue.push(state);
    }
    public addPriority(state: IState): void {
        // TEST: Test me
        this._stateQueue.unshift(state);
    }

    public clear() {
        this._stateQueue = [];
    }

    private firstState(): IState {
        return this._stateQueue[0];
    }
}
