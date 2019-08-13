import { autobind } from "../../../../core/autobind/autobind";
import { Dictionary } from "../../../../core/collection/Dictionary";
import { IDictionary } from "../../../../core/collection/IDictionary";
import { IDrawable } from "../../IDrawable";
import { IRegisterDrawable } from "../IRegisterDrawable";

export class RegisterDrawable implements IRegisterDrawable {
    private map: IDictionary<number, IDrawable> = new Dictionary();

    public register(obj: IDrawable): void {
        this.map.setValue(obj.id, obj);
    }
    public unregister(obj: IDrawable): void {
        this.map.remove(obj.id);
    }
    @autobind
    public loop(): void {
        // PERF: Performance improvement area
        this.map.forEach((key, value) => value.draw());
    }
    public cleanUp(): void {
        this.map.clear();
    }
}
