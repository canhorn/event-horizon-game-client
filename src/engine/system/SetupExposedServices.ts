import { parse, ParsedQuery } from "query-string";
import { IEventService } from "../../core/event";
import { Container } from '../../core/ioc/model/Container';

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
