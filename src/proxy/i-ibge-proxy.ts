import {CityStateDto} from "../dto/ibge/city-state-dto";

export interface IIbgeProxy {
    getCities(): Promise<Array<CityStateDto>>;
}