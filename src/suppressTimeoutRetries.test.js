const suppressTimeoutRetries = require('./suppressTimeoutRetries');

describe('suppressTimeoutRetries()', () => {
    let headers;

    const returnValue = () => {
        return suppressTimeoutRetries(headers);
    };

    beforeEach(() => {
        headers = {
            'user-agent': 'Slackbot 1.0 (+https://api.slack.com/robots)',
            accept: '*/*',
            'accept-encoding': 'gzip,deflate',
            'content-type': 'application/json',
            'x-slack-signature': 'some-slack-signatute',
            'x-slack-request-timestamp': '1587203183',
            'content-length': '676',
            host: 'some-application-host',
            'cache-control': 'max-age=259200',
            'x-forwarded-for': 'some-ip-address',
        };
    });
    it('does not throw errors', () => {
        expect(returnValue).not.toThrow();
    });
    it('with no retry headers, returns false', () => {
        expect(returnValue()).toBeFalsy();
    });
    describe('with retry header', () => {
        beforeEach(() => {
            headers = { 'x-slack-retry-num': 3, ...headers };
        });
        it('returns true', () => {
            expect(returnValue()).toBeTruthy();
        });
    });
});
