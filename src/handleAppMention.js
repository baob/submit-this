
const handleAppMention = async (event, web) => {
    console.log(`Received a app_mention event: user ${event.user} in channel ${event.channel} says ${event.text}`);
    console.log('---- event:', event);
    // console.log('---- web:', web);


    const result = await web.chat.postMessage({
        text: `You said: ${event.text}`,
        channel: event.channel,
    });

    console.log('result of postMessage', result)

};

module.exports = handleAppMention