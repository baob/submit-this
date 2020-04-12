const sendIntroduction = require('./sendIntroduction');

const handleChannelJoined = async (event, web) => {
    console.log(
        `Received a member_joined_channel event: user ${event.user} in channel ${event.channel}`
    );
    console.log('---- event:', event);
    // console.log('---- web:', web);

    const authTestResponse = await web.auth.test();
    const botUser = authTestResponse.user_id;
    const botName = authTestResponse.user;
    // console.log('---- authTestResponse:', authTestResponse);

    if (botUser == event.user) {
        console.log(
            '---- bot',
            botName,
            'joined the channel invited by',
            event.inviter
        );
        sendIntroduction(event, web);
    } else {
        console.log(
            '---- user',
            event.user,
            'joined the channel invited by',
            event.inviter
        );
    }
};

module.exports = handleChannelJoined;
