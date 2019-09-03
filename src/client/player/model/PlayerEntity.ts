import { getI18nState } from "../../../core/i18n/store/I18nStore";
import { createShowDebuggingMessageEvent } from "../../../engine/debugging/message/ShowDebuggingMessageEvent";
import { createCloseDebuggingWindowCommand } from "../../../engine/debugging/open/CloseDebuggingWindowCommand";
import { createOpenDebuggingWindowCommand } from "../../../engine/debugging/open/OpenDebuggingWindowCommand";
import { createShowGuiCommand } from "../../../engine/gui/show/ShowGuiCommand";
import { runClientScript } from "../../../engine/system/client/scripts/run/RunClientScript";
import { ObjectEntity } from "../../entity/model/ObjectEntity";
import { createTypeTag } from "../../entity/tracked/tagTypes/CreateTypeTag";
import { createRegisterAllPlayerModulesCommand } from "../../systems/entityModule/register/RegisterAllPlayerModulesCommand";
import { IPlayerZoneDetails } from "../api/IPlayerZoneDetails";
import { CAMERA_MODULE_NAME } from "../modules/camera/api/ICameraModule";
import { CameraModule } from "../modules/camera/model/CameraModule";
import { INPUT_MODULE_NAME } from "../modules/input/api/IInputModule";
import { InputModule } from "../modules/input/model/InputModule";
import { MOVE_SELECTED_MODULE_NAME } from "../modules/moveSelected/api/IMoveSelectedModule";
import MoveSelectedModule from "../modules/moveSelected/model/MoveSelectedModule";
import { PLAYER_INTERACTION_MODULE_NAME } from "../modules/playerInteraction/api/IPlayerInteractionModule";
import PlayerInteractionModule from "../modules/playerInteraction/model/PlayerInteractionModule";
import { SANDBOX_MODULE_NAME } from "../modules/sandbox/api/ISandboxModule";
import { SandboxModule } from "../modules/sandbox/model/SandboxModule";
import { SCREEN_POINTER_MODULE_NAME } from "../modules/screenPointer/api/IScreenPointerModule";
import ScreenPointerModule from "../modules/screenPointer/model/ScreenPointerModule";
import { SELECTED_COMPANION_TRACKER_MODULE_NAME } from "../modules/selectedCompanionTracker/api/ISelectedCompanionTrackerModule";
import SelectedCompanionTrackerModule from "../modules/selectedCompanionTracker/model/SelectedCompanionTrackerModule";
import { SELECTED_TRACKER_MODULE_NAME } from "../modules/selectedTracker/api/ISelectedTrackerModule";
import { SelectedTrackerModule } from "../modules/selectedTracker/model/SelectedTrackerModule";

export class PlayerEntity extends ObjectEntity {
    public type: string = "PLAYER";
    public details: IPlayerZoneDetails;

