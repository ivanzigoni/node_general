require("dotenv").config();
const { env } = require("../config");
const { Client } = require('pg')


// for some reason chaining the docker script and this script without a delay closes the connection before it is suposed to
// lol
function wait() {
	const startTime = new Date().getTime();
	while (new Date().getTime() - startTime <= 2000) {
		process.stdout.write("waiting " + `${new Date().getTime() - startTime}\r`);
	}
}

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
	
	connect();
})

function connect() {
	client.connect((err) => {
		if (err) {
      console.log("onConnect")
			console.log(err);
		} else {
      console.log("connected successfully")
    }
	});
}

function makeDatabase() {
	return client.query({
		text: "CREATE DATABASE sample_database;",
	}, (err, res) => {
		if (err) {
      console.log("onMakeDatabase")
			console.log(err);
		} else {
      console.log("database created, will reload connection")
			client.emit("reload");
		}
	})
}


function setup() {
	// setup for recently made container
	connect();
	makeDatabase();
}

function bootstrap() {
	connect();
	return client;
}

if (process.argv.includes("--execute-setup")) {
	wait();
	setup();
}

module.exports = { setup, bootstrap }; 


