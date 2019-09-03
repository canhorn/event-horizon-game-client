import { createDisposeOfGuiCommand } from "../../../../engine/gui/dispose/DisposeOfGuiCommand";
import { createRegisterGuiLayoutDataCommand } from "../../../../engine/gui/register/RegisterGuiLayoutDataCommand";
import { IObjectEntity } from "../../../entity/api/IObjectEntity";
import {
    BaseScriptLikeModule,
    IBaseScriptModuleProperties,
} from "../../script/BaseScriptLikeModule";
import { IHealthModule } from "../api/IHealthModule";
import HealthModuleGuiJson from "./HealthModule.Gui.json";

const registeredControl = false;

export class HealthModule extends BaseScriptLikeModule
    implements IHealthModule {
    constructor(_entity: IObjectEntity) {
        super(_entity);
    }
    public onUpdate(props: IBaseScriptModuleProperties): void {}
    public onDispose({ $services, $data }: IBaseScriptModuleProperties): void {
        const eventsToRemove = $data.eventsToDispose || [];
        eventsToRemove.forEach((eventData: any) => {
            $services.eventService.off(
                {
                    key: eventData.name,
                },
                eventData.handler,
                eventData.context
            );
        });
        $services.commandService.send(
            createDisposeOfGuiCommand({
                id: $data.guiId,
            })
        );
    }
    public onInitialize({
        $services,
        $data,
        $utils,
    }: IBaseScriptModuleProperties): void {
        const { $entity } = $data;
        // This can be registered by the application during the zone loading process.
        $services.commandService.send(
            createRegisterGuiLayoutDataCommand({
                layoutData: HealthModuleGuiJson,
            })
        );

        $data.guiId = `health_module-${$data.$entity.id}`;

        $services.commandService.send(
            $utils.createEvent("Engine.Gui.CREATE_GUI_COMMAND", {
                id: $data.guiId,
                layoutId: HealthModuleGuiJson.id,
                controlDataList: [
                    {
                        controlId: "gui_health_module-bar",
                        options: {
                            text: getEntityText(),
                            percent: getEntityPercent(),
                        },
                        linkWith: $entity.getProperty("MESH_MODULE_NAME").mesh,
                    },
                ],
            })
        );
        $services.commandService.send(
            $utils.createEvent("Engine.Gui.ACTIVATE_GUI_COMMAND", {
                id: $data.guiId,
            })
        );

        function onEntityChanged({ entityId }: any) {
            if ($entity.entityId !== entityId) {
                return;
            }
            $services.logger.debug("onEntityChanged", {
                entityId: $entity.entityId,
                passedEntityId: entityId,
                options: {
                    text: getEntityText(),
                    percent: getEntityPercent(),
                },
            });

            $services.commandService.send(
                $utils.createEvent("Engine.Gui.UPDATE_GUI_CONTROL_COMMAND", {
                    guiId: $data.guiId,
                    control: {
                        controlId: "gui_health_module-bar",
                        options: {
                            text: getEntityText(),
                            percent: getEntityPercent(),
                        },
                    },
                })
            );
        }
        function getEntityText() {
            const lifeState = $entity.getProperty("lifeState");
            return `${lifeState.healthPoints}/${lifeState.maxHealthPoints}`;
        }
        function getEntityPercent() {
            const lifeState = $entity.getProperty("lifeState");
            return (lifeState.healthPoints / lifeState.maxHealthPoints) * 100;
        }
        function onMeshSet({ id }: any) {
            if ($entity.id !== id) {
                return;
            }

            $services.commandService.send(
                $utils.createEvent("Engine.Gui.UPDATE_GUI_CONTROL_COMMAND", {
                    guiId: $data.guiId,
                    control: {
                        controlId: "gui_health_module-bar",
                        linkWith: $entity.getProperty("MESH_MODULE_NAME").mesh,
                    },
                })
            );
        }

        // Setup Event Listener's
        $services.eventService.on(
            {
                key: "Entity.ENTITY_CHANGED_SUCCESSFULLY_EVENT",
            },
            onEntityChanged,
            this
        );
        $services.eventService.on(
            {
                key: "Module.Mesh.MESH_SET_EVENT",
            },
            onMeshSet,
            this
        );
        $data.eventsToRemove = [];
        $data.eventsToRemove.push({
            name: "Entity.ENTITY_CHANGED_SUCCESSFULLY_EVENT",
            handler: onEntityChanged,
            context: this,
        });
        $data.eventsToRemove.push({
            name: "Module.Mesh.MESH_SET_EVENT",
            handler: onMeshSet,
            context: this,
        });
    }
}
