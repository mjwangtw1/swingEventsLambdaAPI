var google = require('googleapis');
var async = require('async');

exports.handler = function index(event, context, callback) {

    var dt = new Date();
    dt.setDate(dt.getDate()+7);
    nextWeek = dt.toLocaleString(['zh-TW'],{timeZone: 'Asia/Taipei'});

    var nowdt = new Date();
    today = nowdt.toLocaleString(['zh-TW'],{timeZone: 'Asia/Taipei'});

      var responseMessage = {
        statusCode: 200,
        body: { "message": "20180218[2045] - Your Selection is indeed : " + event.type,
                "data" : null}
      };

  var displayMessage = "20180218[2028] - Your Selection is indeed : " + event.type;

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

   //We use Async
   async.waterfall([

       function auth(next){

           // configure a JWT auth client
           let jwtClient = new google.auth.JWT(
               CLIENT_EMAIL,
               null,
               PRIVATE_KEY,
               ['https://www.googleapis.com/auth/calendar']
           );

           jwtClient.authorize(function (err, tokens){
                next(err,jwtClient);
           });

       },function fetchCalendar(jwtClient, next){

           let calendar = google.calendar('v3');

           calendar.events.list({
               auth: jwtClient,
               calendarId: CALENDAR_ID['blues'], //desired Calendar ID
               timeZone: "Asia/Taipei",
               //TimeMax: dt
           }, function (err, response) {
               console.log('1113');
               console.log(response);
               responseMessage.data = response;
               //callback(null, response);
               next(err,response);
           });
       }

   ],function (err,result){

       //err Handling
       if(err) throw err;
       console.log('2224');
       console.log(result);
       //callback(null, result);
       //return;
   });

    console.log('processing event: %j', event)

    callback(null, responseMessage);
}