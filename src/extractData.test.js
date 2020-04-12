const extractData = require('./extractData');

describe('extractData()', () => {
    let event;

    beforeEach(() => {
        event = {
            text: '<@Ueieieiieies> hello robot',
        };
    });

    const returnValue = () => {
        extractData(event);
    };
    it('does not throw errors', () => {
        expect(returnValue).not.toThrow();
    });
});
