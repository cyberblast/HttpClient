const assert = require('assert').strict;
const HttpClient = require('../src/httpClient.js');

const baseUrl = 'http://postman-echo.com/';
const args = {
  foo1: 'bar1',
  foo2: 'bar2'
};
const body = 'Snookums';

let result = {};

function getParams(obj) {
  return Object.keys(obj).map(key => `${key}=${obj[key]}`).join('&');
}

async function run() {
  console.info('running test for HttpClient module');
  const params = getParams(args);
  result.get = await HttpClient.get(`${baseUrl}get?${params}`);
  console.log(`GET returned:`, result.get);
  result.post = await HttpClient.post(`${baseUrl}post?${params}`, body);
  console.log(`POST returned:`, result.post);
}

function validate() {
  console.log('Validation entry');
  if (result.get == null || result.get.response == null) throw new Error('No response from GET!');
  const getResponse = JSON.parse(result.get.response);
  assert.deepStrictEqual(getResponse.args, args);
  console.log('GET response OK');

  if (result.post == null || result.post.response == null) throw new Error('No response from POST!');
  const postResponse = JSON.parse(result.post.response);
  assert.deepStrictEqual(postResponse.args, args);
  assert.deepStrictEqual(postResponse.data, body);
  console.log('POST response OK');

  console.log('All tests passed!');
}

run()
  .then(validate)
  .catch(e => {
    console.error(e);
    process.exit(1);
  });
