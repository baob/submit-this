const { createEventAdapter } = require('@slack/events-api');
const { WebClient } = require('@slack/web-api');
const handleAppMention = require('./handleAppMention');
const dotenv = require('dotenv');
const handleChannelJoined = require('./handleChannelJoined');

const BOOLEAN_STRING_NEGATIVES = ['n', 'no', 'f', 'false'];

const app = () => {
    const nodeEnv = process.env.NODE_ENV || 'development';
    if (nodeEnv != 'production') {
        dotenv.config();
    }
    const slackEventRetries =
        process.env.SLACK_EVENT_RETRIES &&
        BOOLEAN_STRING_NEGATIVES.includes(process.env.SLACK_EVENT_RETRIES)
            ? false
            : true;

    /*
        Set up the Event Listener
    */

    const slackSigningSecret = process.env.SLACK_SIGNING_SECRET;
    const port = process.env.PORT || 3000;
    const eventAdapterOptions = {
        includeHeaders: true,
        includeBody: true,
    };
    console.log('eventAdapterOptions:', eventAdapterOptions);
    console.log(
        'creating event adapter:  createEventAdapter( <slackSigningSecret>, ',
        eventAdapterOptions,
        ' )'
    );

    const slackEvents = createEventAdapter(
        slackSigningSecret,
        eventAdapterOptions
    );

    // All errors in listeners are caught here. If this weren't caught, the program would terminate.
    slackEvents.on('error', (error) => {
        console.log(error); // TypeError
    });

    /*
        Set up the WebClient
    */

    const token = process.env.SLACK_TOKEN;
    const web = new WebClient(token);

    /*
        Attach listeners to events by Slack Event "type". See: https://api.slack.com/events/message.im
    */

    const handleAppMentionCallback = (web) => (event, _body, headers) => {
        console.log('slackEventRetries:', slackEventRetries);
        console.log('headers:', headers);
        return handleAppMention(event, web);
    };
    slackEvents.on('app_mention', handleAppMentionCallback(web));

    // https://api.slack.com/events/member_joined_channel
    const handleChannelJoinedCallback = (web) => (event) =>
        handleChannelJoined(event, web);
    slackEvents.on('member_joined_channel', handleChannelJoinedCallback(web));

    // finally, start listening for events

    (async () => {
        // const test = await web.auth.test();

        const server = await slackEvents.start(port);
        console.log(`Listening for events on ${server.address().port}`);
        // console.log('---- server', server)
    })();
};

module.exports = app;
