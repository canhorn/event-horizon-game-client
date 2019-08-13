import { useAccountService } from "./account/UseAccountService";
import { useActionService } from "./action/UseActionService";
import { useEntityService } from "./entity/UseEntityService";
import { usePlayerService } from "./player/UsePlayerService";
import { useSceneService } from "./scenes/UseSceneService";
import { useConnectionService } from "./server/UseConnectionService";
import { useEntityModuleService } from "./systems/entityModule/UseEntityModuleService";
import { useHeightService } from "./systems/height/UseHeightService";
import { useSkillService } from "./systems/skill/UseSkillService";
import { useTestingService } from "./testing/UseTestingService";
import { useZoneService } from "./zone/UseZoneService";

export const useClientService = () => {
    useAccountService();
    useZoneService();
    useSceneService();
    useActionService();
    useHeightService();
    useConnectionService();
    usePlayerService();
    useEntityService();
    useEntityModuleService();
    useSkillService();
    useTestingService();
};
