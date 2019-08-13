import { autobind } from "../../../../core/autobind/autobind";
import { Dictionary } from "../../../../core/collection/Dictionary";
import { IDictionary } from "../../../../core/collection/IDictionary";
import { IBeforeRenderable } from "../../IBeforeRenderable";
import { IRegisterBeforeRenderable } from "../IRegisterBeforeRenderable";

export class RegisterBeforeRenderable implements IRegisterBeforeRenderable {
    private map: IDictionary<number, IBeforeRenderable> = new Dictionary();

    public register(obj: IBeforeRenderable): void {
        this.map.setValue(obj.id, obj);
    }
    public unregister(obj: IBeforeRenderable): void {
        this.map.remove(obj.id);
    }
    @autobind
    public loop(): void {
        // PERF: Performance improvement area
        this.map.forEach((key, value) => value.beforeRender());
    }
    public cleanUp(): void {
        this.map.clear();
    }
}
