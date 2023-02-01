const { env } = require("./config");
const { Client } = require('pg')
 

let client = new Client({
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  user: env.POSTGRES_USERNAME,
  password: env.POSTGRES_PASSWORD,
});

function connect() {
	client.connect((err) => {
		if (err) {
			console.log(err);
		}
	});
}

function makeDatabase() {
	client.query({
		text: "CREATE DATABASE sample_database;",
	}, (err, res) => {
		if (err) {
			console.log(err);
		} else {

			client.end();

			client = new Client({
				host: env.POSTGRES_HOST,
				port: env.POSTGRES_PORT,
				user: env.POSTGRES_USERNAME,
				password: env.POSTGRES_PASSWORD,
				database: "sample_database"
			});

			connect();
		}
	})
}


function setup() {
	// setup for recently made container
	connect();
	makeDatabase();

	console.log(client.database, "db");
}

setup();


