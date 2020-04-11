const { createEventAdapter } = require('@slack/events-api');
const { WebClient } = require('@slack/web-api');
const handleAppMention = require('./handleAppMention');
const dotenv = require('dotenv')

const app = () => {

    const nodeEnv = process.env.NODE_ENV || 'development';
    if (nodeEnv != 'production') {
        dotenv.config();
    }

    /*
        Set up the Event Listener
    */

    const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
    const port = process.env.PORT || 3000;

    const slackEvents = createEventAdapter(slackSigningSecret);

    // All errors in listeners are caught here. If this weren't caught, the program would terminate.
    slackEvents.on('error', (error) => {
        console.log(error.name); // TypeError
    });

    /*
        Set up the WebClient
    */

    // Read a token from the environment variables
    const token = process.env.SLACK_TOKEN;

    // Initialize
    const web = new WebClient(token);


    const handleAppMentionLocal = (web) => (event) => handleAppMention(event, web)

    // Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
    slackEvents.on('app_mention', handleAppMentionLocal(web));

    (async () => {
        const server = await slackEvents.start(port);
        console.log(`Listening for events on ${server.address().port}`);
        // console.log('---- server', server)
    })();

}

module.exports = app
