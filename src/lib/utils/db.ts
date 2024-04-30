import Database from 'libsql';
import { parseOpenAPI, type GlobalData } from './openapi';
import type { Operation } from '$lib/models/operation';
import fs from 'fs';
import type { Webhook } from '../../oas/packages/oas/src/operation';

const dbLocation = 'openapi.db';

export const prepareDatabase = async (jsonFile: string) => {
	if (fs.existsSync(dbLocation)) {
		fs.unlinkSync(dbLocation);
	}
	const db = new Database(dbLocation);
	const data = await parseOpenAPI(JSON.parse(jsonFile));
	db.exec(`CREATE TABLE GlobalData ( data JSON NOT NULL ) RANDOM ROWID`);
	db.exec(
		`INSERT INTO GlobalData (data) VALUES ('${JSON.stringify(data.global).replace(/'/g, "''")}')`
	);

	db.exec(
		`CREATE TABLE Operations ( operation_id TEXT NOT NULL, data JSON NOT NULL ) RANDOM ROWID`
	);
	Object.keys(data.operations).forEach((operationId) => {
		db.exec(
			`INSERT INTO Operations (operation_id, data) VALUES ('${operationId}', '${JSON.stringify(data.operations[operationId]).replace(/'/g, "''")}')`
		);
	});

	console.log(data.webhooks);

	db.exec(`CREATE TABLE Webhooks ( webhook_id TEXT NOT NULL, data JSON NOT NULL ) RANDOM ROWID`);
	Object.keys(data.webhooks).forEach((webhookId) => {
		db.exec(
			`INSERT INTO Webhooks (webhook_id, data) VALUES ('${webhookId}', '${JSON.stringify(data.webhooks[webhookId]).replace(/'/g, "''")}')`
		);
	});
};
export const getGlobalData = async () => {
	const db = new Database(dbLocation);
	const result = db.prepare(`SELECT data FROM GlobalData `).get() as { data: string };
	return JSON.parse(result.data) as GlobalData;
};

export const getOperation = async (operationId: string) => {
	const db = new Database(dbLocation);
	const result = db
		.prepare(`SELECT data FROM Operations WHERE operation_id = '${operationId}'`)
		.get() as { data: string };
	return JSON.parse(result.data) as Operation;
};

export const getWebhook = async (webhookId: string) => {
	const db = new Database(dbLocation);
	const result = db
		.prepare(`SELECT data FROM Webhooks WHERE webhook_id = '${webhookId}'`)
		.get() as { data: string };
	return JSON.parse(result.data) as Webhook;
};

// // FULL TEXT SEARCH
// // db.exec('CREATE VIRTUAL TABLE email USING fts5(sender, title, body, tokenize="trigram")');
// // db.exec(
// //     `INSERT INTO email (sender, title, body) VALUES ('tmanoilio oi oi ioo', 'Hello', 'Hello, how are you?')`
// // );
// // db.exec(
// //     `INSERT INTO email (sender, title, body) VALUES ('oie oi oi oi aaaio', 'yo', 'come on, how are you?')`
// // );
// // console.log(db.prepare('SELECT * FROM email WHERE email MATCH \'"ioo" * \' ORDER BY rank').all());
