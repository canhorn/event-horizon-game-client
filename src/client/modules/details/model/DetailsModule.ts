import objectMerge from "../../../../core/object/ObjectMerge";
import { IEventService } from "../../../../engine/event/IEventService";
import { Inject } from "../../../../engine/ioc/Create";
import { LifeCycleModule } from "../../../../engine/module/model/LifeCycleModule";
import { CLIENT_ACTION_ENTITY_CHANGED_EVENT } from "../../../action/api/ClientActions";
import { IObjectEntity } from "../../../entity/api/IObjectEntity";
import { IObjectEntityDetails } from "../../../entity/api/IObjectEntityDetails";
import { createEntityChangedSuccessfullyEvent } from "../../../entity/changedSuccessful/EntityChangedSuccessfullyEvent";
import { IDetailsModule } from "../api/IDetailsModule";

export class DetailsModule extends LifeCycleModule implements IDetailsModule {
    constructor(
        private readonly _entity: IObjectEntity,
        private readonly _eventService: IEventService = Inject(IEventService)
    ) {
        super();
        this._eventService.addEventListener(
            CLIENT_ACTION_ENTITY_CHANGED_EVENT,
            this.onChanged,
            this
        );
    }

    public update(): void {}
    public dispose(): void {
        this._eventService.removeEventListener(
            CLIENT_ACTION_ENTITY_CHANGED_EVENT,
            this.onChanged,
            this
        );
    }

    private onChanged({ details }: OnDetailsChangedData): void {
        if (!this._entity.equals(details.id)) {
            return;
        }
        objectMerge(this._entity.details, details);
        this._eventService.publish(
            createEntityChangedSuccessfullyEvent({ entityId: details.id })
        );
    }
}

interface OnDetailsChangedData {
    details: IObjectEntityDetails;
}
