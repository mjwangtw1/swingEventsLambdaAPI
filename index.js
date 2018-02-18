var google = require('googleapis');

exports.handler = function index(event, context, callback) {

  const response = {
    statusCode: 200,
    body: { "message": "20180218[1429] - Your Selection is indeed : " + event.type }
  };

  //user Selection event.type

  //Get the current Date:
    var dt = new Date();
    dt.setDate(dt.getDate()+7);
    nextWeek = dt.toLocaleString(['zh-TW'],{timeZone: 'Asia/Taipei'});

    var nowdt = new Date();
    today = nowdt.toLocaleString(['zh-TW'],{timeZone: 'Asia/Taipei'});

  const CALENDAR_ID = {
    'primary': 'k89l8gcv9l19k5aafaolmn2d38@group.calendar.google.com', //Special Events
    'swing' : 'du5ncgcem4duked6jui8p1g5as@group.calendar.google.com',
    'blues' : 'hbcpknmo5l1jp455qdbrjps2uo@group.calendar.google.com'
  };

  //const GOOGLE_MAP_API_KEY = 'AIzaSyBY7C54J0Z2tm_OOORmDvVY0gZjeNQIvQY';

  //Defined at AWS-Lambda
  const GSA_CLIENT_EMAIL = process.env['GSA_CLIENT_EMAIL'];
  const GSA_CLIENT_PRIVATE_KEY = process.env['GSA_CLIENT_PRIVATE_KEY'];

    //V2-Try
    // configure a JWT auth client
    let jwtClient = new google.auth.JWT(
        GSA_CLIENT_EMAIL,
        null,
        GSA_CLIENT_PRIVATE_KEY,
        ['https://www.googleapis.com/auth/calendar']);
    //authenticate request
        jwtClient.authorize(function (err, tokens) {
            if (err) {
                console.log('JWT auth fail 1513');
                console.log(err);
                return;
            } else {
                //console.log("Successfully connected!");
            }
        });

        console.log(jwtClient);

    let calendar = google.calendar('v3');

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