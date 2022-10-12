import { SessionType } from "domain/model/auth/session.type";
import { Tokens } from "domain/model/auth/tokens.type";
//var jws = require('jws');

import { isExpired, decodeToken } from "react-jwt";

const payload_fake = {payload: {
    roles: [],
    email_verified: false,
    email: "daro@gmail.com",
    userName: "daro@gmail.com",
    sub: "",
    firstName: "",
    lastName: ""
}};

/**
 * Decode JWT and return data from payload in SessionType value.
 * @param jwt Jason Web Token
 * @returns SessionType object
 */
export const convertJwtToSessionType = (tokens: Tokens) => {
    let jwtDecoded: any;
    try {
        jwtDecoded = decodeToken(tokens.access_token);
        if (!jwtDecoded) throw Error("Error decoding the JWT: Does not exist payload!");
    } catch (error: any) {
        console.log('JWT decoding:', error.message);
        throw error;
    }

    const payload = jwtDecoded;

    let theRoles: Array<string> = []; //By default it is anonymous with no roles
    if (payload.roles && Array.isArray(payload.roles)) theRoles = payload.roles;

    const userSessionData: SessionType = {
        access_token: tokens.access_token ? tokens.access_token : null,
        refresh_token: tokens.refresh_token ? tokens.refresh_token : null,
        isLogged: payload.email_verified ? payload.email_verified : false, //If email ferified is logged
        email: payload.email ? payload.email : '',
        email_verified: payload.email_verified ? payload.email_verified : false,
        userName: payload.userName ? payload.userName : '',
        userId: payload.sub ? payload.sub : '',
        roles: theRoles,
        firstName: payload.firstName ? payload.firstName : '',
        lastName: payload.lastName ? payload.lastName : ''
    };
    return userSessionData;
};