import Fastify from 'fastify';
import cors from '@fastify/cors'
import {registerRoutes} from "./register-routes";
import {transformYamlToEnv} from "./config/application-yml-config";
const dotenv = require('dotenv-yaml');

const app = Fastify({logger: true});

const start = async () => {
    try {
        const { parsed } = await dotenv.config({ path: './application.yml' });
        await transformYamlToEnv(parsed);
        await registerRoutes(app);
        await app.register(cors);
        await app.listen({port: process.env.server_port ? Number.parseInt(process.env.server_port) : 8080});
    } catch (error) {
        process.exit(1);
    }
}

start();