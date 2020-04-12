const extractData = require('./extractData');
const processSubmission = require('./processSubmission');
const sendHelp = require('./sendHelp');
const sendIntroduction = require('./sendIntroduction');

const handleAppMention = async (event, web) => {
    console.log(
        `Received a app_mention event: user ${event.user} in channel ${event.channel} says ${event.text}`
    );
    // console.log('---- event:', event);
    // console.log('---- web:', web);

    const { message } = extractData(event);

    if (message == '' || message == 'help') {
        sendHelp(event, web);
        return;
    }
    if (message == '?' || message.includes('who are you')) {
        sendIntroduction(event, web);
        return;
    }

    processSubmission(event, web);
};

module.exports = handleAppMention;
