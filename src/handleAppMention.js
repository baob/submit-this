const extractData = require('./extractData');
const buildResponse = require('./buildResponse')

const handleAppMention = async (event, web) => {
    console.log(`Received a app_mention event: user ${event.user} in channel ${event.channel} says ${event.text}`);
    console.log('---- event:', event);
    // console.log('---- web:', web);

    const data = extractData(event)

    const template = process.env.MESSAGE_TEMPLATE

    const response = buildResponse(template, data)

    const result = await web.chat.postMessage({
        text: response,
        channel: event.channel,
    });

    console.log('result of postMessage', result)

};

module.exports = handleAppMention