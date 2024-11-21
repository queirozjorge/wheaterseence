import {FastifyInstance} from "fastify";
import weatherRoutes from "./resources/weather-resource";
import citiesRoutes from "./resources/cities-resource";

export async function registerRoutes(fastify: FastifyInstance) {

    fastify.register(weatherRoutes);
    fastify.register(citiesRoutes);

}