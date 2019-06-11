// let request = require('request')
// let cheerio = require('cheerio')
// // const axios = require ('axios')
// 
// //
// //Load HTTP module
// const http = require("http");
// const hostname = '127.0.0.1';
// const port = 3001;
// 
// //Create HTTP server and listen on port 3000 for requests
// const server = http.createServer((req, res) => {
//   // res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
//   res.setHeader('Content-Type', 'application/json');
//   res.end(JSON.stringify({a: 'b'}));
// 
//   // if(req.url.indexOf('scrape_url') > 0) {
// 
// 	// 	var body = "";
//   //   req.on('data', function(chunk) {
//   //     body += chunk;
//   //   });
//   //   req.on('end', function() {
//   //     console.log(body);
// 
//   //     // debugger
//   //     console.log("Body: ", body)
//   //     var url = JSON.parse(body).url
// 
//   //     request(url, function (error, response, body) { if (error) {
//   //         console.log(error);
//   //         return
//   //       }
//   //       var $ = cheerio.load(body);
//   //       var title = $("title").text();
//   //       // console.log(title)
// 
//   //       res.statusCode = 200;
//   //       // res.setHeader('Content-Type', 'application/json');
//   //       // res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
//   //       res.setHeader("Content-Type", "application/json");
//   //       res.setHeader("Access-Control-Allow-Origin", "*");
//   //       // res.setHeader('Content-Type', 'application/json');
//   //       res.end(JSON.stringify({title: title}));
//   //       // res.end({title: title});
//   //     });
//   //   });
//   // } else {
//   //   //Set the response HTTP header with HTTP status and Content type
//   //   console.log('Hello World Log')
//   //   res.statusCode = 200;
//   //   res.setHeader('Content-Type', 'text/plain');
//   //   res.end('Hello World\n');
//   // }
// });
// 
// //listen for request on port 3000, and as a callback function have the port listened on logged
// server.listen(port, hostname, () => {
//   console.log(`Server running at http://${hostname}:${port}/`);
// 
//   // axios.get('https://medium.com/data-scraper-tips-tricks/scraping-data-with-javascript-in-3-minutes-8a7cf8275b31')
//   // .then((response) => {
//   //   let $ = cheerio.load(response.data)
//   //   // console.log(Object.getOwnPropertyNames(response))
//   //   console.log('Title: ', $('head > title').text())
//   //   // console.log('Body: ', $('body').text())
//   // })
//   let url = 'https://stackoverflow.com/questions/50592957/get-title-of-external-page-using-javascript'
//   // let url = 'https://medium.com/data-scraper-tips-tricks/scraping-data-with-javascript-in-3-minutes-8a7cf8275b31'
// 
//   // console.log('Title: ', $('body').text())
// });

const express = require('express');
const app = express();
var fs = require('fs');
var http = require('http');
var https = require('https');
// var privateKey  = fs.readFileSync('generate-ssl-certs-for-local-development/your-certs/local.dev.key', 'utf8');
// var certificate = fs.readFileSync('generate-ssl-certs-for-local-development/your-certs/local.dev.crt', 'utf8');
// var privateKey  = fs.readFileSync('dev_cert_ca.key.pem', 'utf8');
// var certificate = fs.readFileSync('dev_cert_ca.csr', 'utf8');
var privateKey  = fs.readFileSync('server.key', 'utf8');
var certificate = fs.readFileSync('server.crt', 'utf8');
var credentials = {key: privateKey, cert: certificate, passphrase: 'tmp1234'};

const port = process.env.PORT || 3001;

const server = https.createServer(credentials, app);
// server.timeout = 1000 * 60 * 10; // 10 minutes

server.listen(port);

// Use middleware to set the default Content-Type
app.use(function (req, res, next) {
    res.header('Content-Type', 'application/json');
    // res.header('Content-Type', 'application/x-www-form-urlencoded')
    res.header('Access-Control-Allow-Origin', '*')
    // res.header('Content-Type', 'text/plain')
    next();
});

app.post('/scrape_url', (req, res) => {
    console.log('TEST')
    // res.send('Hello World\n');
    res.send(JSON.stringify({title: 'TEST TITLE'}));
})

// app.get('/api/endpoint2', (req, res) => {
//     // Set Content-Type differently for this particular API
//     res.set({'Content-Type': 'application/xml'});
//     res.send(`<note>
//         <to>Tove</to>
//         <from>Jani</from>
//         <heading>Reminder</heading>
//         <body>Don't forget me this weekend!</body>
//         </note>`);
// })
