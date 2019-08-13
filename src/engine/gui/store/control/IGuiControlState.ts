import { IDictionary } from "../../../../core/collection/IDictionary";
import { GuiControl } from "../../model/GuiControl";

export interface IGuiControlState {
    controlMap: IDictionary<string, GuiControl>;
}
