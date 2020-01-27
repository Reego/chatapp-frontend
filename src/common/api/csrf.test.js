import getCsrf from './csrf';
import getCookie from './cookie';

jest.mock('./cookie');

//var originalFetch;

fetch = () => getCookie.mockReturnValue('csrf');

describe('csrf token', () => {

    //beforeAll(() => {
        //originalFetch = fetch;
        //fetch = () => getCookie.mockReturnValue('csrf');
    //});

    test('getting csrf token', () => {
        expect(getCsrf()).toBeTruthy();
    });

    //afterAll(() => {
        //fetch = originalFetch;
    //});
});
