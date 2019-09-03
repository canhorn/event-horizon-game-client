import { Control } from "babylonjs-gui";
import { Inject } from "../../../../core/ioc/api/Inject";
import { isObjectDefined } from "../../../../core/object/ObjectCheck";
import { ISystemWindow } from "../../../../core/window";
import { IGuiAnimationOptions } from "../../api/IGuiAnimationOptions";
import { IGuiControlOptionsWithAnimation } from "./api/IGuiControlOptionsWithAnimation";
import { isValidAnimation } from "./IsValidAnimation";

export const runGuiAnimation = (
    control: Control,
    options: IGuiControlOptionsWithAnimation,
    isVisible: boolean
): boolean => {
    if (
        isObjectDefined(options.animation) &&
        isValidAnimation(options.animation) &&
        options.animation.isEnabled
    ) {
        if (isVisible) {
            control.isVisible = isVisible;
            // Start the countdown to 1 alpha
            control.alpha = options.animation.transitionStart;
            setupOpenTransitionHandler(options.animation, control);
        } else {
            setupCloseTransitionHandler(options.animation, control);
        }
        return true;
    }
    return false;
};

const setupOpenTransitionHandler = (
    animation: IGuiAnimationOptions,
    control: Control,
    window: ISystemWindow = Inject(ISystemWindow)
) => {
    const { transition, transitionEnd, transitionTime } = animation;
    const alphaTransitionHandler = window.setInterval(() => {
        control.alpha = control.alpha + transition;
        if (control.alpha >= transitionEnd) {
            control.alpha = transitionEnd;
            window.clearInterval(alphaTransitionHandler);
        }
    }, transitionTime);
};

const setupCloseTransitionHandler = (
    animation: IGuiAnimationOptions,
    control: Control,
    window: ISystemWindow = Inject(ISystemWindow)
) => {
    const { transition, transitionStart, transitionTime } = animation;
    const alphaTransitionHandler = window.setInterval(() => {
        control.alpha = control.alpha - transition;
        if (control.alpha <= transitionStart) {
            control.alpha = transitionStart;
            window.clearInterval(alphaTransitionHandler);
            control.isVisible = false;
        }
    }, transitionTime);
};
