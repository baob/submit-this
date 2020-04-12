const extractData = require('./extractData');
const buildResponse = require('./buildResponse');
const ENCODE_THE_DATA = true;

const processSubmission = async (event, web) => {
    console.log(
        `Processing submission: user ${event.user} in channel ${event.channel} says ${event.text}`
    );
    // console.log('---- event:', event);
    // console.log('---- web:', web);

    const data = extractData(event);

    const messageTemplate = process.env.SUBMIT_MESSAGE_TEMPLATE;
    const linkTemplate = process.env.SUBMIT_LINK_TEMPLATE;

    const link = buildResponse(linkTemplate, data, ENCODE_THE_DATA);
    const response = buildResponse(messageTemplate, { link, ...data });

    console.log('---- response:', response);
    try {
        await web.chat.postMessage({
            text: `<@${event.user}> ${response}`,
            channel: event.channel,
        });
    } catch (err) {
        console.log(
            'slack web api rejected the chat.postMessage request with',
            err
        );
    }
};

module.exports = processSubmission;
