import { SessionType } from "domain/model/auth/session.type";
import { Tokens } from "domain/model/auth/tokens.type";
var jws = require('jws');

/**
 * Decode JWT and return data from payload in SessionType value.
 * @param jwt Jason Web Token
 * @returns SessionType object
 */
export const convertJwtToSessionType = (tokens: Tokens) => {
    let jwtDecoded;
    try {
        jwtDecoded = jws.decode(tokens.access_token);
        if (!jwtDecoded || !jwtDecoded.payload) throw Error("Error decoding the JWT: Does not exist payload!");
    } catch (error: any) {
        console.log('JWT decoding:', error.message);
        throw error;
    }

    const payload = jwtDecoded.payload;

    let theRoles: Array<string> = []; //By default it is anonymous with no roles
    if (payload.roles && Array.isArray(payload.roles)) theRoles = payload.roles;

    const userSessionData: SessionType = {
        createdTimestamp: '', //TODO
        access_token: tokens.access_token ? tokens.access_token : null,
        refresh_token: tokens.refresh_token ? tokens.refresh_token : null,
        expires_in: tokens.expires_in ? tokens.expires_in : 0,
        refresh_expires_in: tokens.refresh_expires_in ? tokens.refresh_expires_in : 0,
        date: tokens.date ? tokens.date : null,
        isLogged: payload.email_verified ? payload.email_verified : false, //If email ferified is logged
        email: payload.email ? payload.email : '',
        email_verified: payload.email_verified ? payload.email_verified : false,
        given_name: payload.username ? payload.username : '',
        preferred_username: payload.username ? payload.username : '',
        userId: payload.sub ? payload.sub : '',
        roles: theRoles,
        firstName: payload.firstName ? payload.firstName : '',
        lastName: payload.lastName ? payload.lastName : ''
    };
    return userSessionData;
};