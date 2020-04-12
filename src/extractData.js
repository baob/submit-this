
const extractData = (event) => {
    const botUserMatch = event.text.trim().match(/^(<@U.{10,12}>)/i)
    const text = (botUserMatch ? event.text.replace(botUserMatch[0], '') : event.text).trim();
    let atUser = `<@${event.user}>`

    return {
        message: text,
        at_user: atUser
    }
};

module.exports = extractData
