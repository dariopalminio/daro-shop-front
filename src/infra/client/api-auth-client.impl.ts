import * as GlobalConfig from 'infra/global.config';
import axios, { AxiosPromise } from 'axios';
import { handleAxiosError, ApiError, AuthStatusEnum } from 'infra/client/api.error';
//import qs from 'querystring';
import { IAuthClient } from 'domain/outgoing/auth-client.interface';
import { Tokens } from 'domain/model/auth/tokens.type';
import { IAuthTokensClient } from 'domain/outgoing/auth-tokens-client.interface';

/**
 * Auth Api Client Implementation
 * @returns 
 */
export default function ApiAuthClientImpl(): IAuthClient {

  /**
   * register
   * 
   * @param username 
   * @param firstName 
   * @param lastName 
   * @param email 
   * @param password 
   * @param adminToken 
   * @returns 
   */
  async function register(
    username: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string): Promise<any> {

    const authTokensClient: IAuthTokensClient = GlobalConfig.Factory.get<IAuthTokensClient>('authTokensClient');
    let adminToken: string;
    try {
      adminToken = await authTokensClient.getAdminTokenService();
    } catch (error: any) {
      throw error;
    }

    const body = {
      userName: username,
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };
    console.log("register:", body);

    //User endpoint
    const URL = `${GlobalConfig.APIEndpoints.auth}/register`;
    console.log("url register:", URL);
    const promise: AxiosPromise<any> = axios({
      method: 'post',
      url: URL,
      headers: { 'Authorization': `Bearer ${adminToken}` },
      data: body
    });

    // using .then, create a new promise which extracts the data
    const data: Promise<any> = promise.then((response) =>
      response.data
    ).catch((error) => {
      // response.status !== 200
      const authError: ApiError = handleAxiosError(error);
      throw authError;
    });
    console.log("******REGISTER:", data);
    return data;
  };

  /**
   * Send Start Email confirmation with verification code to register process.
   * @param name 
   * @param email 
   * @param code 
   * @param accessToken 
   * @returns 
   */
  async function sendStartEmailConfirm(
    name: string,
    email: string,
    verificationPageLink: string,
    lang: string
  ): Promise<any> {

    const authTokensClient: IAuthTokensClient = GlobalConfig.Factory.get<IAuthTokensClient>('authTokensClient');
    let adminToken: string;
    try {
      adminToken = await authTokensClient.getAdminTokenService();
    } catch (error: any) {
      throw error;
    }

    //Notification endpoint
    const URL = `${GlobalConfig.APIEndpoints.auth}/register/confirm/start`;

    const promise: AxiosPromise<any> = axios({
      method: 'post',
      url: URL,
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': `application/json`,
        'lang': lang,
      },
      data: {
        'name': name,
        'userName': email,
        'email': email,
        'verificationPageLink': verificationPageLink,
      }
    });

    // Using .then, create a new promise which extracts the data
    const info: Promise<any> = promise
      .then((response) => response.data)
      .catch((error) => {
        const authError: ApiError = handleAxiosError(error);
        if (authError.status === AuthStatusEnum.UNAUTHORIZED) {
          // Request a new token
          //const newAccessToken = accessToken;
          // Do a retry with a new token
          //return sendContactEmailService(contactData, newAccessToken, false);
          throw authError;
        } else {
          throw authError;
        };
      });

    console.log("******sendStartEmailConfirm---info:", info);
    return info;
  };


  /**
   * Confirm Account
   * @param token 
   * @param adminToken 
   * @returns 
   */
  async function confirmAccount(
    token: string,
    lang: string): Promise<any> {
    
    const authTokensClient: IAuthTokensClient = GlobalConfig.Factory.get<IAuthTokensClient>('authTokensClient');
    let adminToken: string;
    try {
      adminToken = await authTokensClient.getAdminTokenService();
    } catch (error: any) {
      throw error;
    }

    const body = {
      token: token,
    };

    console.log("body create user:", body);
    //User endpoint
    const URL = `${GlobalConfig.APIEndpoints.auth}/register/confirm`;

    const promise: AxiosPromise<any> = axios({
      method: 'post',
      url: URL,
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'lang': lang,
      },
      data: body
    });

    // using .then, create a new promise which extracts the data
    const resp: Promise<any> = promise.then((response) =>
      response
    ).catch((error) => {
      // response.status !== 200
      console.log("error:", error);
      const authError: ApiError = handleAxiosError(error);
      throw authError;
    });

    return resp;
  };

  /**
   * 
   * @param username 
   * @param pass 
   * @returns 
   */
  function loginService(username: string, pass: string): Promise<Tokens> {

    const body = {
      userName: username,
      password: pass
    };

    //Login endpoint
    const URL = `${GlobalConfig.APIEndpoints.auth}/tokens/login`;

    const qs = new URLSearchParams(body);

    //post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
    const promise: AxiosPromise<any> = axios.post(URL, qs.toString());

    // using .then, create a new promise which extracts the data
    const tokens: Promise<Tokens> = promise.then((response) => {
      console.log('loginService.response', response);
      return {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
        expires_in: response.data.expires_in,
        refresh_expires_in: response.data.refresh_expires_in,
        date: new Date()
      }
    }
    ).catch((error) => {
      // response.status !== 200
      const authError: ApiError = handleAxiosError(error);
      throw authError;
    });

    return tokens;
  };

  /**
   * Send Start Email with verification code to password recovery process.
   * @param name 
   * @param email 
   * @param recoveryPageLink 
   * @param accessToken 
   * @returns 
   */
  async function sendEmailToRecoveryPass(
    email: string,
    recoveryPageLink: string,
    lang: string): Promise<any> {

    const authTokensClient: IAuthTokensClient = GlobalConfig.Factory.get<IAuthTokensClient>('authTokensClient');
    let adminToken: string;
    try {
      adminToken = await authTokensClient.getAdminTokenService();
    } catch (error: any) {
      throw error;
    }

    //Notification endpoint
    const URL = `${GlobalConfig.APIEndpoints.auth}/recovery/start`;
    console.log("recovery URL:", URL);
    const promise: AxiosPromise<any> = axios({
      method: 'post',
      url: URL,
      headers: {
        'Authorization': `Bearer ${adminToken}`,
        'Content-Type': `application/json`,
        'lang': lang,
      },
      data: {
        'userName': email,
        'email': email,
        'recoveryPageLink': recoveryPageLink,
      }
    });

    // Using .then, create a new promise which extracts the data
    const info: Promise<any> = promise
      .then((response) => response.data)
      .catch((error) => {
        const authError: ApiError = handleAxiosError(error);
        throw authError;
      });

    return info;
  };

  /**
   * Update Password
   * Reset password in recovery process.
   * @param token 
   * @param password 
   * @param adminToken 
   * @returns 
   */
  async function updatePassword(
    token: string,
    password: string,
    lang: string): Promise<any> {

    const authTokensClient: IAuthTokensClient = GlobalConfig.Factory.get<IAuthTokensClient>('authTokensClient');
    let adminToken: string;
      try {
        adminToken = await authTokensClient.getAdminTokenService();
      } catch (error: any) {
        throw error;
    }

    const body = {
      token: token,
      password: password
    };

    //User endpoint
    const URL = `${GlobalConfig.APIEndpoints.auth}/recovery/update`;
    try {
      const response: any = await axios({
        method: 'post',
        url: URL,
        headers: {
          'Authorization': `Bearer ${adminToken}`,
          'lang': lang,
        },
        data: body
      });

      return response.data;
    } catch (err: any) {
      const authError: ApiError = handleAxiosError(err);
      throw authError;
    }
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
