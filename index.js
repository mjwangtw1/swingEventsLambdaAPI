console.log('starting function')

var fs = require('fs');
var readline = require('readline');
var googleApi = require('googleapis');
var googleAuth = require('google-auth-library');

exports.handle = function(event, context, callback) {

  const response = {
    statusCode: 200,
    // headers: {
    //   "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
    //   "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
    // },
    body: { "message": "20180103[1026] - Your Selection is indeed : " + event.type }
  };

  //user Selection event.type

  //Get the current Date:

  const CALENDAR_ID = {
    'primary': 'k89l8gcv9l19k5aafaolmn2d38@group.calendar.google.com', //Special Events
    'swing' : 'du5ncgcem4duked6jui8p1g5as@group.calendar.google.com',
    'blues' : 'hbcpknmo5l1jp455qdbrjps2uo@group.calendar.google.com'
  };

  const GOOGLE_MAP_API_KEY = 'AIzaSyBY7C54J0Z2tm_OOORmDvVY0gZjeNQIvQY';
  







  







  console.log('processing event: %j', event)
  //callback(null, { hello: 'Hello this is 9527 ' });

  callback(null, response);
}