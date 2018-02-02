var pkg = require('./package.json');
var slack = require('./slack/slack');

console.log("Running project: " + pkg.name);



slack.init.subscribe(channel => {
    slack.rtm.sendMessage("Hey Pimmels", channel);
})

slack.onMessage.subscribe(message => {
    slack.rtm.sendMessage(message.text, message.channel);
})
