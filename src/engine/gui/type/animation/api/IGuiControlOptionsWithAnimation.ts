import { IGuiAnimationOptions } from "../../../api/IGuiAnimationOptions";
import { IGuiControlOptions } from "../../../api/IGuiControlOptions";

export interface IGuiControlOptionsWithAnimation extends IGuiControlOptions {
    animation?: IGuiAnimationOptions;
}
