const packageJson = require('../package.json');

const sendIntroduction = async (event, web) => {
    console.log(
        `Sending introduction: user ${event.user} in channel ${event.channel} says ${event.text}`
    );
    // console.log('---- event:', event);
    // console.log('---- web:', web);
    const { name, version } = packageJson;

    const response = [
        `Hi. I am a bot running the ${name} software,  version ${version}.`,
        '(I am presently in pre-beta status, please be gentle with me)',
        'I am here to help with submitting your data',
        'Send me a message with the text you want to submit, and I will get you started.',
    ].join('\n');

    console.log('---- response:', response);
    try {
        await web.chat.postMessage({
            text: `<@${event.user}> ${response} `,
            channel: event.channel,
        });
    } catch (err) {
        console.log(
            'slack web api rejected the chat.postMessage request with',
            err
        );
    }
};

module.exports = sendIntroduction;
