import "reflect-metadata";
import {FastifyInstance, FastifyReply, FastifyRequest} from "fastify";
import {WeatherForecastService} from "../services/impl/weather-forecast-service";
import {CurrentWeatherDto} from "../dto/openweather/current-weather-dto";
import {container, inject, injectable} from "tsyringe";
import {WeatherForecastDto} from "../dto/openweather/weather-forecast-dto";

@injectable()
export class WeatherResource {

    constructor(
        @inject(WeatherForecastService) private weatherForecastService: WeatherForecastService
    ) {}

    async getWeather(request: FastifyRequest, reply: FastifyReply): Promise<CurrentWeatherDto | WeatherForecastDto> {
        const { city, state } = request.query as { city: string; state: string };
        const { path } =  request.params as { path: string };
        let response;
        switch (path) {
            case 'forecast':
                response = await this.weatherForecastService.getForecast(city, state);
                break;
            case 'current-weather':
                response = await this.weatherForecastService.getCurrentWeather(city, state);
                break;
            default:
                return reply.code(400).send({ message: 'Path does not exists', timestamp: new Date() });
        }
        return reply.send(response);
    }
}

export default function weatherRoutes(fastify: FastifyInstance) {
    const resource = container.resolve(WeatherResource);
    fastify.get('/:path', {
        schema: {
            querystring: {
                type: 'object',
                properties: {
                    city: {type: 'string'},
                    state: {type: 'string'},
                },
                required: ['city', 'state']
            }
        }
    }, resource.getWeather.bind(resource));
}