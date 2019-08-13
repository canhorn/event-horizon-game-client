import { Dictionary } from "../../../core/collection/Dictionary";
import { IDictionary } from "../../../core/collection/IDictionary";
import { ErrorCode } from "../../assert/Assert";
import { Entity } from "../../entity/model/Entity";
import { IEventService } from "../../event/IEventService";
import { Inject } from "../../ioc/Create";
import { IDisposable } from "../../lifecycle/IDisposable";
import { IRegisterDisposable } from "../../lifecycle/register/IRegisterDisposable";
import { IRegisterInitializable } from "../../lifecycle/register/IRegisterInitializable";
import { createLogger } from "../../logger/InjectLoggerDecorator";
import { ILogger } from "../../logger/LoggerFactory";
import { IRenderingScene } from "../../renderer/api/IRenderingScene";
import {
    IParticleLifecycleService,
    IParticleService,
} from "../IParticleService";
import { IParticleSettings } from "../model/IParticleSettings";
import { ParticleTemplate } from "../model/ParticleTemplate";
import { IParticleModule } from "../module/IParticleModule";
import { ParticleModule } from "../module/ParticleModule";
import { createParticleSystem } from "./ParticleSystem";

export class TemplateParticleService extends Entity
    implements IParticleService, IParticleLifecycleService, IDisposable {
    private _particleModuleList: IDictionary<
        number,
        IParticleModule
    > = new Dictionary();
    private _particleTemplateList: IDictionary<
        string,
        ParticleTemplate
    > = new Dictionary();

    constructor(
        private readonly _logger: ILogger = createLogger("ParticleService"),
        private readonly _renderingScene: IRenderingScene = Inject(
            IRenderingScene
        ),
        private readonly _registerDisposable: IRegisterDisposable = Inject(
            IRegisterDisposable
        ),
        private readonly _registerInitializable: IRegisterInitializable = Inject(
            IRegisterInitializable
        ),
        private readonly _eventService: IEventService = Inject(IEventService)
    ) {
        super();
        this._registerInitializable.register(this);
        this._registerDisposable.register(this);
    }
    public initialize(): void {}
    public postInitialize(): void {}
    public dispose(): void {
        this._particleModuleList.forEach((key, value) =>
            value.particleSystem.dispose()
        );
        this._particleModuleList.clear();
        this._particleTemplateList.clear();
    }

    public addTemplate(template: ParticleTemplate): void {
        this._particleTemplateList.setValue(template.id, template);
    }

    public createFromTemplate(
        id: number,
        templateId: string,
        settings: IParticleSettings
    ): void {
        const template = this._particleTemplateList.getValue(templateId);
        if (!template) {
            this._logger.error("Template not found", { id, templateId, settings });
            throw new ErrorCode("Template not found", "template_not_found");
        }
        this.createModuleBySettings(settings, template.defaultSettings, id);
    }

    public startModule(index: number): void {
        const particleModule = this._particleModuleList.getValue(index);
        if (!particleModule) {
            this._logger.error("Particle does not exist");
            return;
        }
        particleModule.start();
    }
    public stopModule(index: number): void {
        const particleModule = this._particleModuleList.getValue(index);
        if (!particleModule) {
            this._logger.error("Particle does not exist");
            return;
        }
        particleModule.stop();
    }
    public disposeModule(index: number): void {
        const particleModule = this._particleModuleList.getValue(index);
        if (!particleModule) {
            this._logger.error("Particle does not exist");
            return;
        }
        particleModule.dispose();
    }
    public updateModule(index: number, settings: IParticleSettings): void {
        const particleModule = this._particleModuleList.getValue(index);
        if (!particleModule) {
            this._logger.error("Particle does not exist");
            return;
        }
        particleModule.update(settings);
    }

    private createModuleBySettings(
        settings: IParticleSettings,
        templateSettings: IParticleSettings,
        id: number
    ): number {
        const particleModule = new ParticleModule(
            id,
            settings,
            createParticleSystem(
                templateSettings,
                settings,
                this._renderingScene.scene
            )
        );

        this._particleModuleList.setValue(particleModule.id, particleModule);

        return particleModule.id;
    }
}
