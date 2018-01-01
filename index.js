console.log('starting function')
exports.handle = function(event, context, callback) {

  const response = {
    statusCode: 200,
    body: { "message": "[1719] - Your Selection is indeed : " + event.type }
  };










  console.log('processing event: %j', event)
  //callback(null, { hello: 'Hello this is 9527 ' });

  callback(null, response);
}

