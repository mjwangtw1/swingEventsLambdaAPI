console.log('starting function')

var fs = require('fs');
var readline = require('readline');
var google = require('googleapis');
var googleAuth = require('google-auth-library');

exports.handler = function index(event, context, callback) {

    const response = {
        statusCode: 200,
        // headers: {
        //   "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        //   "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
        // },
        //body: { "message": "20180103[1038] - Your Selection is indeed : " + event.type }
        body: { "message": "20180103[1038] - Your Selection is indeed : " + event.type }
    };

    //user Selection event.type

    //Get the current Date:

    const CALENDAR_ID = {
        'primary': 'k89l8gcv9l19k5aafaolmn2d38@group.calendar.google.com', //Special Events
        'swing' : 'du5ncgcem4duked6jui8p1g5as@group.calendar.google.com',
        'blues' : 'hbcpknmo5l1jp455qdbrjps2uo@group.calendar.google.com'
    };

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
        calendarId: CALENDAR_ID['blues'],
        timeZone: "Asia/Taipei"
    }, function (err, response) {

        var NewResponse = {
            statusCode: 200,
            body: {
                "Desc" : response.description,
                "timeZone" : response.timeZone,
                "items" : response.items
            }
        };
        callback(null, NewResponse);
        return; //Should stop from here
    });


    console.log('processing event: %j', event)
    //callback(null, { hello: 'Hello this is 9527 ' });

    callback(null, response);
}