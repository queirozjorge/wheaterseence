import {IWeatherForecastService} from "../i-weather-forecast-service";
import {OpenWeatherProxy} from "../../proxy/impl/open-weather-proxy";
import {NominatimProxy} from "../../proxy/impl/nominatim-proxy";
import {CurrentWeatherDto} from "../../dto/openweather/current-weather-dto";
import {inject, injectable} from "tsyringe";
import logger from "../../config/logger-config";
import {DailyForecastDto, WeatherForecastDto} from "../../dto/openweather/weather-forecast-dto";
import {ForecastDto} from "../../dto/openweather/openweather-forecast-dto";
import {addDays, parse} from "date-fns";
import {convertCelsius} from "../../utils/convert-scale-util";

@injectable()
export class WeatherForecastService implements IWeatherForecastService {

    constructor(
        @inject(OpenWeatherProxy) private openWeatherProxy: OpenWeatherProxy,
        @inject(NominatimProxy) private nominatimProxy: NominatimProxy) {
    }

    async getCurrentWeather(city: string, state: string): Promise<CurrentWeatherDto> {
        logger.info(`Service get current weather started with params ${city}, ${state}`);
        try {
            const coordinates = await this.nominatimProxy.getCoordinates(city, state);
            const actualWeather = await this.openWeatherProxy.getCurrentWeather(coordinates.lat, coordinates.lon);
            return {
                actualTemp: convertCelsius(actualWeather.main.temp),
                feelsLike: convertCelsius(actualWeather.main.feels_like),
                sky: actualWeather.weather.find(weather => weather.main)?.main ?? 'none',
                wind: Math.round(actualWeather.wind.speed * 3.6) + ' km/h',
                humidity: actualWeather.main.humidity + '%'
            }
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    async getForecast(city: string, state: string): Promise<WeatherForecastDto> {
        logger.info(`Service get forecast started with params ${city}, ${state}`);
        try {
            const coordinates = await this.nominatimProxy.getCoordinates(city, state);
            const openWeatherForecast = await this.openWeatherProxy.getForecast(coordinates.lat, coordinates.lon);
            return {
                city: openWeatherForecast.city.name,
                dailyForecast: this.getDailyForecast(openWeatherForecast.list),
                weatherForecastByTimeSequence: openWeatherForecast.list.map(forecast => {
                    return {
                        date: forecast.dt_txt,
                        temp: convertCelsius(forecast.main.temp),
                        feelsLike: convertCelsius(forecast.main.feels_like),
                        sky: forecast.weather.find(weather => weather.main)?.main ?? 'none',
                        wind: Math.round(forecast.wind.speed * 3.6) + ' km/h',
                        rainProbability: Math.round(forecast.pop * 100) + '%',
                        humidity: forecast.main.humidity + '%'
                    };
                })
            }
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

    private getDailyForecast(list: Array<ForecastDto>): Array<DailyForecastDto> {
        const forecasts = new Array<DailyForecastDto>;
        const actualDate = new Date();
        Array.from({length: 6}).forEach((_, iter) => {
            const dayForecast = new DailyForecastDto();
            const listFiltered: Array<ForecastDto> =
                list.filter(forecast => addDays(actualDate, iter).getDay() === parse(forecast.dt_txt, "yyyy-MM-dd HH:mm:ss", new Date()).getDay())
            dayForecast.date = listFiltered[0].dt_txt;
            dayForecast.maxDay =
                convertCelsius(listFiltered.reduce(
                    (max, forecast) => Math.max(max, forecast.main.temp),
                    -Infinity
                ));
            dayForecast.minDay =
                convertCelsius(listFiltered.reduce(
                    (min, forecast) => Math.min(min, forecast.main.temp),
                    Infinity
                ));
            dayForecast.humidityMax =
                listFiltered.reduce(
                    (max, forecast) => Math.max(max, forecast.main.humidity),
                    -Infinity
                ) + '%';
            dayForecast.humidityMin =
                listFiltered.reduce(
                    (min, forecast) => Math.min(min, forecast.main.humidity),
                    Infinity
                ) + '%';
            forecasts.push(dayForecast);
        });
        return forecasts;
    }

}