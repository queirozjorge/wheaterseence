export class WeatherForecastDto {
    public city: string;
    public dailyForecast: Array<DailyForecastDto>;
    public weatherForecastByTimeSequence: Array<WeatherForecastByDateDto>;
}

export class WeatherForecastByDateDto {
    public date: string;
    public temp: string;
    public feelsLike: string;
    public sky: string;
    public wind: string;
    public rainProbability: string;
    public humidity: string;
}

export class DailyForecastDto {
    public date: string;
    public maxDay: string;
    public minDay: string;
    public humidityMax: string;
    public humidityMin: string;
}