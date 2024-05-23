import {
	DeleteObjectCommand,
	PutObjectCommand,
	S3Client,
} from '@aws-sdk/client-s3';

const s3 = new S3Client({
	region: process.env.AWS_REGION,
	credentials: {
		accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
		secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
	},
});

export async function uploadFile({
	dataBuffer,
	filename,
	mimetype,
}: {
	dataBuffer: Buffer;
	filename: string;
	mimetype: string;
}) {
	const putObjectCommand = new PutObjectCommand({
		Bucket: process.env.AWS_BUCKET_NAME || '',
		Key: filename,
		Body: dataBuffer,
		ACL: 'public-read',
		ContentDisposition: 'inline',
		ContentType: mimetype,
	});

	try {
		await s3.send(putObjectCommand);
		const objectUrl = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${filename}`;
		return objectUrl;
	} catch (error) {
		console.error('Error uploading file to S3:', error);
		throw new Error('Failed to upload file to S3');
	}
}

export async function deleteFile(filename: string) {
	const deleteObjectCommand = new DeleteObjectCommand({
		Bucket: process.env.AWS_BUCKET_NAME || '',
		Key: filename,
	});

	try {
		await s3.send(deleteObjectCommand);
	} catch (error) {
		console.error('Error deleting file from S3:', error);
		throw new Error('Failed to delete file from S3');
	}
}
