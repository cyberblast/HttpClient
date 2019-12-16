const http = require('http');
const HttpClient = {};
module.exports = HttpClient;

HttpClient.request = function(args) {
  return new Promise((resolve, reject) => {
    if (args == null) {
      reject(new Error("HttpClient request requires an args parameter!"));
    }
    const result = {
      headers: null,
      response: ''
    }
    const onError = function(e) {
      reject(e);
    }
    const onData = function(chunk) {
      result.response += chunk;
    };
    const onCompleted = function() {
      resolve(result);
    }
    const onResponse = function(incomingMessage) {
      result.headers = incomingMessage.headers;
      incomingMessage.on('data', onData);
      incomingMessage.on('end', onCompleted);
    };
    const options = {
      method: args.method || args.body ? 'POST' : 'GET'
    };
    if (args.options !== undefined) {
      Object.assign(options, args.options);
    };
    const clientRequest = http.request(args.url, options, onResponse);
    clientRequest.on('error', onError);
    if (args.body !== undefined) {
      clientRequest.write(args.body);
    }
    clientRequest.end();
  });
}

HttpClient.get = async function(url) {
  return await HttpClient.request({ url });
}
HttpClient.post = async function(url, body) {
  return await HttpClient.request({ 
    url, 
    body,
    options: {
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': body.length
      }
    }
  });
}
