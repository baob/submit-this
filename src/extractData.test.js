const extractData = require('./extractData');

describe('extractData()', () => {
    let eventText;
    let eventUser;

    const event = () => {
        return {
            text: eventText,
            user: eventUser,
        };
    };

    beforeEach(() => {
        eventText =
            '<@UserForRobot> hello robot with a link https://example.website/with/a/path blah blah ';
        eventUser = 'UtheRealUser';
    });

    const returnValue = () => extractData(event());

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

    describe('with a message with no link', () => {
        it('gives undefined link', () => {
            eventText = '<@UserForRobot> hello robot with no link blah blah ';
            expect(returnValue()).toHaveProperty('link', undefined);
        });
    });

    describe('with a message with a link in slack markup', () => {
        it('returns the link embedded in the message', () => {
            eventText = '<@U0E0G11N9J5>  <http://facebook.com|facebook.com>';
            expect(returnValue()).toHaveProperty('link', 'http://facebook.com');
        });
    });
    describe('with a message with a link in slack markup without pipe with trailing slash ', () => {
        it('returns the link embedded in the message', () => {
            eventText = '<@U0E0G11N9J5>  <http://facebook.com/>';
            expect(returnValue()).toHaveProperty('link', 'http://facebook.com/');
        });
    });
});
