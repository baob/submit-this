
const extractData = (event) => {
    console.log('event.blocks', event.blocks);
    event.blocks.forEach((block) => {
        console.log('block', block);
        block.elements.forEach((element) => {
            console.log('element', element);
        });
    });

    return {
        message: event.text
    }
};

module.exports = extractData