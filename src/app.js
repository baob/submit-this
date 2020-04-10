const { createEventAdapter } = require('@slack/events-api');
const dotenv = require('dotenv')

const app = () => {

    dotenv.config(); // TODO: later, we'll need to bypass this for NODE_ENV production

    const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
    const port = process.env.PORT || 3000;

    const slackEvents = createEventAdapter(slackSigningSecret);

    // Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
    slackEvents.on('app_mention', (event) => {
        console.log(`Received a app_mention event: user ${event.user} in channel ${event.channel} says ${event.text}`);
    });

    (async () => {
        const server = await slackEvents.start(port);
        console.log(`Listening for events on ${server.address().port}`);
    })();

}

module.exports = app