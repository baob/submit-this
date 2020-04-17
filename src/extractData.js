const extractData = (event) => {
    const botUserMatch = event.text.trim().match(/^(<@U.{10,12}>)/i);
    const text = (botUserMatch
        ? event.text.replace(botUserMatch[0], '')
        : event.text
    ).trim();
    const atUser = `<@${event.user}>`;

    const markedUpLinkMatch = text.match(/<(http.{4,199})\|.{4,199}>/);
    if (markedUpLinkMatch) {
        return {
            message: text,
            atUser,
            link: markedUpLinkMatch[1],
        };
    }

    const linkMatch = event.text
        .trim()
        .match(/(http|https):\/\/[a-zA-Z0-9\-.]+(\/\S*)?/);

    const link = linkMatch ? linkMatch[0].replace(/>$/, '') : undefined;

    return {
        message: text,
        atUser,
        link,
    };
};

module.exports = extractData;
