import { Inject } from "../../ioc/Create";
import { IIndexPool } from "../../math/index/IIndexPool";
import { IndexPool } from "../../math/index/impl/IndexPool";
import { IEntity } from "../api/IEntity";

export abstract class Entity implements IEntity {
    private _id: number;

    get id(): number {
        return this._id;
    }

    constructor(protected readonly _indexPool: IndexPool = Inject(IIndexPool)) {
        this._id = _indexPool.nextIndex();
    }
}
