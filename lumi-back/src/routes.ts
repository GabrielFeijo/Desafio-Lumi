import { FastifyInstance } from 'fastify';
import { GetHello } from './routes/get-hello';

export const routes = async (app: FastifyInstance) => {
	app.register(GetHello);
};
