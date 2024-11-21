import {LocationDataDto} from "../dto/nominatim/nomitatim-dto";

export interface INomitatimProxy {
    getCoordinates(city: string, state: string): Promise<LocationDataDto>;
}