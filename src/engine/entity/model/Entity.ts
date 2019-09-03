import { IIndexPool } from "../../../core/index/IIndexPool";
import { Inject } from "../../../core/ioc";
import { IEntity } from "../api/IEntity";

export abstract class Entity implements IEntity {
    private _id: number;

    get id(): number {
        return this._id;
    }

    constructor(
        protected readonly _indexPool: IIndexPool = Inject(IIndexPool)
    ) {
        this._id = _indexPool.nextIndex();
    }
}
