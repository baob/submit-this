const sendHelp = async (event, web) => {
    console.log(`sending Help: user ${event.user} in channel ${event.channel} says ${event.text}`);
    // console.log('---- event:', event);
    // console.log('---- web:', web);

    const response = [
        'I am here to help with submitting your data',
        'Send me a message with the text you want to submit, and I will get you started.',
        'Alternatively try sending me these commands:',
        '   help',
        '   ?',
        '   who are you'
    ].join('\n');

    console.log('---- response:', response);
    try {
        await web.chat.postMessage({
            text: `<@${event.user}> ${response}`,
            channel: event.channel
        });
    } catch (err) {
        console.log('slack web api rejected the chat.postMessage request with', err)
    };
};

module.exports = sendHelp
