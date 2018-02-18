var google = require('googleapis');

exports.handler = function index(event, context, callback) {

  const response = {
    statusCode: 200,
    body: { "message": "20180218[1429] - Your Selection is indeed : " + event.type }
  };

  //user Selection event.type
  const CALENDAR_ID = {
    'primary': 'k89l8gcv9l19k5aafaolmn2d38@group.calendar.google.com', //Special Events
    'swing'  : 'du5ncgcem4duked6jui8p1g5as@group.calendar.google.com',
    'blues'  : 'hbcpknmo5l1jp455qdbrjps2uo@group.calendar.google.com'
  };

  //const GOOGLE_MAP_API_KEY = 'AIzaSyBY7C54J0Z2tm_OOORmDvVY0gZjeNQIvQY';

  //Defined at AWS-Lambda

   var Buffer = require('buffer').Buffer;
   var PRIVATE_KEY = new Buffer(process.env['GSA_CLIENT_PRIVATE_KEY'], 'base64').toString();

    // configure a JWT auth client
    let jwtClient = new google.auth.JWT(
        process.env['GSA_CLIENT_EMAIL'],
        null,
        PRIVATE_KEY,
        ['https://www.googleapis.com/auth/calendar']);

    console.log('checking private_key');
    console.log(process.env['GSA_CLIENT_PRIVATE_KEY']);
    // console.log(jwtClient);
    // return;

    //authenticate request
        jwtClient.authorize(function (err, tokens) {
            if (err) {
                console.log('JWT auth fail 1846');
                console.log(err);
                console.log(tokens);
                return;
            } else {
                console.log('JWT auth works 1846');
                //console.log("Successfully connected!");
            }
        });

        //console.log(jwtClient);

    let calendar = google.calendar('v3');

    console.log('Stop here');
    return 'geeee';

    // calendar.events.list({
    //     auth: jwtClient,
    //     //desired Calendar ID
    //     calendarId: CALENDAR_ID['blues'],
    //     timeZone: "Asia/Taipei",
    //     TimeMax: dt
    // }, function (err, response) {
    //
    //     console.log('error?');
    //     console.log(err);
    //     exit();
    //
    //     var NewResponse = {
    //         statusCode: 200,
    //         body: {
    //           "Desc" : response.description,
    //           "timeZone" : response.timeZone,
    //           "items" : response.items
    //         }
    //     };
    //     callback(null, NewResponse);
    //     return; //Should stop from here
    // });

  console.log('processing event: %j', event)

  callback(null, response);
}