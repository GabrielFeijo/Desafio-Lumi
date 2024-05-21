import { Readable } from 'stream';

export const getBufferFromStream = async (
	stream: Readable
): Promise<Buffer> => {
	const chunks: Uint8Array[] = [];
	for await (const chunk of stream) {
		chunks.push(chunk);
	}
	return Buffer.concat(chunks);
};
