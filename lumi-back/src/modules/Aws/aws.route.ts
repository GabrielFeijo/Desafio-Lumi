import { FastifyInstance } from 'fastify';
import {
	deleteFileFromS3Handler,
	uploadFileToS3Handler,
} from './aws.controller';
import { $ref } from './aws.schema';

async function awsRoutes(app: FastifyInstance) {
	app.post(
		'/upload',
		{
			schema: {
				tags: ['AWS'],
				summary: 'Upload file to S3',
				consumes: ['multipart/form-data'],
				response: {
					201: $ref('uploadResponseSchema'),
				},
			},
		},
		uploadFileToS3Handler
	);

	app.delete(
		'/delete/:filename',
		{
			schema: {
				tags: ['AWS'],
				summary: 'Delete file from S3',
			},
		},
		deleteFileFromS3Handler
	);
}

export default awsRoutes;
