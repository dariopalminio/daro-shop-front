import { Tokens } from '../../../../domain/model/auth/tokens.type';
import { IAuthClient } from '../../../../domain/service/auth-client.interface';

/**
 * Stub factory function
 * This simulates a AuthApiClient with fail responses
 * @returns export default function ApiAuthClientImpl(): IAuthClient {
 */
export default function ApiAuthClientStub(): IAuthClient {

    function register(
        username: string,
        firstName: string,
        lastName: string,
        email: string,
        password: string): Promise<any> {
        return new Promise<number>((resolve, reject) => {
            const data: any = {
                "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2RiYmU5NWNjNTY1YTBjNzMxMzcyYiIsInR5cCI6IkJlYXJlciIsInJvbGVzIjpbIlVzZXIiXSwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJzdE5hbWUiOiJjb2xvY29sbyIsImxhc3ROYW1lIjoiY29sb2NvbG8iLCJ1c2VybmFtZSI6ImNvbG9jb2xvQGdtYWlsLmNvbSIsImVtYWlsIjoiY29sb2NvbG9AZ21haWwuY29tIiwiaWF0IjoxNjY0OTkwMTg1LCJleHAiOjE2NjUwNzY1ODUsImF1ZCI6IkRhcmlvIFBhbG1pbmlvIiwiaXNzIjoiRGFyaW8gUGFsbWluaW8iLCJzdWIiOiI2MzNkYmJlOTVjYzU2NWEwYzczMTM3MmIifQ.Hjl24mQvx3TWGiR1apmzJ-fD1F0WH85UrzbwEYjtyXI2KODVXFK3hIZ0krfVnxeEaMyokgQp_4t8YLTKv13v4LdDoO7Ctgl_3SPvFOazHqcbZ1G-eK1MYsFaCHX1ntHrK718Q4igKCxfS2pyoUJ6dlGoo-22yZtTJCJAvc39aRo",
                "expires_in": 86400,
                "refresh_expires_in": 86400,
                "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2RiYmU5NWNjNTY1YTBjNzMxMzcyYiIsInR5cCI6IkJlYXJlciIsInJvbGVzIjpbIlVzZXIiXSwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJzdE5hbWUiOiJjb2xvY29sbyIsImxhc3ROYW1lIjoiY29sb2NvbG8iLCJ1c2VybmFtZSI6ImNvbG9jb2xvQGdtYWlsLmNvbSIsImVtYWlsIjoiY29sb2NvbG9AZ21haWwuY29tIiwiaWF0IjoxNjY0OTkwMTg1LCJleHAiOjE2NjUxNjI5ODUsImF1ZCI6IkRhcmlvIFBhbG1pbmlvIiwiaXNzIjoiRGFyaW8gUGFsbWluaW8iLCJzdWIiOiI2MzNkYmJlOTVjYzU2NWEwYzczMTM3MmIifQ.HFzj2500Z5Ab6_AiKOjMC5KQHr_1BNETdy--SvrPa0KFc2eCQ3tWq_aRNCacKXvMa5uXb1-Sk5pSKGdEKtqgpV5lmWUToz9mcbtD59Aj2bQVs4OAnk3RNSQGNvOg4dxIfBpgg9YCsyDFX8A-1Yh5P23VEqu0NTjrBGH6qyVu_dk",
                "token_type": "Bearer",
                "not-before-policy": 0,
                "session_state": "",
                "scope": "profile email"
            };
            resolve(data);
        });
    };

    function loginService(username: string, pass: string): Promise<Tokens> {
        return new Promise<Tokens>((resolve, reject) => {
            const data: any = {
                "access_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2UxNTZiYjA3MDg0OTBkNzhmMjNjNSIsInR5cCI6IkJlYXJlciIsInJvbGVzIjpbIlVzZXIiXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcnN0TmFtZSI6IkNob3kiLCJsYXN0TmFtZSI6IkRhcmlvIEFuZHJlcyIsInVzZXJOYW1lIjoiZGFyaW9wYWxtaW5pb0BnbWFpbC5jb20iLCJlbWFpbCI6ImRhcmlvcGFsbWluaW9AZ21haWwuY29tIiwiaWF0IjoxNjY1Mjg0MDE2LCJleHAiOjE2NjUzNzA0MTYsImF1ZCI6IkRhcmlvIFBhbG1pbmlvIiwiaXNzIjoiRGFyaW8gUGFsbWluaW8iLCJzdWIiOiI2MzNlMTU2YmIwNzA4NDkwZDc4ZjIzYzUifQ.a5AOJpxEnMMw0CO6un2y1Dm48Wfx-nNyPnIxhABXBUid_-RjLkBEwTpr4pIQ4pqOXa6SFJL8SKwK0u9nDYKqDzUV6fmwUXo8FGvp7Vc3RbfDTjDu9x5Ciy3xJaorIPtV20JX_MYqfSk_h_ymJCuDQ5-uaw-WkycfWGyzwY3hR2M",
                "expires_in": 86400,
                "refresh_expires_in": 86400,
                "refresh_token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzM2UxNTZiYjA3MDg0OTBkNzhmMjNjNSIsInR5cCI6IkJlYXJlciIsInJvbGVzIjpbIlVzZXIiXSwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcnN0TmFtZSI6IkNob3kiLCJsYXN0TmFtZSI6IkRhcmlvIEFuZHJlcyIsInVzZXJOYW1lIjoiZGFyaW9wYWxtaW5pb0BnbWFpbC5jb20iLCJlbWFpbCI6ImRhcmlvcGFsbWluaW9AZ21haWwuY29tIiwiaWF0IjoxNjY1Mjg0MDE2LCJleHAiOjE2NjU0NTY4MTYsImF1ZCI6IkRhcmlvIFBhbG1pbmlvIiwiaXNzIjoiRGFyaW8gUGFsbWluaW8iLCJzdWIiOiI2MzNlMTU2YmIwNzA4NDkwZDc4ZjIzYzUifQ.yCfFfA_W8TGQuoyiJ96edWKVstHKDrt11a03qlIrtFRsyCxKjBc15-c9RBYnyID6SWY4nssSpKzzvMPaYhaTKIasv3Cwe8KSVzjGZVmxnl6OtqYiQ-PXkG2C3W85eTaVqsmtzSQAffEH3EqvGttYGuo-orgo3kBEgBQK_0XLV0Q",
                "token_type": "Bearer",
                "not-before-policy": 0,
                "session_state": "",
                "scope": "profile email"
            };
            resolve(data);
        });
    };

    function sendStartEmailConfirm(
        name: string,
        email: string,
        verificationPageLink: string,
        lang: string): Promise<any> {
        return new Promise<number>((resolve, reject) => {
            const response: any = {
                "isSuccess": true,
                "status": 200,
                "message": "auth.MESSAGE.SENT_VERIFICATION_EMAIL_SUCCESS",
                "data": {
                    "accepted": [
                        "mariadelcarmenchoy@gmail.com"
                    ],
                    "rejected": [],
                    "envelopeTime": 809,
                    "messageTime": 1128,
                    "messageSize": 1155,
                    "response": "250 2.0.0 OK  1664308145 e14-20020a056870238e00b0011e73536301sm1277790oap.52 - gsmtp",
                    "envelope": {
                        "from": "dariopalminio@gmail.com",
                        "to": [
                            "mariadelcarmenchoy@gmail.com"
                        ]
                    },
                    "messageId": "<5071a9ee-dd07-1aee-e6dc-d1916b8e0181@gmail.com>"
                }
            };
            resolve(response);
        });
    };

    function confirmAccount(
        token: string,
        lang: string): Promise<any> {
        return new Promise<number>((resolve, reject) => {
            const response: any = {
                "data": {
                    "message": "auth.MESSAGE.CONFIRM_WAS_SUCCESS"
                },
                "status": 200,
                "statusText": "OK",
                "headers": {
                    "content-length": "46",
                    "content-type": "application/json; charset=utf-8"
                },
                "config": {
                    "url": "http://localhost:3001/api/webshop/v1/auth/register/confirm",
                    "method": "post",
                    "data": "{\"token\":\":bWFyaWFkZWxjYXJtZW5jaG95QGdtYWlsLmNvbXw1ZTI3OGViMy1lNmJjLTQ5ZTAtOGY4OS1hYmU4ODM3ZTE3OWQ=\"}",
                    "headers": {
                        "Accept": "application/json, text/plain, */*",
                        "Content-Type": "application/json;charset=utf-8",
                        "Authorization": "Bearer eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI4Tmo4RmZUODZOZXRNZXpoWWZrbDZ5VTJMWW1QOWFrUUltLWlid2ZKejJZIn0.eyJleHAiOjE2NjQzMDgzNzksImlhdCI6MTY2NDMwODI1OSwianRpIjoiZjdmYzE5ODAtN2NlZi00YzNjLWFmOTktYWI2NzVmNjRjMTIzIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL2F1dGgvcmVhbG1zL215LXJlYWxtLXRlc3QiLCJhdWQiOiJyZWFsbS1tYW5hZ2VtZW50Iiwic3ViIjoiMTljNDc0YjktYThlZS00NWU1LTllZDktOTJkMmJmMTU4Y2Y2IiwidHlwIjoiQmVhcmVyIiwiYXpwIjoicmVzdC1jbGllbnQtdGVzdCIsInNlc3Npb25fc3RhdGUiOiJlNzE1NTQ0My04MWU5LTQ3ZTAtYTgwNy1mMGEyODI0ZjQzYmEiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIioiXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImFwcC1hZG1pbiIsImFwcC11c2VyIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsicmVhbG0tbWFuYWdlbWVudCI6eyJyb2xlcyI6WyJtYW5hZ2UtdXNlcnMiLCJ2aWV3LXVzZXJzIiwicXVlcnktZ3JvdXBzIiwicXVlcnktdXNlcnMiXX0sInJlc3QtY2xpZW50LXRlc3QiOnsicm9sZXMiOlsidW1hX3Byb3RlY3Rpb24iLCJhZG1pbiIsInVzZXIiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJEYXJpbyBQYWxtaW5pbyIsInByZWZlcnJlZF91c2VybmFtZSI6ImRhcmlvcGFsbWluaW9AaG90bWFpbC5jb20iLCJnaXZlbl9uYW1lIjoiRGFyaW8iLCJmYW1pbHlfbmFtZSI6IlBhbG1pbmlvIiwiZW1haWwiOiJkYXJpb3BhbG1pbmlvQGhvdG1haWwuY29tIn0.AHK_15BDGW2L4EyrCwMEP-eQS9xEcFul9k4oIlBujcyKsw6L9MIqCIrjXWwlvuzYLllrendDpP7H4FiUreLnWUat9AANcz6flDKxACbF57k5Lx9s1szJ7cyfwCXFX5IG2iQFfQz--pYYvXgT1nsfzTTeT6bjNHnZIgkVuHIvzCJWlm3sw04SisF2ltJfEfqZPzLX8O2ZByryR0s7d458OFp6mUAhh3RNUYKrkzyv7_baRBEOvV4BL1ElmBxgtDjjlq1pvoIhmq4d-W8i1nfFF8KhPKctkh2c5Y6WRQEDnBXb29DtxlTHTW8scwPxW0lBhQMr8-_iWq0HikDdOs4tYA",
                        "lang": "en"
                    },
                    "transformRequest": [
                        null
                    ],
                    "transformResponse": [
                        null
                    ],
                    "timeout": 0,
                    "xsrfCookieName": "XSRF-TOKEN",
                    "xsrfHeaderName": "X-XSRF-TOKEN",
                    "maxContentLength": -1,
                    "maxBodyLength": -1
                },
                "request": {}
            };
            resolve(response);
        });
    };

    function sendEmailToRecoveryPass(
        email: string,
        recoveryPageLink: string,
        lang: string): Promise<any> {
        return new Promise<number>((resolve, reject) => {
            const response: any = {
                "isSuccess": true,
                "status": 200,
                "message": "auth.MESSAGE.RECOVERY_EMAIL_SENT",
                "data": {
                    "accepted": [
                        "mariadelcarmenchoy@gmail.com"
                    ],
                    "rejected": [],
                    "envelopeTime": 765,
                    "messageTime": 813,
                    "messageSize": 1395,
                    "response": "250 2.0.0 OK  1664308633 f20-20020a9d5f14000000b0063715f7eef8sm1156333oti.38 - gsmtp",
                    "envelope": {
                        "from": "dariopalminio@gmail.com",
                        "to": [
                            "mariadelcarmenchoy@gmail.com"
                        ]
                    },
                    "messageId": "<a491f1ef-4344-3434-cb1a-cac8b84161df@gmail.com>"
                }
            };
            resolve(response);
        });
    };

    function updatePassword(
        token: string,
        password: string,
        lang: string): Promise<any> {
        return new Promise<number>((resolve, reject) => {
            const data: any = {
                "reseted": true
            };
            resolve(data);
        });
    };

    return {
        register,
        sendStartEmailConfirm,
        confirmAccount,
        loginService,
        sendEmailToRecoveryPass,
        updatePassword
    };
};
