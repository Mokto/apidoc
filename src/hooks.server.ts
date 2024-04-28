import fs from 'fs';
import Database from 'libsql';
import { parseOpenAPI } from '$lib/utils/openapi';

console.log('Running init script...');
const dbLocation = 'openapi.db';
if (fs.existsSync(dbLocation)) {
	fs.unlinkSync(dbLocation);
}
const db = new Database(dbLocation);

const data = fs.readFileSync('./openapi.json', 'utf-8');
parseOpenAPI(JSON.parse(data)).then((data) => {
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
	console.log('Done.');
});

// // FULL TEXT SEARCH
// // db.exec('CREATE VIRTUAL TABLE email USING fts5(sender, title, body, tokenize="trigram")');
// // db.exec(
// //     `INSERT INTO email (sender, title, body) VALUES ('tmanoilio oi oi ioo', 'Hello', 'Hello, how are you?')`
// // );
// // db.exec(
// //     `INSERT INTO email (sender, title, body) VALUES ('oie oi oi oi aaaio', 'yo', 'come on, how are you?')`
// // );
// // console.log(db.prepare('SELECT * FROM email WHERE email MATCH \'"ioo" * \' ORDER BY rank').all());
