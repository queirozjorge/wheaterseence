export class WeatherResponseDto {
    public coord: CoordDto;
    public weather: Array<WeatherDto>;
    public base: string;
    public main: MainDto;
    public visibility: number;
    public wind: WindDto;
    public clouds: CloudsDto;
    public dt: number;
    public sys: SysDto;
    public timezone: number;
    public id: number;
    public name: string;
    public cod: number;
}

export class CoordDto {
    public lon: number;
    public lat: number;
}

export class WeatherDto {
    public id: number;
    public main: string;
    public description: string;
    public icon: string;
}

export class MainDto {
    public temp: number;
    public feels_like: number;
    public temp_min: number;
    public temp_max: number;
    public pressure: number;
    public humidity: number;
    public seaLevel: number;
    public grndLevel: number;
}

export class WindDto {
    public speed: number;
    public deg: number;
    public gust: number;
}

export class CloudsDto {
    public all: number;
}

export class SysDto {
    public type: number;
    public id: number;
    public country: string;
    public sunrise: number;
    public sunset: number;
}