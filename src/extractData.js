const extractData = (event) => {
    const botUserMatch = event.text.trim().match(/^(<@U.{10,12}>)/i);
    const text = (botUserMatch
        ? event.text.replace(botUserMatch[0], '')
        : event.text
    ).trim();
    const atUser = `<@${event.user}>`;

    const linkMatch = event.text
        .trim()
        .match(/(http|https):\/\/[a-zA-Z0-9\-.]+(\/\S*)?/);

    const link = linkMatch ? linkMatch[0] : undefined;

    return {
        message: text,
        at_user: atUser,
        link,
    };
};

module.exports = extractData;
