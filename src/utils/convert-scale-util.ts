import {AbsoluteZeroEnum} from "../enums/absolute-zero-enum";

export function convertCelsius(degreesKelvin: number): string {
    return Math.round(degreesKelvin - AbsoluteZeroEnum.ABSOLUTE_ZERO) + '°C';
}