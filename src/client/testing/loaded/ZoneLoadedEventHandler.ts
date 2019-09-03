import { ICommandService } from "../../../core/command";
import { IEventHandler, IEventType } from "../../../core/event";
import { IGuid } from "../../../core/guid/IGuid";
import { Inject } from "../../../core/ioc";
import { IRenderingScene } from "../../../engine/renderer/api/IRenderingScene";
import { createSetClientEntityInstanceCommand } from "../../../engine/system/client/entityInstance/set/SetClientEntityInstanceCommand";
import { MapGraphEdgeIndicatorEntity } from "../../debugging/model/MapGraphEdgeIndicatorEntity";
import { PositionIndicatorEntity } from "../../debugging/model/PositionIndicatorEntity";
import { getSystemMapGraph } from "../../systems/map/state/MapSystemState";
import {
    ZONE_LOADED_EVENT,
    ZoneLoadedEventData,
} from "../../zone/load/ZoneLoadedEvent";

/**
 * Event Name: ZoneLoadedEvent
 * Type: Event
 */
export class ZoneLoadedEventHandler implements IEventHandler {
    public type: IEventType = ZONE_LOADED_EVENT;
    constructor(
        private readonly _guid: IGuid = Inject(IGuid),
        private readonly _commandService: ICommandService = Inject(
            ICommandService
        ),
        private readonly _renderingScene: IRenderingScene = Inject(
            IRenderingScene
        )
    ) {}
    public handle({  }: ZoneLoadedEventData): void {
        this.createRandomTrees();
    }
    private showMapNodes() {
        const map = getSystemMapGraph();
        map.nodeList.map(
            node =>
                new PositionIndicatorEntity({
                    id: -1,
                    position: { currentPosition: node.position },
                    data: node,
                })
        );
        new MapGraphEdgeIndicatorEntity(map);
    }
    private createRandomTrees() {
        // TESTING:
        const someData = {
            id: "1e0b3688-ff19-4470-a898-92s20032sfc6",
            name: "Tree 001",
            position: { x: 25.0, y: 0.0, z: 1.0 },
            assetId: "f2f1d5f6-cc0d-4094-aecf-scripted",
            properties: {
                dense: true,
            },
        };
        const randomNumber = (min: number, max: number) => {
            if (min == max) {
                return min;
            }
            const random = Math.random();
            return random * (max - min) + min;
        };
        for (let index = 0; index < 0; index++) {
            const id = this._guid.guid();
            this._commandService.send(
                createSetClientEntityInstanceCommand({
                    clientEntityInstance: Object.assign({}, someData, {
                        id,
                        name: `Tree ${id}`,
                        position: {
                            x: randomNumber(-50, 50),
                            y: 0,
                            z: randomNumber(-50, 50),
                        },
                    }),
                })
            );
        }
    }
}
