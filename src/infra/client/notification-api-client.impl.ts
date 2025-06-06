
import * as InfraConfig from 'infra/global.config';
import { AxiosPromise } from 'axios';
import { handleAxiosError, ApiError, AuthStatusEnum } from 'infra/client/api.error';
import { ContactType } from 'domain/model/notification/contact.type';
import { INotificationClient } from 'domain/outgoing/notification-client.interface';
import axiosInstance from 'infra/client/interceptor/axios.interceptor';

/**
 * NotificationApiService implementation 
 * Service as factory function that return an interface.
 * A factory function is any function which is not a class or constructor that returns 
 * a (presumably new) object. In JavaScript, any function can return an object.
 * @returns 
 */
export default function NotificationApiClientImpl(): INotificationClient {

  /**
   * Send Contact Email using notification service.
   * 
   * @param contactData ContactType
   * @param token Valid access token
   * @returns any
   */
  async function sendContactEmailService(contactData: ContactType ): Promise<any> {

    //Notification endpoint
    const URL = `${InfraConfig.APIEndpoints.notifications}/sendContactEmail`;

    const promise: AxiosPromise<any> = axiosInstance({
      method: 'post',
      url: URL,
      headers: {
        'Content-Type': `application/json`,
      },
      data: contactData
    });

    // Using .then, create a new promise which extracts the data
    const info: Promise<any> = promise
      .then((response) => response.data)
      .catch((error) => {
        const authError: ApiError = handleAxiosError(error);
        if (authError.status === AuthStatusEnum.UNAUTHORIZED ){
          console.log("sendContactEmailService-->UNAUTHORIZED!!!");
          throw authError;
        }else{
          console.log("sendContactEmailService-->throw authError!!!");
          authError.message = "Can not send email. ";
          throw authError;
        };
      });

      console.log(info);
      
    return info;
  };

  return {
    sendContactEmailService
  };
};
