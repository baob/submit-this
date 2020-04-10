
const handleAppMention = (event) => {
    console.log(`Received a app_mention event: user ${event.user} in channel ${event.channel} says ${event.text}`);
};

module.exports = handleAppMention