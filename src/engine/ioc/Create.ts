import { Container, Provider, Scope } from "./typescript-ioc";

export const createSingletonService = (bind: Function, to: Object) =>
    Container.bind(bind)
        .to(to)
        .scope(Scope.Singleton);

export const createSingletonProviderService = (
    bind: Function,
    provider: Provider
) =>
    Container.bind(bind)
        .provider(provider)
        .scope(Scope.Singleton);

export const createSingletonServiceFactory = (
    bind: Function,
    provider: Function
) =>
    Container.bind(bind)
        .provider({ get: () => provider() })
        .scope(Scope.Singleton);

export const createService = (bind: Function, to: Object) =>
    Container.bind(bind).to(to);

export const createProviderService = (bind: Function, provider: Provider) =>
    Container.bind(bind).provider(provider);

export const Inject = <T>(bind: Function): T => Container.get<T>(bind);
