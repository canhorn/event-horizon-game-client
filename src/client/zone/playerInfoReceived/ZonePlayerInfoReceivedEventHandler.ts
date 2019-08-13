import { ICommandService } from "../../../engine/command/api/ICommandService";
import { IEventType } from "../../../engine/event/EventType";
import {
    IEventHandler,
    IEventService,
} from "../../../engine/event/IEventService";
import { createCreateGuiCommand } from "../../../engine/gui/create/CreateGuiCommand";
import { setI18nState } from "../../../engine/i18n/store/I18nStore";
import { Inject } from "../../../engine/ioc/Create";
import { gameLoadedEvent } from "../../../engine/loading/loaded/GameLoadedEvent";
import { createLogger } from "../../../engine/logger/InjectLoggerDecorator";
import { ILogger } from "../../../engine/logger/LoggerFactory";
import { createAddParticleTemplateEvent } from "../../../engine/particle/add/AddParticleTemplateEvent";
import { setClientAsset } from "../../../engine/system/client/assets/store/ClientAssetStore";
import { createSetClientEntityInstanceCommand } from "../../../engine/system/client/entityInstance/set/SetClientEntityInstanceCommand";
import { setClientScriptTemplate } from "../../../engine/system/client/scripts/store/ClientScriptTemplateStore";
import { createAddServerModuleScriptEvent } from "../../../engine/system/server/add/AddServerModuleScriptEvent";
import { createCreateLightFromSettingsCommand } from "../../entity/light/create/CreateLightFromSettingsCommand";
import { createCreateMapFromMeshSettingsCommand } from "../../entity/map/create/CreateMapFromMeshSettingsCommand";
import { createRegisterEntityCommand } from "../../entity/register/RegisterEntityCommand";
import { createNameTag } from "../../entity/tracked/tagTypes/CreateNameTag";
import { createRegisterPlayerCommand } from "../../player/register/RegisterPlayerCommand";
import {
    ZONE_PLAYER_INFO_RECEIVED_EVENT,
    ZonePlayerInfoReceivedEventData,
} from "../../server/zone/info/ZonePlayerInfoReceivedEvent";
import {
    setBaseScriptModule,
    setPlayerScriptModule,
} from "../../systems/entityModule/state/EntityScriptModuleState";
import { setSystemMapGraph } from "../../systems/map/state/MapSystemState";
import { createZoneLoadedEvent } from "../load/ZoneLoadedEvent";

/**
 * Name: ZonePlayerInfoReceivedEventHandler
 * Type: Event
 */
export class ZonePlayerInfoReceivedEventHandler implements IEventHandler {
    public type: IEventType = ZONE_PLAYER_INFO_RECEIVED_EVENT;
    constructor(
        private readonly _logger: ILogger = createLogger(
            "ZonePlayerInfoReceivedEventHandler"
        ),
        private readonly _eventService: IEventService = Inject(IEventService),
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        )
    ) {}
    public handle({
        zonePlayerInfo: {
            map,
            i18nMap,
            lighting,
            mapMesh,
            player,
            clientAssetList,
            clientEntityInstanceList,
            clientScriptList,
            particleTemplateList,
            guiLayout,
            entityList,
            serverModuleScriptList,
            baseEntityScriptModuleList,
            playerEntityScriptModuleList,
        },
    }: ZonePlayerInfoReceivedEventData): void {
        // Set Map State
        setSystemMapGraph(map);

        // Setup i18n
        this._logger.debug("I18n State Set", i18nMap);
        setI18nState(i18nMap);

        // TODO: Load Global Lighting, from server
        this._logger.debug("Loading Light", lighting); // <- Does not get pulled from server, yet.
        this._commandService.send(
            createCreateLightFromSettingsCommand({
                lightSettings: {
                    name: "global_light",
                    enableDayNightCycle: false,
                    type: "point",
                    tags: [],
                },
            })
        );
        this._commandService.send(
            createCreateLightFromSettingsCommand({
                lightSettings: {
                    name: "global_light_hem",
                    enableDayNightCycle: false,
                    type: "hemispheric",
                    tags: [],
                },
            })
        );
        
        // Create Map of Level
        this._commandService.send(
            createCreateMapFromMeshSettingsCommand({
                mapMeshSettings: {
                    ...mapMesh,
                    lightTag: createNameTag("global_light"),
                },
            })
        );

        // Add Particle Templates
        particleTemplateList.forEach(template =>
            this._eventService.publish(
                createAddParticleTemplateEvent({
                    template,
                })
            )
        );

        // Create Zone Gui
        this._commandService.send(createCreateGuiCommand(guiLayout));

        // Add Client Script Templates
        clientScriptList.forEach(clientScriptTemplate =>
            setClientScriptTemplate(clientScriptTemplate)
        );

        // Add Client Assets
        clientAssetList.forEach(clientAsset => setClientAsset(clientAsset));

        // Add Client Entity Instances
        clientEntityInstanceList.forEach(clientEntityInstance =>
            this._commandService.send(
                createSetClientEntityInstanceCommand({ clientEntityInstance })
            )
        );

        // Add Base Script Modules
        baseEntityScriptModuleList.forEach(baseEntityScriptModule =>
            setBaseScriptModule(baseEntityScriptModule)
        );

        // Add Player Script Modules
        playerEntityScriptModuleList.forEach(playerEntityScriptModule =>
            setPlayerScriptModule(playerEntityScriptModule)
        );

        // Register the Player Entity
        this._commandService.send(
            createRegisterPlayerCommand({
                playerDetails: player,
            })
        );

        // Register all Entities
        entityList.forEach(entityDetails =>
            this._commandService.send(
                createRegisterEntityCommand({
                    entityDetails,
                })
            )
        );

        // Add Server Modules Scripts
        serverModuleScriptList.forEach(serverModuleScript =>
            this._eventService.publish(
                createAddServerModuleScriptEvent(serverModuleScript)
            )
        );

        // Publish Zone Loaded Event
        this._eventService.publish(createZoneLoadedEvent({}));

        // Publish Game Loaded
        this._eventService.publish(gameLoadedEvent);
    }
}
