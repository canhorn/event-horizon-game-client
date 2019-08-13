import { autobind } from "../../../../core/autobind/autobind";
import { Dictionary } from "../../../../core/collection/Dictionary";
import { IDictionary } from "../../../../core/collection/IDictionary";
import { IDisposable } from "../../IDisposable";
import { IRegisterDisposable } from "../IRegisterDisposable";

export class RegisterDisposable implements IRegisterDisposable {
    private map: IDictionary<number, IDisposable> = new Dictionary();

    public register(obj: IDisposable): void {
        this.map.setValue(obj.id, obj);
    }
    public unregister(obj: IDisposable): void {
        this.map.remove(obj.id);
    }
    @autobind
    public loop(): void {
        // PERF: Performance improvement area
        this.map.forEach((key, value) => value.dispose());
        this.map.clear();
    }
    public cleanUp(): void {
        this.map.clear();
    }
}
