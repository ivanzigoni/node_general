const { bootstrap } = require("./src/setup");

async function main() {
  const client = bootstrap();

  client.query(`
    CREATE TABLE [IF NOT EXISTS] people (
      id int NOT NULL PRIMARY KEY,
      name varchar NOT NULL,
      age int NOT NULL
  );
  `, null, (err, res) => {
    if (err) {
      console.log(err, "err")
    } else {
      console.log("did it mate")
    }
  })

}

main();