console.log('starting function - 20180405')

var google = require('googleapis');

exports.handler = function index(event, context, callback) {

    //Here Deals with the time format
    var dt = new Date();
    dt.setDate(dt.getDate()+7);
    nextWeek = dt.toLocaleString(['zh-TW'],{timeZone: 'Asia/Taipei'});

    var nowdt = new Date();
    today = nowdt.toLocaleString(['zh-TW'],{timeZone: 'Asia/Taipei'});

    timestring = ', Nowdate: ' + nowdt + ' , NextWeekDt : ' + nextWeek;

    var response = {
        statusCode: 200,
        // headers: {
        //   "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        //   "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
        // },
        //body: { "message": "20180103[1038] - Your Selection is indeed : " + event.type }
        body: { "message": "20180218[2252] - Your Selection is indeed : " + event.type + timestring }
    };

    //user Selection event.type
    //Get the current Date:
    // const CALENDAR_ID = {
    //     'primary': 'k89l8gcv9l19k5aafaolmn2d38@group.calendar.google.com', //Special Events
    //     'swing' : 'du5ncgcem4duked6jui8p1g5as@group.calendar.google.com',
    //     'blues' : 'hbcpknmo5l1jp455qdbrjps2uo@group.calendar.google.com'
    // };

    const PRIMARY_CALENDAR = 'k89l8gcv9l19k5aafaolmn2d38@group.calendar.google.com';
    const SWING_CALENDAR = 'du5ncgcem4duked6jui8p1g5as@group.calendar.google.com';
    const BLUES_CALENDAR = 'hbcpknmo5l1jp455qdbrjps2uo@group.calendar.google.com';

    targetCalendar = PRIMARY_CALENDAR; //If besides swing/blues, we go for this one

    switch(event.type){
        case 'swing':
            targetCalendar = SWING_CALENDAR;
            break;

        case 'blues':
            tagetCalendar = BLUES_CALENDAR;
            break;
    }



    //const GOOGLE_MAP_API_KEY = 'AIzaSyBY7C54J0Z2tm_OOORmDvVY0gZjeNQIvQY';

    var Buffer = require('buffer').Buffer;

    const CLIENT_EMAIL = process.env.GSA_CLIENT_EMAIL;
    const PRIVATE_KEY = new Buffer(process.env.GSA_CLIENT_PRIVATE_KEY, 'base64').toString();

    let jwtClient = new google.auth.JWT(
        CLIENT_EMAIL,
        null,
        PRIVATE_KEY,
        ['https://www.googleapis.com/auth/calendar']
    );
    //authenticate request
    jwtClient.authorize(function (err, tokens) {
        if (err) {
            console.log(err);
            return;
        } else {
            //console.log("Successfully connected!");
        }
    });

    let calendar = google.calendar('v3');

    calendar.events.list({
        auth: jwtClient,
        //desired Calendar ID
        calendarId: targetCalendar,
        //calendarId: CALENDAR_ID['blues'],
        timeZone: "Asia/Taipei"
    }, function (err, res) {
        if (err) {

            //const err_message = 'ERROR';
            callback(null, err);
            throw err;

        }else{

            var NewResponse = {
                    statusCode: 200,
                    body: {
                        "Desc" : res.description,
                        "timeZone" : res.timeZone,
                        "items" : res.items
                    }
            };
            callback(null, NewResponse);
        }
   
        // //console.log(NewResponse);
        //
        // callback(null, NewResponse);
        //return; //Should stop from here
    });

    console.log('processing event 0226: %j', event)
    //callback(null, { hello: 'Hello this is 9527 ' });

    //callback(null, response);
}