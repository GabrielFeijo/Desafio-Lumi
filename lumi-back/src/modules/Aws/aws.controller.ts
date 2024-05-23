import { FastifyReply, FastifyRequest } from 'fastify';
import { deleteFile, uploadFile } from './aws.service';
import { ParamsSchema } from './aws.schema';

export async function uploadFileToS3Handler(
	request: FastifyRequest,
	reply: FastifyReply
) {
	try {
		const part = await request.file();

		if (!part) {
			return reply.status(400).send({
				message: 'No file uploaded',
			});
		}

		if (part.file) {
			const buffers = [];
			for await (const chunk of part.file) {
				buffers.push(chunk);
			}

			const url = await uploadFile(Buffer.concat(buffers), part.filename);
			return reply.status(200).send(url);
		}
	} catch (error) {
		console.error(error);
		return reply.status(500).send({
			message: 'Something went wrong',
			error: error,
		});
	}
}

export async function deleteFileFromS3Handler(
	request: FastifyRequest<{ Params: ParamsSchema }>,
	reply: FastifyReply
) {
	try {
		const { filename } = request.params;
		await deleteFile(filename);
		return reply.status(200).send();
	} catch (error) {
		console.error(error);
		return reply.status(500).send({
			message: 'Something went wrong',
			error: error,
		});
	}
}
