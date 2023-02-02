const { bootstrap } = require("../src/setup");

function main() {
  const client = bootstrap();

  client.query(`
    CREATE TABLE IF NOT EXISTS people (
      id int PRIMARY KEY,
      name varchar NOT NULL,
      age int NOT NULL,
      email varchar NOT NULL
    );
  `, null, (err, res) => {
    if (err) {
      console.log(err);
    } else {
      console.log(res.command + "was a success");
    }
  })
}

main();