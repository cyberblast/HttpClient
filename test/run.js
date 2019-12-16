const HttpClient = require('../src/httpClient.js')

async function run() {
  console.info('running test for HttpClient module');
  const getresult = await HttpClient.get('http://postman-echo.com/get?foo1=bar1&foo2=bar2');
  console.log(`GET returned: ${JSON.stringify(getresult)}`);
  const postresult = await HttpClient.post('http://postman-echo.com/post?foo1=bar1&foo2=bar2', 'Hallo Mama');
  console.log(`POST returned: ${JSON.stringify(postresult)}`);
}

function validate() {
}

run()
  .then(validate)
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
