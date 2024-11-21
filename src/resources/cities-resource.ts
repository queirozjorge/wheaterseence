import {container, inject, injectable} from "tsyringe";
import {IbgeProxy} from "../proxy/impl/ibge-proxy";
import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {CityStateDto} from "../dto/ibge/city-state-dto";

@injectable()
export class CitiesResource {

    constructor(
        @inject(IbgeProxy) private ibgeService: IbgeProxy,
    ) {}

    async getCities(request: FastifyRequest, reply: FastifyReply): Promise<Array<CityStateDto>> {
        const locations: Array<CityStateDto> = await this.ibgeService.getCities();
        return reply.send(locations);
    }

}

export default function citiesRoutes(fastify: FastifyInstance) {
    const resource = container.resolve(CitiesResource);
    fastify.get('/cities', resource.getCities.bind(resource));
}
