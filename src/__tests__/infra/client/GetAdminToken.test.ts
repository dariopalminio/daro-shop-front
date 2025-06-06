import { cleanup } from '@testing-library/react';
import axios, { AxiosResponse } from 'axios';
//import getAdminTokenService from '../../../../origin/client/user/GetAdminTokenService';

import { AuthApiClientFactory } from 'infra/client/factory/auth-api-client.factory';
import { IAuthTokensClient } from '../../../domain/outgoing/auth-tokens-client.interface';
//const authService: IAuthService = AuthServiceFactory.create();

describe('Test UserService service', () => {

    afterEach(cleanup);

    test('Acquire Admin Access Token with Client Credentials Grant, mocking axios OK request, should be SUCCESSFUL and responses a JWT', async () => {
        const authService: IAuthTokensClient = AuthApiClientFactory.create(false);
        const jwtExample = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJ0b3B0YWwuY29tIiwiZXhwIjoxNDI2NDIwODAwLCJodHRwOi8vdG9wdGFsLmNvbS9qd3RfY2xhaW1zL2lzX2FkbWluIjp0cnVlLCJjb21wYW55IjoiVG9wdGFsIiwiYXdlc29tZSI6dHJ1ZX0.yRQYnWzskCZUxPwaQupWkiUzKELZ49eM7oWxAQK_ZXw';

        const responseOKMocked: AxiosResponse = {
            data: { access_token: jwtExample },
            status: 200,
            statusText: "OK",
            headers: {},
            config: {},
            request: {}
        };

        const myMock = jest.fn();

        axios.post = myMock.mockResolvedValue(responseOKMocked);

        let authorized = false;
        let jwtResult = "";
        let error = null;

        await authService.getAdminTokenService().then(jwt => {
            authorized = true;
            jwtResult = jwt;
        }).catch(err => {
            error = err;
        })

        expect(authorized).toBe(true);
        expect(jwtResult).toBe(jwtExample);
        expect(error).toBeNull;
    });

});