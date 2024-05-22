import { FastifyReply, FastifyRequest } from 'fastify';
import {
	getEnergyStats,
	getEnergyValues,
	getTotalCustomers,
	getTotalEnergyCompensated,
	getTotalEnergyConsumption,
	getTotalInvoices,
} from './metrics.service';
import { EnergyRequest } from './metrics.schema';

export async function getTotalInvoicesHandler(
	_: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const data = await getTotalInvoices();

		return reply.status(200).send(data);
	} catch (error) {
		console.error(error);
		return reply.status(500).send({
			message: 'Something went wrong',
			error: error,
		});
	}
}

export async function getTotalCustomersHandler(
	_: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const data = await getTotalCustomers();

		return reply.status(200).send(data);
	} catch (error) {
		console.error(error);
		return reply.status(500).send({
			message: 'Something went wrong',
			error: error,
		});
	}
}

export async function getTotalEnergyConsumptionHandler(
	_: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const data = await getTotalEnergyConsumption();

		return reply.status(200).send(data);
	} catch (error) {
		console.error(error);
		return reply.status(500).send({
			message: 'Something went wrong',
			error: error,
		});
	}
}

export async function getTotalEnergyCompensatedHandler(
	_: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const data = await getTotalEnergyCompensated();

		return reply.status(200).send(data);
	} catch (error) {
		console.error(error);
		return reply.status(500).send({
			message: 'Something went wrong',
			error: error,
		});
	}
}

export async function getEnergyStatsHandler(
	request: FastifyRequest<{ Querystring: EnergyRequest }>,
	reply: FastifyReply
) {
	try {
		const { customerNumber } = request.query;
		const data = await getEnergyStats(customerNumber);

		return reply.status(200).send(data);
	} catch (error) {
		console.error(error);
		return reply.status(500).send({
			message: 'Something went wrong',
			error: error,
		});
	}
}

export async function getEnergyValuesHandler(
	request: FastifyRequest<{ Querystring: EnergyRequest }>,
	reply: FastifyReply
) {
	try {
		const { customerNumber } = request.query;
		const data = await getEnergyValues(customerNumber);

		return reply.status(200).send(data);
	} catch (error) {
		console.error(error);
		return reply.status(500).send({
			message: 'Something went wrong',
			error: error,
		});
	}
}
