import { autobind } from "../../../../core/autobind/autobind";
import { Dictionary } from "../../../../core/collection/Dictionary";
import { IDictionary } from "../../../../core/collection/IDictionary";
import { IUpdatable } from "../../IUpdatable";
import { IRegisterUpdatable } from "../IRegisterUpdatable";

export class RegisterUpdatable implements IRegisterUpdatable {
    private map: IDictionary<number, IUpdatable> = new Dictionary();

    public register(obj: IUpdatable): void {
        this.map.setValue(obj.id, obj);
    }
    public unregister(obj: IUpdatable): void {
        this.map.remove(obj.id);
    }
    @autobind
    public loop(): void {
        // PERF: Performance improvement area
        this.map.forEach((key, value) => value.update());
    }
    public cleanUp(): void {
        this.map.clear();
    }
}
