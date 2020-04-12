const extractData = require('./extractData');

describe('extractData()', () => {
    let event;

    beforeEach(() => {
        event = {
            text:
                '<@UserForRobot> hello robot with a link https://example.website/with/a/path blah blah ',
            user: 'UtheRealUser',
        };
    });

    const returnValue = () => extractData(event);

    it('does not throw errors', () => {
        expect(returnValue).not.toThrow();
    });

    it('extracts the user that sent the message', () => {
        expect(returnValue()).toHaveProperty('at_user', '<@UtheRealUser>');
    });

    it('returns the message without the @mention of the bot user', () => {
        expect(returnValue()).toHaveProperty(
            'message',
            'hello robot with a link https://example.website/with/a/path blah blah'
        );
    });

    it('returns the link embedded in the message', () => {
        expect(returnValue()).toHaveProperty(
            'link',
            'https://example.website/with/a/path'
        );
    });
});
