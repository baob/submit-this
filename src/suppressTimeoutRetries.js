const suppressTimeoutRetries = (headers) => {
    if (headers['x-slack-retry-num']) {
        if (headers['x-slack-retry-reason'] == 'http_timeout') {
            return true;
        } else {
            return false;
        }
    }

    return false;
};

module.exports = suppressTimeoutRetries;
