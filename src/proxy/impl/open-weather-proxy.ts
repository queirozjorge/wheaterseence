import {IOpenWeatherProxy} from "../i-open-weather-proxy";
import axios from "axios";
import {WeatherResponseDto} from "../../dto/openweather/openweather-current-dto";
import {injectable} from "tsyringe";
import {Value} from "../../decorators/environment-variable-decorator";
import logger from "../../config/logger-config";
import {WeatherForecastDto} from "../../dto/openweather/openweather-forecast-dto";

@injectable()
export class OpenWeatherProxy implements IOpenWeatherProxy {

    @Value('openweather.url')
    private baseUrl: string;

    @Value('openweather.appid')
    private appId: string;

    async getCurrentWeather(lat: string, long: string): Promise<WeatherResponseDto> {

        const params = {
            lat: lat,
            lon: long,
            appid: this.appId
        }

        try {
            return (await axios.get<WeatherResponseDto>(`${this.baseUrl}/data/2.5/weather`, {params})).data;
        } catch (error) {
            logger.error(error);
            throw error;
        }

    }

    async getForecast(lat: string, long: string): Promise<WeatherForecastDto> {

        const params = {
            lat: lat,
            lon: long,
            appid: this.appId
        }

        try {
            return (await axios.get<WeatherForecastDto>(`${this.baseUrl}/data/2.5/forecast`, {params})).data;
        } catch (error) {
            logger.error(error);
            throw error;
        }

    }
}