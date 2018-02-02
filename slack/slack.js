var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var core = require('../core/core');
var Rx = require('rxjs');

var slack = {};

var rtm = new RtmClient('xoxb-38537950050-N7jTaCUUIbqRmsp4dnazybCg');
var group;



rtm.start();

rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
    for (const c of rtmStartData.groups) {
        if (c.name === 'testbot') { group = c.id }
    }
    core.log('SLACK', `Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}`);
});

slack.init = Rx.Observable.create(function (observer) {


    rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
        observer.next(group);
    });


});

slack.onMessage = Rx.Observable.create(function (observer) {
    rtm.on(RTM_EVENTS.MESSAGE, function (message) {
        observer.next(message);
    });
});

// rtm.on(RTM_EVENTS.MESSAGE, function (message) {
//     if (message.channel === group)
//         core.log('SLACK', message);
//     rtm.sendMessage("Stop, everybody listen, <@" + message.user + "> has something important to say!", message.channel);
// });

slack.rtm = rtm;

module.exports = slack;