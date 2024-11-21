export interface IWeatherForecastService {

    getCurrentWeather(city: string, state: string): Promise<any>;

}