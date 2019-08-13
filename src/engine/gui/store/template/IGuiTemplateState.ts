import { IDictionary } from "../../../../core/collection/IDictionary";
import { GuiTemplate } from "../../model/GuiTemplate";

export interface IGuiTemplateState {
    templateMap: IDictionary<string, GuiTemplate>;
}
