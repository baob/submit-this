
const buildResponse = (template, data) => {
    let result = template

    Object.keys(data).forEach((key) => {
        token = `{{${key}}}`
        result = result.replace(token, data[key])
    });

    return result
};

module.exports = buildResponse