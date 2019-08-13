import { IModule } from "../../../../../engine/module/IModule";

/**
 * Name: SelectedTracker
 * For: Player
 */
export const SELECTED_TRACKER_MODULE_NAME = "SELECTED_TRACKER_MODULE_NAME";
export interface ISelectedTrackerModule extends IModule {
    hasSelectedEntity: boolean;
    selectedEntityId: number;
}
