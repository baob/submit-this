const extractData = require('./extractData');
const buildResponse = require('./buildResponse');
const { promisify } = require('util');
const openGraphScraper = promisify(require('open-graph-scraper'));

const ENCODE_THE_DATA = true;

const processSubmission = async (event, web) => {
    console.log(
        `Processing submission: user ${event.user} in channel ${event.channel} says ${event.text}`
    );
    // console.log('---- event:', event);
    // console.log('---- web:', web);

    let data = extractData(event);
    console.log('---- extracted data from message:', data);

    let scraperError = false;
    let scraperResponse;
    try {
        scraperResponse = await openGraphScraper({ url: data.link });
        const {
            ogDescription,
            ogImage,
            ogSiteName,
            ogTitle,
            ogUrl,
        } = scraperResponse.data;
        const { url: ogImageUrl } = ogImage;
        data = {
            ogImageUrl,
            ogDescription,
            ogSiteName,
            ogTitle,
            ogUrl,
            ...data,
        };
    } catch (error) {
        console.log('openGraphScraper returned error:', error);
        scraperError = true;
    }
    if (scraperError) {
        console.log('scraper error return:', scraperResponse);
    }

    const messageTemplate = process.env.SUBMIT_MESSAGE_TEMPLATE;
    const linkTemplate = process.env.SUBMIT_LINK_TEMPLATE;

    const submitLink = buildResponse(linkTemplate, data, ENCODE_THE_DATA);
    const response = buildResponse(messageTemplate, { submitLink, ...data });

    console.log('---- response:', response);
    try {
        await web.chat.postMessage({
            text: `<@${event.user}> ${response}`,
            channel: event.channel,
        });
    } catch (err) {
        console.log(
            'slack web api rejected the chat.postMessage request with',
            err
        );
    }
};

module.exports = processSubmission;
