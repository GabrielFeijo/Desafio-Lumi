import 'dotenv/config';
import buildApp from './app';

export async function main() {
	const app = await buildApp();

	try {
		const port = Number(process.env.PORT) || 3333;
		await app.listen({ port });
		console.log(`Server running on ${port}`);
	} catch (err) {
		process.exit(1);
	}
}

main();
