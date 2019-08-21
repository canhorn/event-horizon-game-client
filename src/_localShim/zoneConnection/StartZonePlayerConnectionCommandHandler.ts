import { Color4, Vector3 } from "babylonjs";
import { createGetAccountQuery } from "../../client/account/get/GetAccountQuery";
import { IZonePlayerInfo } from "../../client/server/zone/api/IZonePlayerInfo";
import { createZonePlayerInfoReceivedEvent } from "../../client/server/zone/info/ZonePlayerInfoReceivedEvent";
import { START_ZONE_PLAYER_CONNECTION_COMMAND } from "../../client/server/zone/start/StartZonePlayerConnectionCommand";
import { createZoneDetailsQuery } from "../../client/zone/query/ZoneDetailsQuery";
import { ICommandHandler } from "../../engine/command/api/ICommandHandler";
import { ICommandResult } from "../../engine/command/api/ICommandResult";
import { ICommandType } from "../../engine/command/api/ICommandType";
import { IEventService } from "../../engine/event/IEventService";
import { Inject } from "../../engine/ioc/Create";
import { createLogger } from "../../engine/logger/InjectLoggerDecorator";
import { ILogger } from "../../engine/logger/LoggerFactory";
import { IQueryService } from "../../engine/query/IQueryService";

/**
 * Name: StartCoreServerConnectionCommand
 * Type: Command
 */
export class StartZonePlayerConnectionCommandHandler
    implements ICommandHandler {
    public type: ICommandType = START_ZONE_PLAYER_CONNECTION_COMMAND;
    constructor(
        private readonly _logger: ILogger = createLogger(
            "StartZonePlayerConnectionCommandHandler"
        ),
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _queryService: IQueryService = Inject(IQueryService)
    ) {}
    public handle(): ICommandResult {
        const { result: zoneDetails } = this._queryService.query(
            createZoneDetailsQuery({})
        );
        const { result: accountQuery } = this._queryService.query(
            createGetAccountQuery({})
        );

        this._logger.debug("Zone Player Info: ", zonePlayerInfo);
        this._eventService.publish(
            createZonePlayerInfoReceivedEvent({ zonePlayerInfo })
        );

        // connection.on("ClientAction", (event: string, eventData: any) => {
        //     this._eventService.publish(
        //         createClientActionReceivedEvent({
        //             action: event,
        //             data: eventData,
        //         })
        //     );
        // });

        return {
            success: true,
        };
    }
}
const createVector3 = ({ x, y, z }: { x: number; y: number; z: number }) =>
    new Vector3(x, y, z);
