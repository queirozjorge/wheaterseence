import { Expose } from 'class-transformer';

export class CityIbgeDto {
    @Expose({ name: 'distrito-id' })
    public districtId: number;

    @Expose({ name: 'distrito-nome' })
    public districtName: string;

    @Expose({ name: 'municipio-id' })
    public municipalityId: number;

    @Expose({ name: 'municipio-nome' })
    public municipalityName: string;

    @Expose({ name: 'microrregiao-id' })
    public microregionId: number;

    @Expose({ name: 'microrregiao-nome' })
    public microregionName: string;

    @Expose({ name: 'mesorregiao-id' })
    public mesoregionId: number;

    @Expose({ name: 'mesorregiao-nome' })
    public mesoregionName: string;

    @Expose({ name: 'regiao-imediata-id' })
    public immediateRegionId: number;

    @Expose({ name: 'regiao-imediata-nome' })
    public immediateRegionName: string;

    @Expose({ name: 'regiao-intermediaria-id' })
    public intermediateRegionId: number;

    @Expose({ name: 'regiao-intermediaria-nome' })
    public intermediateRegionName: string;

    @Expose({ name: 'UF-id' })
    public ufId: number;

    @Expose({ name: 'UF-sigla' })
    public ufAbbreviation: string;

    @Expose({ name: 'UF-nome' })
    public ufName: string;

    @Expose({ name: 'regiao-id' })
    public regionId: number;

    @Expose({ name: 'regiao-sigla' })
    public regionAbbreviation: string;

    @Expose({ name: 'regiao-nome' })
    public regionName: string;
}