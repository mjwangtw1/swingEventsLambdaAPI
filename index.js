var google = require('googleapis');
// var async = require('async');
var rp = require('request-promise');

exports.handler = function (req, res){
//exports.handler = function index(event, context, callback) {
//     console.log('req');
//     console.log(req);
//     return;

    var promises = event
    {
    // const promises = {

        //All code here
        //var type = event.message.type;

        //Default Output
        var returnMessages = {
            statusCode: 200,
            body:
                { message: "20180218[2125] - Your Selection is indeed : " + req.type,
                     data: null}
        };

        var dt = new Date();
        dt.setDate(dt.getDate()+7);
        nextWeek = dt.toLocaleString(['zh-TW'],{timeZone: 'Asia/Taipei'});

        var nowdt = new Date();
        today = nowdt.toLocaleString(['zh-TW'],{timeZone: 'Asia/Taipei'});

        const CALENDAR_ID = {
            'primary': 'k89l8gcv9l19k5aafaolmn2d38@group.calendar.google.com', //Special Events
            'swing'  : 'du5ncgcem4duked6jui8p1g5as@group.calendar.google.com',
            'blues'  : 'hbcpknmo5l1jp455qdbrjps2uo@group.calendar.google.com'
        };

        var Buffer = require('buffer').Buffer;

        //Defined at AWS-Lambda
        //Data from Lambda is Based_64, need to convert back
        const CLIENT_EMAIL = process.env.GSA_CLIENT_EMAIL;
        const PRIVATE_KEY = new Buffer(process.env.GSA_CLIENT_PRIVATE_KEY, 'base64').toString();


        let jwtClient = new google.auth.JWT(
            CLIENT_EMAIL,
            null,
            PRIVATE_KEY,
            ['https://www.googleapis.com/auth/calendar']
        );

        jwtClient.authorize(function (err, tokens){
            if(err) throw err;
        });

        let calendar = google.calendar('v3');

        calendar.events.list({
            auth: jwtClient,
            calendarId: CALENDAR_ID.blues, //desired Calendar ID
            timeZone: "Asia/Taipei",
            //TimeMax: dt
        }, function (err, response) {

            if(err){
                returnMessages.body.data = 'error!';
            }else{
                returnMessages.body.data = response;
            }

            //Toss out data
            return rp(returnMessages)
                .then(function (response) {
                    console.log("Success : " + response);
                }).catch(function (err) {
                    console.log("Error : " + err);
                });
        });
    } //end of promises

    Promise
        .all(promises)
        .then(() => res.json({success: true}));
};