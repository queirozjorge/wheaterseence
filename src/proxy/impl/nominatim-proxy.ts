import {INomitatimProxy} from "../i-nomitatim-proxy";
import {LocationDataDto} from "../../dto/nominatim/nomitatim-dto";
import axios from "axios";
import {injectable} from "tsyringe";
import {Value} from "../../decorators/environment-variable-decorator";
import logger from "../../config/logger-config";

@injectable()
export class NominatimProxy implements INomitatimProxy {

    @Value('nominatim')
    private baseUrl: string;

    async getCoordinates(city: string, state: string): Promise<LocationDataDto> {
        const params = {
            format: "json",
            city: city,
            state: state
        }

        const headers = {
            'User-Agent': 'WeatherssenceApp/1.0 (weatherssence@email.com)',
            'Referer': 'https://weatherssence.com.br',
        }

        try {
            const districts = (await axios.get<Array<LocationDataDto>>(`${this.baseUrl}`, { params, headers })).data;
            const district = districts.find(city => city.addresstype === "city_district" || city.addresstype === "municipality");
            if(!district){
                throw new Error('Location not found');
            }
            return district;
        } catch (error) {
            logger.error(error);
            throw error;
        }
    }

}