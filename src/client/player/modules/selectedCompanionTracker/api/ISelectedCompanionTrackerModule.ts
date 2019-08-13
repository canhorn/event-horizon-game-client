import { IModule } from "../../../../../engine/module/IModule";

/**
 * Name: SelectedCompanionTracker
 * For: Player
 */
export const SELECTED_COMPANION_TRACKER_MODULE_NAME =
    "SELECTED_COMPANION_TRACKER_MODULE_NAME";
export interface ISelectedCompanionTrackerModule extends IModule {
    hasSelectedEntity: boolean;
    selectedEntityId: number;
}
