import fs from 'fs';
import Database from 'libsql';
import { parseOpenAPI, type GlobalData } from './openapi';
import type { OAS31Document } from '../../oas/packages/oas/src/types';
import type { Operation } from '$lib/models/operation';

const dbLocation = 'test.db';

export const prepareDb = async (openapiDefinition: OAS31Document) => {
	const data = await parseOpenAPI(openapiDefinition);
	// const db = new Database(':memory:');
	fs.unlinkSync(dbLocation);
	const db = new Database(dbLocation);

	db.exec(`CREATE TABLE GlobalData ( data JSON NOT NULL ) RANDOM ROWID`);

	db.exec(`INSERT INTO GlobalData (data) VALUES ('${JSON.stringify(data).replace(/'/g, "''")}')`);

	// const result = db.prepare(`SELECT data FROM GlobalData `).get();
	// console.log(JSON.parse(result.data));
};

export const getGlobalData = async () => {
	const dbLocation = 'openapi.db';
	const db = new Database(dbLocation);
	const result = db.prepare(`SELECT data FROM GlobalData `).get() as { data: string };
	return JSON.parse(result.data) as GlobalData;
};

export const getOperation = async (operationId: string) => {
	const dbLocation = 'openapi.db';
	const db = new Database(dbLocation);
	const result = db
		.prepare(`SELECT data FROM Operations WHERE operation_id = '${operationId}'`)
		.get() as { data: string };
	return JSON.parse(result.data) as Operation;
};
