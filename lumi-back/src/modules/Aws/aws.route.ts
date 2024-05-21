import { FastifyInstance } from 'fastify';
import {
	deleteFileFromS3Handler,
	uploadFileToS3Handler,
} from './aws.controller';

async function awsRoutes(app: FastifyInstance) {
	app.post('/upload', {}, uploadFileToS3Handler);

	app.delete('/delete/:filename', {}, deleteFileFromS3Handler);
}

export default awsRoutes;
