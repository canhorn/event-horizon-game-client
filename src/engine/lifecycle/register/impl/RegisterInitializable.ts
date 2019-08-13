import { toUnicode } from "punycode";
import { autobind } from "../../../../core/autobind/autobind";
import { Dictionary } from "../../../../core/collection/Dictionary";
import { IDictionary } from "../../../../core/collection/IDictionary";
import { IInitializable } from "../../IInitializable";
import { IRegisterInitializable } from "../IRegisterInitializable";

export class RegisterInitializable implements IRegisterInitializable {
    private map: IDictionary<number, IInitializable> = new Dictionary();

    private _timeoutHandle: number = -1;

    public register(obj: IInitializable): void {
        this.map.setValue(obj.id, obj);
    }
    public unregister(obj: IInitializable): void {
        this.map.remove(obj.id);
    }
    @autobind
    public loop(): void {
        // PERF: Performance improvement area
        this.map.forEach((_, value) => value.initialize());
        this.map.forEach((_, value) => value.postInitialize());
        this.map.clear();
        this._timeoutHandle = window.setTimeout(() => this.loop(), 100);
    }
    public cleanUp(): void {
        window.clearTimeout(this._timeoutHandle);
        this.map.clear();
    }
}
