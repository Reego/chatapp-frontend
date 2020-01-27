import { safeApiCall } from './api';

import { receiveCsrfToken } from '../ducks/actions';

import getCsrf from './csrf';

jest.mock('./csrf');
jest.mock('../ducks/actions');

receiveCsrfToken.mockImplementation(()=>{});

describe('testing safeApiCall decorator', () => {

    test('testing success callback', async () => {

        getCsrf.mockImplementationOnce(() => Promise.resolve('resolved'));

        const mockCallback = jest.fn();
        await safeApiCall(null)('test')(mockCallback);
        expect(mockCallback).toHaveBeenLastCalledWith('test');
    });

    test('testing error callback', async () => {

        getCsrf.mockImplementationOnce(() => Promise.reject('error'));

        const mockCallback = jest.fn();
        const errAction = () => 'errAction';
        await safeApiCall(errAction)(null)(mockCallback);
        expect(mockCallback).toHaveBeenLastCalledWith('errAction');
    });
});
