
const buildResponse = (template, data) => {
    let result = template

    Object.keys(data).forEach((key) => {
        const token = `{{${key}}}`
        const encodedText = encodeURIComponent(data[key])
        result = result.replace(token, encodedText)
    });

    return result
};

module.exports = buildResponse