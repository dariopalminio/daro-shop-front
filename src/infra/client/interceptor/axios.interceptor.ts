import * as GlobalConfig from '../../global.config';
import axios from 'axios';
import * as SessionStorage from '../../storage/session.storage';
import { IAuthTokensClient } from 'domain/outgoing/auth-tokens-client.interface';


/**
 * axios instance
 */
let axiosInstance = axios.create();


/**
 * Request header Interceptors
 */
axiosInstance.interceptors.request.use(async (config) => {

  let accessToken = SessionStorage.getAccessToken();
  console.log("interceptors");
  if (!accessToken) {
    console.log("interceptors-->No accessToken");
    try {
      console.log("interceptors-->Tray obtain app token");
      const authTokensClient: IAuthTokensClient = GlobalConfig.Factory.get<IAuthTokensClient>('authTokensClient');
      accessToken = await authTokensClient.getAppTokenService();
    } catch (error: any) {
      throw error;
    }
  }
  console.log("interceptors set config");
  config.headers = { 'Authorization': `Bearer ${accessToken}` };
  // 'lang': lang,}; //i18n.language
  console.log("axios_instance.config:", config);

  return config
}, error => {
  return Promise.reject(error)
})

/**
 * Response Interceptors
 */
axiosInstance.interceptors.response.use((response) => {
  console.log('Interceptor.response: ', response);
  return response
}, async (error) => {
  const config = error.config;
  //console.warn('Error status in interceptor:', error.response.status);
  // return Promise.reject(error)
  if (error.response) {

    if (error.response && error.response.status === 401 && !config._retry) {
      //Request new access token with refresh token
      config._retry = true;
      try {
        const localRefreshToken: string = SessionStorage.getRefreshToken();
        const authTokensClient: IAuthTokensClient = GlobalConfig.Factory.get<IAuthTokensClient>('authTokensClient');
        const res = await authTokensClient.getRefreshTokenService(localRefreshToken);

        if (res?.status === 200) {
          const { access_token, refresh_token } = res.data;
          const session = SessionStorage.recoverySessionFromStorage();
          let newSession = { ...session };
          newSession.access_token = access_token;
          newSession.refresh_token = refresh_token;
          SessionStorage.setSessionToStorage(newSession);
          config.headers = { 'Authorization': `Bearer ${access_token}` };
        }
        return axiosInstance(config);

      } catch (err) {
        return Promise.reject(err)
      }
    }
    return Promise.reject(error);
  } else {
    console.log('Interceptor.error: ', error);
    return Promise.reject(error)
  }
})

export default axiosInstance;