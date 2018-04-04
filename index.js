console.log('starting function - 20180405')

let google = require('googleapis');

exports.handler = function index(event, context, callback) {

    //Here Deals with the time format
    offset = 8; //Taipei = UTC+8
    var nowDate = new Date();
    var utc = nowDate.getTime() + (nowDate.getTimezoneOffset() * 60000);
    var nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    var utc_nextWeek = nextWeek.getTime() + (nextWeek.getTimezoneOffset() * 60000);
    var nextWeekLocalTime = new Date(utc_nextWeek + (3600000*offset)).toISOString();
    var nowLocalTime = new Date(utc + (3600000*offset)).toISOString();

    timeString = 'now '+ nowLocalTime + ', nextweek:' + nextWeekLocalTime;

    var response = {
        statusCode: 200,
        // headers: {
        //   "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        //   "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
        // },
        //body: { "message": "20180103[1038] - Your Selection is indeed : " + event.type }
        body: { "message": "20180218[2252] - Your Selection is indeed : " + event.type + timeString }
    };
    
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
        // maxResult: 5,
        // timeMin: nowLocalTime,
        timeMin: nowLocalTime,
        timeMax: nextWeekLocalTime,
            orderBy: 'startTime'
        //calendarId: CALENDAR_ID['blues'],
        //timeZone: "Asia/Taipei"
    },
        {


            // params: {
            //     // timeMin: nowLocalTime,
            //     // timeMax: nextWeekLocalTime,
            //     // timeMin: (new Date(Date.parse("2018-01-22"))).toISOString(),
            //     // timeMax: (new Date(Date.parse("2018-06-27"))).toISOString(),
            //     //singleEvents: true,
            //     orderBy: 'startTime'
            // }

        }, function (err, res) {
        if (err) {
            //const err_message = 'ERROR';
            console.log('hit an error 995 01');
            callback(null, err);
            throw err;
        }else{
            console.log('Should worked fine 599 01');

            result = res.data; //Use this to avoid Circular Structure.

            var NewResponse = {
                    statusCode: 200,
                    body: {
                        "Remark" : '1621',
                        "NowTime" : nowLocalTime,
                        "NextWeekTime" : nextWeekLocalTime,
                        "Desc" : result.description,
                        "timeZone" : result.timeZone,
                        "items" : result.items,
                        "result_raw": result
                    }
            };
            callback(null, NewResponse);
        }
   
        // //console.log(NewResponse);
        //
        // callback(null, NewResponse);
        //return; //Should stop from here
    });

    console.log('1607: Refatch Data - processing event: ' + event + ' date info:' + timeString);
    //callback(null, { hello: 'Hello this is 9527 ' });

    //callback(null, response);
}