const createColor4 = ({
    r,
    g,
    b,
    a,
}: {
    r: number;
    g: number;
    b: number;
    a: number;
}) => new Color4(r, g, b, a);
const zonePlayerInfo: IZonePlayerInfo = {
    player: {
        playerId: "player-id",
        id: 0,
        position: {
            currentPosition: {
                x: 0,
                y: 0,
                z: 0,
            },
        },
        data: {
            ownerState: {
                ownerId: "7eba45d5-dbf6-4f82-bcb2-c96214be4ad2",
                canBeCaptured: false,
            },
            movementState: {
                speed: 1.0,
            },
            routine: {
                name: "MOVE",
            },
            defaultRoutine: {
                name: "IDLE",
            },
            wander: {
                lookDistance: 25,
            },
            life: {
                health: 0,
            },
            lifeState: {
                condition: {
                    name: "ALIVE",
                },
                healthPoints: 7173,
                maxHealthPoints: 10000,
                actionPoints: 9826,
                maxActionPoints: 10000,
                attack: 1,
            },
            levelState: {
                healthPointsLevel: 1,
                actionPointsLevel: 1,
                attackLevel: 1,
                experience: 0,
                allTimeExperience: 3,
            },
            skillState: {
                skillList: {
                    fire_ball: {
                        cooldownFinishes: "2019-06-14T18:04:14.0149854Z",
                    },
                },
            },
            modelState: {
                AnimationList: [],
                mesh: {
                    type: "SPHERE",
                    assetId: "SPHERE-cc0d-4094-aecf",
                },
            },
            behavior: {
                treeId: "Behaviors_Idle.json",
            },
            actorMoveToPosition: null,
            nextRunTime: "2019-07-04T08:58:21.2081773-05:00",
        },
    },
    i18nMap: {},
    lighting: {
        name: "main_light",
        tags: [],
        enableDayNightCycle: false,
        type: "point",
    },
    map: {
        numberOfNodes: 1,
        nodeList: [],
        edgeList: [],
    },
    mapMesh: {
        name: "some-mesh",
        lightTag: "main_light",
        heightMapUrl: "/Game/Level/Home/Assets/HomeLevel.png",
        width: 128,
        height: 128,
        subdivisions: 200,
        minHeight: 0,
        maxHeight: 15,
        updatable: true,
        isPickable: true,
    },
    particleTemplateList: [
        {
            id: "Particle_Flame",
            name: "Particle_Flame",
            type: "POSITION",
            defaultSettings: {
                emitter: Vector3.Zero(),
                capacity: 2000,
                particleTexture: "/Assets/Textures/flare.png",
                minEmitBox: createVector3({
                    x: -0.5,
                    y: 1,
                    z: -0.5,
                }),
                maxEmitBox: createVector3({
                    x: 0.5,
                    y: 1,
                    z: 0.5,
                }),
                color1: createColor4({
                    r: 1,
                    g: 0.5,
                    b: 0,
                    a: 0.7,
                }),
                color2: createColor4({
                    r: 1,
                    g: 0.5,
                    b: 0,
                    a: 0.7,
                }),
                colorDead: createColor4({
                    r: 0.0,
                    g: 0.0,
                    b: 0.0,
                    a: 0.0,
                }),
                minSize: 0.3,
                maxSize: 1,
                minLifeTime: 0.2,
                maxLifeTime: 1,
                emitRate: 2000,
                gravity: createVector3({
                    x: 0,
                    y: 0,
                    z: 0,
                }),
                direction1: createVector3({
                    x: 0,
                    y: 2.7,
                    z: 0,
                }),
                direction2: createVector3({
                    x: 0,
                    y: 2.7,
                    z: 0,
                }),
                minAngularSpeed: 0,
                maxAngularSpeed: 3.14,
                minEmitPower: 1,
                maxEmitPower: 2,
                updateSpeed: 0.007,
                blendMode: 0,
            },
        },
        {
            id: "Particle_SelectedIndicator",
            name: "selected_indicator",
            type: "POSITION",
            defaultSettings: {
                emitter: Vector3.Zero(),
                capacity: 100,
                particleTexture: "/Assets/Textures/identifier.png",
                minEmitBox: createVector3({
                    x: 0,
                    y: 2,
                    z: 0,
                }),
                maxEmitBox: createVector3({
                    x: 0,
                    y: 2,
                    z: 0,
                }),
                color1: createColor4({
                    r: 0.0,
                    g: 0.0,
                    b: 1,
                    a: 0.9,
                }),
                color2: createColor4({
                    r: 0.0,
                    g: 0.0,
                    b: 1,
                    a: 0.9,
                }),
                colorDead: createColor4({
                    r: 0.0,
                    g: 0.0,
                    b: 1,
                    a: 0.3,
                }),
                minSize: 0.1,
                maxSize: 0.3,
                minLifeTime: 0.2,
                maxLifeTime: 3,
                emitRate: 10,
                gravity: createVector3({
                    x: 0,
                    y: 0,
                    z: 0,
                }),
                direction1: createVector3({
                    x: 0,
                    y: -0.9,
                    z: 0,
                }),
                direction2: createVector3({
                    x: 0,
                    y: -0.9,
                    z: 0,
                }),
                minAngularSpeed: 0,
                maxAngularSpeed: 3.14,
                minEmitPower: 1,
                maxEmitPower: 2,
                updateSpeed: 0.008,
                blendMode: 1,
            },
        },
    ],
    guiLayout: {
        layoutList: [
            {
                id: "onscreen_skill_selection",
                sort: 0,
                controlList: [
                    {
                        id: "onscreen_skill_selection-grid",
                        sort: 0,
                        controlList: [
                            {
                                id: "onscreen_skill_selection-panel",
                                sort: 0,
                                controlList: [],
                            },
                        ],
                    },
                ],
            },
        ],
        templateList: [
            {
                id: "onscreen_skill_selection-grid",
                type: "Grid",
                options: {
                    column: 3,
                    row: 3,
                    backgroundColor: "transparent",
                    paddingBottom: 5,
                    paddingTop: 5,
                    paddingLeft: 5,
                    paddingRight: 5,
                },
            },
            {
                id: "onscreen_skill_selection-panel",
                type: "Panel",
                gridLocation: {
                    row: 2,
                    column: 0,
                },
                options: {},
            },
            {
                id: "onscreen_skill_selection-skill-spacer",
                type: "Spacer",
                options: {
                    padding: 5,
                },
            },
            {
                id: "onscreen_skill_selection-skill-button",
                type: "Button",
                options: {
                    text: "25 / 100",
                    linkOffsetY: -50,
                    width: "120px",
                    height: "20px",
                    textSize: 12,
                    textColor: "white",
                    backgroundColor: "red",
                    alignment: 2,
                    vAlignment: 0,
                    borderThickness: 0,
                },
            },
        ],
    },
    clientAssetList: [
        {
            id: "SPHERE-cc0d-4094-aecf",
            type: "MESH",
            name: "A Sphere",
            data: {
                type: "SPHERE",
                segments: 16,
                diameter: 2,
                heightOffset: -1.2,
            },
        },
    ],
    clientEntityInstanceList: [],
    clientScriptList: [
        {
            name: "SkillSelection_Initialize.js",
            scriptFileName: "Initialize.js",
            scriptPath: "SkillSelection",
            scriptString:
                '/** \
        * This the internal "state" of the script, only accessible by the script. \
        * $state: { \
        * }; \
        *  \
        * This is data passed to the script from the outside. \
        * $data: { \
        * }; \
        */ \
        \
       const skillList = $data.skillList; \
       const keyboardShortcuts = $state._keyboardShortcuts = []; \
       \
       // Register New GUI Control\'s from Templates \
       $services.commandService.send({ \
           type: { \
               key: "GUI.REGISTER_CONTROL_COMMAND" \
           }, \
           data: { \
               controlId: "onscreen_skill_selection-grid", \
               templateId: "onscreen_skill_selection-grid" \
           } \
       }); \
       $services.commandService.send({ \
           type: { \
               key: "GUI.REGISTER_CONTROL_COMMAND" \
           }, \
           data: { \
               controlId: "onscreen_skill_selection-panel", \
               templateId: "onscreen_skill_selection-panel" \
           } \
       }); \
       \
       // Active the Skill Selection GUI \
       const skillSelectionLayoutId = "onscreen_skill_selection"; \
       $services.commandService.send({ \
           type: { \
               key: "GUI.ACTIVATE_LAYOUT_COMMAND" \
           }, \
           data: { \
               layoutId: skillSelectionLayoutId \
           } \
       }); \
       \
       // Create Skill List Panel \
       const panelControlId = "onscreen_skill_selection-panel"; \
       const panelLayoutControlList = insertSpacer( \
           skillList.map((_, index) => ({ \
               id: `onscreen_skill_selection-skill-${index}-button`, \
               sort: index, \
               controlList: [] \
           })) \
       ); \
       \
       // Add Panel Layout Control List to panelControl  \
       $services.commandService.send({ \
           type: { \
               key: "GUI.ADD_LAYOUT_TO_CONTROL_COMMAND" \
           }, \
           data: { \
               targetControlId: panelControlId, \
               registerControlList: [ \
                   ...skillList.map((_, index) => ({ \
                       controlId: `onscreen_skill_selection-skill-${index}-spacer`, \
                       templateId: `onscreen_skill_selection-skill-spacer` \
                   })), \
                   ...skillList.map((skill, index) => ({ \
                       controlId: `onscreen_skill_selection-skill-${index}-button`, \
                       templateId: `onscreen_skill_selection-skill-button`, \
                       options: { \
                           text: skill.skillName, \
                           onClick: skill.onClick, \
                           linkOffsetY: index * -50 \
                       } \
                   })) \
               ], \
               templateList: [], \
               layout: { \
                   id: "onscreen_skill_selection-panel-skill_list", \
                   count: 0, \
                   controlList: panelLayoutControlList \
               } \
           } \
       }); \
        \
       // Setup Keyboard Shortcuts \
       setupKeyboardShortcuts(skillList); \
        \
        \
       function insertSpacer(skillList /* any[] */ ) { \
           var newList = []; \
           skillList.forEach((skill, index) => { \
               skill.sort = index * 2; \
               newList.push(skill); \
               if ($utils.isObjectDefined(skillList[index + 1])) { \
                   newList.push({ \
                       id: `onscreen_skill_selection-skill-${index}-spacer`, \
                       sort: skill.sort + 1 \
                   }); \
               } \
           }); \
           return newList; \
       } \
        \
       function setupKeyboardShortcuts(skillList) { \
           skillList.forEach(skill => \
               skill.keyboardShortcut && \
               keyboardShortcuts.push({ \
                   key: skill.keyboardShortcut, \
                   pressed: skill.onClick \
               }) \
           ); \
           keyboardShortcuts.forEach(keyboardShortcut => \
               $services.commandService.send({ \
                   type: { \
                       key: "INPUT.REGISTER_INPUT_COMMAND" \
                   }, \
                   data: keyboardShortcut \
               }) \
           ); \
       }',
        },
    ],
    entityList: [],
    serverModuleScriptList: [],
    baseEntityScriptModuleList: [],
    playerEntityScriptModuleList: [],
};
