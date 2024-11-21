import {WeatherResponseDto} from "../dto/openweather/openweather-current-dto";
import {WeatherForecastDto} from "../dto/openweather/openweather-forecast-dto";

export interface IOpenWeatherProxy {
    getCurrentWeather(lat: string, long: string): Promise<WeatherResponseDto>;
    getForecast(lat: string, long: string): Promise<WeatherForecastDto>;
}