let request = require('request')
let cheerio = require('cheerio')
// const axios = require ('axios')

//
//Load HTTP module
const http = require("http");
const hostname = '127.0.0.1';
const port = 3001;

//Create HTTP server and listen on port 3000 for requests
const server = http.createServer((req, res) => {

  if(req.url.indexOf('scrape_url') > 0) {

		var body = "";
    req.on('data', function(chunk) {
      body += chunk;
    });
    req.on('end', function() {
      console.log(body);

      // debugger
      var url = JSON.parse(body).url

      request(url, function (error, response, body) { if (error) {
          console.log(error);
          return
        }
        var $ = cheerio.load(body);
        var title = $("title").text();
        console.log(title)

        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({title: title}));
      });
    });
  } else {
    //Set the response HTTP header with HTTP status and Content type
    console.log('Hello World Log')
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
  }
});

//listen for request on port 3000, and as a callback function have the port listened on logged
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);

  // axios.get('https://medium.com/data-scraper-tips-tricks/scraping-data-with-javascript-in-3-minutes-8a7cf8275b31')
  // .then((response) => {
  //   let $ = cheerio.load(response.data)
  //   // console.log(Object.getOwnPropertyNames(response))
  //   console.log('Title: ', $('head > title').text())
  //   // console.log('Body: ', $('body').text())
  // })
  let url = 'https://stackoverflow.com/questions/50592957/get-title-of-external-page-using-javascript'
  // let url = 'https://medium.com/data-scraper-tips-tricks/scraping-data-with-javascript-in-3-minutes-8a7cf8275b31'

  // console.log('Title: ', $('body').text())
});
