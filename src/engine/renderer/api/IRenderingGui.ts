import { IGuiCanvas } from "../../gui/IGuiCanvas";
import { IServiceMeta } from "../../service/IServiceMeta";

export abstract class IRenderingGui extends IServiceMeta {
    public abstract canvas: IGuiCanvas;
}
