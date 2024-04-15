import fs from 'fs';
import { prepareDatabase, resetDatabase } from '$lib/utils/db';

console.log('Running init script...');
const exists = fs.existsSync('./openapi.json');
if (exists) {
	const data = fs.readFileSync('./openapi.json', 'utf-8');
	prepareDatabase(data).then(() => {
		console.log('Done.');
	});
} else {
	console.warn('openapi.json not found.');
	resetDatabase();
}
