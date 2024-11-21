import {IIbgeProxy} from "../i-ibge-proxy";
import axios from "axios";
import {CityIbgeDto} from "../../dto/ibge/cities-ibge-dto";
import {plainToInstance} from "class-transformer";
import {CityStateDto} from "../../dto/ibge/city-state-dto";
import {injectable} from "tsyringe";
import {Value} from "../../decorators/environment-variable-decorator";
import logger from "../../config/logger-config";

@injectable()
export class IbgeProxy implements IIbgeProxy {

    @Value('ibge.cities')
    private baseUrl: string;

    async getCities(): Promise<Array<CityStateDto>> {

        const params = {
            orderBy: 'nome',
            view: 'nivelado'
        }

        try {
            const cities = (await axios.get<Array<CityIbgeDto>>(`${this.baseUrl}`, {params})).data;
            return cities.map(city => {
                const cityIbge = plainToInstance(CityIbgeDto, city);
                return {
                    city: cityIbge.municipalityName,
                    state: cityIbge.ufAbbreviation
                }
            });

        } catch (error) {
            logger.error(error);
            throw error;
        }

    }

}