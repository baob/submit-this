const extractData = (event) => {
    const botUserMatch = event.text.trim().match(/^(<@U.{10,12}>)/i);
    const text = (botUserMatch
        ? event.text.replace(botUserMatch[0], '')
        : event.text
    ).trim();
    let atUser = `<@${event.user}>`;

    let linkMatch = event.text
        .trim()
        .match(/(http|https):\/\/[a-zA-Z0-9\-.]+(\/\S*)?/);

    return {
        message: text,
        at_user: atUser,
        link: linkMatch[0],
    };
};

module.exports = extractData;
