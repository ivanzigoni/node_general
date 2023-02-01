const { env } = require("./config");
const { Client } = require('pg')
 

let client = new Client({
  host: env.POSTGRES_HOST,
  port: env.POSTGRES_PORT,
  user: env.POSTGRES_USERNAME,
  password: env.POSTGRES_PASSWORD,
})
.on("reload", () => {
	client = new Client({
		host: env.POSTGRES_HOST,
		port: env.POSTGRES_PORT,
		user: env.POSTGRES_USERNAME,
		password: env.POSTGRES_PASSWORD,
		database: "sample_database"
	});
	client.connect();
})

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
			client.emit("reload");
		}
	})
}


function setup() {
	// setup for recently made container
	connect();
	makeDatabase();
	console.log("database 'sample_database' created successfully");
}
setup();


