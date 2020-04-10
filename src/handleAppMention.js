
const handleAppMention = (event, _web) => {
    console.log(`Received a app_mention event: user ${event.user} in channel ${event.channel} says ${event.text}`);
    console.log('---- event:', event);
    // console.log('---- web:', _web);
};

module.exports = handleAppMention