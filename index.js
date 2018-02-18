var google = require('googleapis');

exports.handler = function index(event, context, callback) {

    var dt = new Date();
    dt.setDate(dt.getDate()+7);
    nextWeek = dt.toLocaleString(['zh-TW'],{timeZone: 'Asia/Taipei'});

    var nowdt = new Date();
    today = nowdt.toLocaleString(['zh-TW'],{timeZone: 'Asia/Taipei'});

  const responseMessage = {
    statusCode: 200,
    body: { "message": "20180218[1901] - Your Selection is indeed : " + event.type }
  };

  //user Selection event.type
  const CALENDAR_ID = {
    'primary': 'k89l8gcv9l19k5aafaolmn2d38@group.calendar.google.com', //Special Events
    'swing'  : 'du5ncgcem4duked6jui8p1g5as@group.calendar.google.com',
    'blues'  : 'hbcpknmo5l1jp455qdbrjps2uo@group.calendar.google.com'
  };

  //const GOOGLE_MAP_API_KEY = 'AIzaSyBY7C54J0Z2tm_OOORmDvVY0gZjeNQIvQY';

   var Buffer = require('buffer').Buffer;

   //Defined at AWS-Lambda
   //Data from Lambda is Based_64, need to convert back
   const CLIENT_EMAIL = process.env['GSA_CLIENT_EMAIL'];
   const PRIVATE_KEY = new Buffer(process.env['GSA_CLIENT_PRIVATE_KEY'], 'base64').toString();

    // configure a JWT auth client
    let jwtClient = new google.auth.JWT(
        CLIENT_EMAIL,
        null,
        PRIVATE_KEY,
        ['https://www.googleapis.com/auth/calendar']);

    // console.log('checking private_key');
    // console.log(process.env['GSA_CLIENT_PRIVATE_KEY']);
    // console.log(jwtClient);
    // return;

    //authenticate request
        jwtClient.authorize(function (err, tokens) {
            if (err) {
                console.log('JWT auth fail 1855');
                console.log(err);
                console.log(tokens);
                return;
            } else {
                //console.log('JWT auth works 1846');
                //console.log("Successfully connected!");
            }
        });
        //console.log(jwtClient);

    let calendar = google.calendar('v3');

    calendar.events.list({
        auth: jwtClient,
        //desired Calendar ID
        calendarId: CALENDAR_ID['blues'],
        timeZone: "Asia/Taipei",
        //TimeMax: dt
    }, function (err, response) {

        console.log(response);

        var NewResponse = {
            statusCode: 202,
            body: response

            // body: {
            //   "Desc" : response.description,
            //   "timeZone" : response.timeZone,
            //   "items" : response.items
            // }
        };
        callback(null, NewResponse);
        return; //Should stop from here
    });

  console.log('processing event: %j', event)

  callback(null, responseMessage);
}