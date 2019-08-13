import { parse, ParsedQuery } from "query-string";
import { IEventService } from "../event/IEventService";
import { Container } from "../ioc/typescript-ioc";

export const setupExposedServices = () => {
    const queryParams: IExposedQueryParams = parse(
        window.location.search
    ) as IExposedQueryParams;
    if (typeof queryParams.expose !== "undefined") {
        (window as any).ehz = (window as any).ehz || {};
        (window as any).ehz.eventService = Container.get(IEventService);
    }
};

interface IExposedQueryParams extends ParsedQuery {
    expose: string;
}
