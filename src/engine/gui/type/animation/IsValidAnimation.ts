import { isObjectDefined } from "../../../../core/object/ObjectCheck";
import { IGuiAnimationOptions } from "../../api/IGuiAnimationOptions";

export const isValidAnimation = (animation: IGuiAnimationOptions): boolean => {
    return (
        isObjectDefined(animation.isEnabled) &&
        isObjectDefined(animation.transition) &&
        isObjectDefined(animation.transitionEnd) &&
        isObjectDefined(animation.transitionStart) &&
        isObjectDefined(animation.transitionTime)
    );
};