    constructor(player: IPlayerZoneDetails) {
        super(player);
        this.details = player;
        this._tags.push(createTypeTag("player"));
    }
    public initialize(): void {
        super.initialize();

        this.registerModule(CAMERA_MODULE_NAME, new CameraModule(this));
        this.registerModule(INPUT_MODULE_NAME, new InputModule(this));
        this.registerModule(
            SCREEN_POINTER_MODULE_NAME,
            new ScreenPointerModule(this)
        );
        this.registerModule(
            SELECTED_TRACKER_MODULE_NAME,
            new SelectedTrackerModule(this)
        );
        this.registerModule(
            MOVE_SELECTED_MODULE_NAME,
            new MoveSelectedModule(this)
        );
        this.registerModule(
            SELECTED_COMPANION_TRACKER_MODULE_NAME,
            new SelectedCompanionTrackerModule(this)
        );
        this.registerModule(
            PLAYER_INTERACTION_MODULE_NAME,
            new PlayerInteractionModule(this)
        );
        this.registerModule(SANDBOX_MODULE_NAME, new SandboxModule(this));
        this._commandService.send(
            createRegisterAllPlayerModulesCommand({
                playerEntity: this,
            })
        );

        // TODO: Put this into a Player Module
        runClientScript("player_script", "SkillSelection_Initialize.js", {
            skillList: [
                {
                    skillName: "Clear Selection",
                    onClick: () =>
                        runClientScript(
                            "skill.clear_selection",
                            "Skill_Player_ClearSelection.js",
                            this
                        ),
                },
                {
                    skillName: "Open Debugging",
                    onClick: () =>
                        this._commandService.send(
                            createOpenDebuggingWindowCommand({})
                        ),
                },
                {
                    skillName: "Close Debugging",
                    onClick: () =>
                        this._commandService.send(
                            createCloseDebuggingWindowCommand({})
                        ),
                },
                {
                    skillName: "Test Debugging Message",
                    onClick: () =>
                        this._eventService.publish(
                            createShowDebuggingMessageEvent({
                                message: "Am A TEST!!",
                            })
                        ),
                },
                {
                    skillName: "Open Dialog",
                    onClick: () =>
                        this._commandService.send(
                            createShowGuiCommand({ id: "gui_dialog" })
                        ),
                },
                {
                    skillName: "Show System Log",
                    onClick: () =>
                        runClientScript(
                            "skill.clear_selection",
                            "Log_ShowSystemLog.js",
                            this
                        ),
                },
                {
                    skillName: "Hide System Log",
                    onClick: () =>
                        runClientScript(
                            "skill.clear_selection",
                            "Log_HideSystemLog.js",
                            this
                        ),
                },
                {
                    skillName: "Fire Ball",
                    keyboardShortcut: "k",
                    onClick: () =>
                        runClientScript(
                            "skill.fireball",
                            "Skill_Player_FireBall.js",
                            this
                        ),
                },
                {
                    skillName: "Capture Target",
                    onClick: () =>
                        runClientScript(
                            "skill.capture_target",
                            "Skill_Player_CaptureTarget.js",
                            this
                        ),
                },
                {
                    skillName: "Companion Fire Ball",
                    keyboardShortcut: "l",
                    onClick: () =>
                        runClientScript(
                            "skill.companion_targeted_skill",
                            "Skill_Runners_RunSelectedCompanionTargetedSkill.js",
                            {
                                entity: this,
                                skillId: "fireball",
                                noSelectionsMessage: getI18nState()
                                    .noSelectionsMessage,
                            }
                        ),
                },
            ],
        });

        // this.registerModule(
        //     SKILL_SELECTION_MODULE_NAME,
        //     new SkillSelectionModule([
        //         {
        //             skillName: "Clear Selection",
        //             onClick: () =>
        //                 this._eventService.publish(clearPointerHitEntityEvent)
        //         },
        //         {
        //             skillName: "Show Chat",
        //             onClick: () =>
        //                 this._eventService.publish({
        //                     type: { key: "MessageFromCombatSystem.SHOW" }
        //                 })
        //         },
        //         {
        //             skillName: "Hide Chat",
        //             onClick: () =>
        //                 this._eventService.publish({
        //                     type: { key: "MessageFromCombatSystem.HIDE" }
        //                 })
        //         },
        //         {
        //             skillName: "Fire Ball",
        //             keyboardShortcut: "k",
        //             onClick: () => {
        //                 const selectedTrackerModule: ISelectedTrackerModule = this.getProperty(
        //                     SELECTED_TRACKER_MODULE_NAME
        //                 );
        //                 if (selectedTrackerModule.hasSelectedEntity) {
        //                     this._eventService.publish(
        //                         createPlayerActionEvent({
        //                             action: "Player.RUN_SKILL",
        //                             data: {
        //                                 casterId: this.entityId,
        //                                 targetId:
        //                                     selectedTrackerModule.selectedEntityId,
        //                                 skillId: "fire_ball"
        //                             }
        //                         })
        //                     );
        //                 } else {
        //                     this._eventService.publish({
        //                         type: { key: "MessageFromCombatSystem" },
        //                         data: {
        //                             message: "No body selected"
        //                         }
        //                     });
        //                 }
        //             }
        //         },
        //         {
        //             skillName: "Capture Target",
        //             onClick: () => {
        //                 const selectedTrackerModule: ISelectedTrackerModule = this.getProperty(
        //                     SELECTED_TRACKER_MODULE_NAME
        //                 );
        //                 if (selectedTrackerModule.hasSelectedEntity) {
        //                     this._eventService.publish(
        //                         createPlayerActionEvent({
        //                             action: "Player.RUN_SKILL",
        //                             data: {
        //                                 casterId: this.entityId,
        //                                 targetId:
        //                                     selectedTrackerModule.selectedEntityId,
        //                                 skillId: "capture_target"
        //                             }
        //                         })
        //                     );
        //                 } else {
        //                     this._eventService.publish({
        //                         type: { key: "MessageFromCombatSystem" },
        //                         data: {
        //                             message: "No target to capture"
        //                         }
        //                     });
        //                 }
        //             }
        //         },
        //         {
        //             skillName: "Companion Fire Ball",
        //             keyboardShortcut: "l",
        //             onClick: () => {
        //                 const selectedCompanionTrackerModule: ISelectedCompanionTrackerModule = this.getProperty(
        //                     SELECTED_COMPANION_TRACKER_MODULE_NAME
        //                 );
        //                 const selectedTrackerModule: ISelectedTrackerModule = this.getProperty(
        //                     SELECTED_TRACKER_MODULE_NAME
        //                 );
        //                 if (
        //                     selectedTrackerModule.hasSelectedEntity &&
        //                     selectedCompanionTrackerModule.hasSelectedEntity
        //                 ) {
        //                     this._eventService.publish(
        //                         createPlayerActionEvent({
        //                             action: "Player.RUN_SKILL_ON_COMPANION",
        //                             data: {
        //                                 casterId:
        //                                     selectedCompanionTrackerModule.selectedEntityId,
        //                                 targetId:
        //                                     selectedTrackerModule.selectedEntityId,
        //                                 skillId: "fire_ball"
        //                             }
        //                         })
        //                     );
        //                 } else {
        //                     this._eventService.publish({
        //                         type: { key: "MessageFromCombatSystem" },
        //                         data: {
        //                             message: "No companion or target selected"
        //                         }
        //                     });
        //                 }
        //             }
        //         }
        //     ])
        // );

        // import("../../Particle/SnowParticles").then(
        //     ({ SnowParticles }) => new SnowParticles(this)
        // );
        // import("../../Particle/SmokeParticle").then(
        //     ({ SmokeParticles }) => new SmokeParticles(this)
        // );
        // import("../../Particle/FlameParticle").then(
        //     ({ FlameParticles }) => new FlameParticles(this)
        // );
        // import("../../Particle/FireParticle").then(
        //     ({ FireParticle }) => new FireParticle(this)
        // );

        // import("../../Particle/Client/ServerParticle").then(
        //     ({ ServerParticle }) => new ServerParticle(this, "Particle_Bomb")
        // );
    }
    public update(): void {
        super.update();
    }
    public dispose(): void {
        super.dispose();
    }
}
