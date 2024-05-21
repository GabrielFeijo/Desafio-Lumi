import { FastifyInstance, FastifyReply } from 'fastify';

export const GetHello = async (app: FastifyInstance) => {
	app.get('/', async (_, reply: FastifyReply) => {
		return reply.send({ message: 'Hello World!' });
	});
};
