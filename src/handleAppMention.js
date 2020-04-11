const extractData = require('./extractData');
const buildResponse = require('./buildResponse')

const handleAppMention = async (event, web) => {
    console.log(`Received a app_mention event: user ${event.user} in channel ${event.channel} says ${event.text}`);
    console.log('---- event:', event);
    // console.log('---- web:', web);

    const data = extractData(event)

    const template = process.env.MESSAGE_TEMPLATE

    const response = buildResponse(template, data)

    try {
        await web.chat.postMessage({
            text: `<@${event.user}> ${response}`,
            channel: event.channel
        });
    } catch (err) {
        console.log('slack web api rejected the chat.postMessage request with', err)
    };
};

module.exports = handleAppMention