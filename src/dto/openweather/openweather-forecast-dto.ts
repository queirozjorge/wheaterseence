export class MainDto {
    public temp: number;
    public feels_like: number;
    public temp_min: number;
    public temp_max: number;
    public pressure: number;
    public sea_level: number;
    public grnd_level: number;
    public humidity: number;
    public temp_kf: number;
}

export class WeatherDto {
    public id: number;
    public main: string;
    public description: string;
    public icon: string;
}

export class CloudsDto {
    public all: number;
}

export class WindDto {
    public speed: number;
    public deg: number;
    public gust: number;
}

export class SysDto {
    public pod: string;
}

export class ForecastDto {
    public dt: number;
    public main: MainDto;
    public weather: Array<WeatherDto>;
    public clouds: CloudsDto;
    public wind: WindDto;
    public visibility: number;
    public pop: number;
    public sys: SysDto;
    public dt_txt: string;
}

export class CoordDto {
    public lat: number;
    public lon: number;
}

export class CityDto {
    public id: number;
    public name: string;
    public coord: CoordDto;
    public country: string;
    public population: number;
    public timezone: number;
    public sunrise: number;
    public sunset: number;
}

export class WeatherForecastDto {
    public cod: string;
    public message: number;
    public cnt: number;
    public list: Array<ForecastDto>;
    public city: CityDto;
}
