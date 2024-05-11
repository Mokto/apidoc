import Database from 'libsql';
import { parseOpenAPI, type GlobalData } from './openapi';
import type { Operation, Webhook } from '$lib/models/operation';
import { env } from '$env/dynamic/private';

const DEFAULT_DB_LOCATION = 'openapi.db';

const getDb = () => {
	const dbLocation = env.LIBSQL_URL ? env.LIBSQL_URL : DEFAULT_DB_LOCATION;
	const parameters = env.LIBSQL_AUTH_TOKEN ? { authToken: env.LIBSQL_AUTH_TOKEN } : {};

	return new Database(dbLocation, parameters as never);
};

export const resetDatabase = () => {
	const db = getDb();
	db.exec('DROP TABLE IF EXISTS GlobalData');
	db.exec('DROP TABLE IF EXISTS Operations');
	db.exec('DROP TABLE IF EXISTS Webhooks');

	db.exec(`CREATE TABLE GlobalData ( data JSON NOT NULL ) RANDOM ROWID`);
	db.exec(
		`CREATE TABLE Operations ( operation_id TEXT NOT NULL, data JSON NOT NULL ) RANDOM ROWID`
	);
	db.exec(`CREATE TABLE Webhooks ( webhook_id TEXT NOT NULL, data JSON NOT NULL ) RANDOM ROWID`);

	return db;
};

export const prepareDatabase = async (jsonFile: string | object) => {
	const jsonFileData = typeof jsonFile === 'string' ? JSON.parse(jsonFile) : jsonFile;
	const data = await parseOpenAPI(jsonFileData);
	const countOperations = Object.keys(data.operations).length + Object.keys(data.webhooks).length;
	if (countOperations === 0) {
		return countOperations;
	}
	const db = resetDatabase();
	db.exec(
		`INSERT INTO GlobalData (data) VALUES ('${JSON.stringify(data.global).replace(/'/g, "''")}')`
	);

	Object.keys(data.operations).forEach((operationId) => {
		db.exec(
			`INSERT INTO Operations (operation_id, data) VALUES ('${operationId}', '${JSON.stringify(data.operations[operationId]).replace(/'/g, "''")}')`
		);
	});

	Object.keys(data.webhooks).forEach((webhookId) => {
		db.exec(
			`INSERT INTO Webhooks (webhook_id, data) VALUES ('${webhookId}', '${JSON.stringify(data.webhooks[webhookId]).replace(/'/g, "''")}')`
		);
	});

	return countOperations;
};
export const getGlobalData = async () => {
	const db = getDb();
	const result = db.prepare(`SELECT data FROM GlobalData `).get() as { data: string };
	if (!result) {
		return null;
	}

	return JSON.parse(result.data) as GlobalData;
};

export const getOperation = async (operationId: string) => {
	const db = getDb();
	const result = db
		.prepare(`SELECT data FROM Operations WHERE operation_id = '${operationId}'`)
		.get() as { data: string };
	if (!result) {
		return null;
	}
	return JSON.parse(result.data) as Operation;
};

export const getWebhook = async (webhookId: string) => {
	const db = getDb();
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
