import fs from 'fs';
import { prepareDatabase } from '$lib/utils/db';

console.log('Running init script...');
const data = fs.readFileSync('./openapi.json', 'utf-8');
prepareDatabase(data).then(() => {
	console.log('Done.');
});
