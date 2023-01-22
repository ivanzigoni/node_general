const http = require('node:http');

const postData = JSON.stringify({
    path: '/home/ivan/Documents/testes/node_general/files',
    filename: 'teste1',
    lines: 1000,
    getFile: true
});

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/teste1',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData),
  },
};

const req = http.request(options, (res) => {
//   res.setEncoding('utf8');
  let data = "";

  res.on('data', (chunk) => {
    data += chunk.toString();
  });

  res.on('end', () => {
    console.log("end")
    console.log(data);
  });

});

req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});

// Write data to request body
req.write(postData);
req.end();