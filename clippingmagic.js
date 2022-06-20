// Requires "request" to be installed (see https://www.npmjs.com/package/request)
var request = require('request');
var fs = require('fs');

module.exports.removeBackground=(onSuccess, onFailure)=>{
  request.post({
    url: 'https://clippingmagic.com/api/v1/images',
    formData: {
      image: fs.createReadStream('received.png'), // TODO: Replace with your image
      format: 'result',
      test: 'true', // TODO: Remove for production
      // TODO: Add more upload options here
    },
    auth: {user: '13493', pass: '750f7r2m49bmrkfda1jn59jt28vpgrpm1g6lqvgok73titfdit9u'},
    followAllRedirects: true,
    encoding: null
  }, function(error, response, body) {
    if (error) {
      console.error('Request failed:', error);
      onFailure();
    } else if (!response || response.statusCode != 200) {
      console.error('Error:', response && response.statusCode, body.toString('utf8'));
      onFailure();
    } else {
      // Store these if you want to be able to use the Smart Editor
      let imageId = response.caseless.get('x-amz-meta-id');
      let imageSecret = response.caseless.get('x-amz-meta-secret');

      // Save result
      fs.writeFileSync("clipped.png", body);
      onSuccess();
    }
  });
}