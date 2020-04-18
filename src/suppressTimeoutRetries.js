const suppressTimeoutRetries = (headers) => {


    if (headers['x-slack-retry-num']) {
        return true;
    }


    return false;
};

module.exports = suppressTimeoutRetries;
