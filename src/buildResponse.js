
const buildResponse = (template, data, encode = false) => {
    if (!template) {
        throw 'Blank template supplied to buildResponse';
    }

    let result = template

    Object.keys(data).forEach((key) => {
        const token = `{{${key}}}`
        const encodedText = encode ? encodeURIComponent(data[key]) : data[key]
        result = result.replace(token, encodedText)
    });

    return result
};

module.exports = buildResponse