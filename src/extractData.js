
const extractData = (event) => {
    const userMatch = event.text.trim().match(/^(<@U.{10,12}>)/i)
    const text = (userMatch ? event.text.replace(userMatch[0], '') : event.text).trim();

    // console.log('userMatch:', userMatch)
    // console.log('text:', text)

    return {
        message: text
    }
};

module.exports = extractData