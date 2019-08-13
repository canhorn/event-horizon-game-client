import { IDictionary } from "../../../../core/collection/IDictionary";
import { GuiControlLayout } from "../../model/GuiControlLayout";

export interface IGuiLayoutState {
    layoutMap: IDictionary<string, GuiControlLayout>;
}
