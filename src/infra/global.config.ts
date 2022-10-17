import GlobalFactory from './global-factory';


export const environment = import.meta.env.VITE_FE_ENV;

export const defaultCountry: string = import.meta.env.VITE_FE_DEFAULT_COUNTRY as string;
export const defaultMoney: string = import.meta.env.VITE_FE_DEFAULT_MONEY as string;


export const is_fake_mode = ((import.meta.env.VITE_FE_FAKE === 'true') ? true : false) as boolean;

export const urlImages = (import.meta.env.VITE_FE_URL_STATIC_IMG ? import.meta.env.VITE_FE_URL_STATIC_IMG : 'No_URL_Configured') as string;

export const APIEndpoints = {
  notifications: import.meta.env.VITE_FE_NOTIFICATION_API as string,
  auth: import.meta.env.VITE_FE_API_AUTH as string,
  users: import.meta.env.VITE_FE_API_USER as string,
  products:  import.meta.env.VITE_FE_API_PRODUCTS as string,
  profiles: import.meta.env.VITE_FE_API_PROFILES as string,
  shipping: import.meta.env.VITE_FE_API_SHIPPING as string,
};

export const Auth = {
  realm: import.meta.env.VITE_FE_AUTH_REALM as string,
  client_id: import.meta.env.VITE_FE_AUTH_CLIENT_ID as string,
  client_secret: import.meta.env.VITE_FE_AUTH_CLIENT_SECRET as string,
  username_admin: import.meta.env.VITE_FE_AUTH_USERNAME_ADMIN as string,
  password_admin:  import.meta.env.VITE_FE_AUTH_PASSWORD_ADMIN as string,
  verify_email:  ((import.meta.env.VITE_FE_AUTH_VERIFY_EMAIL === 'true') ? true : false) as boolean,
};

export const app_url = (import.meta.env.VITE_FE_URL ? import.meta.env.VITE_FE_URL : 'http://localhost:3000') as string;

export const app_company_name = (import.meta.env.VITE_FE_COMPANY_NAME ? import.meta.env.VITE_FE_COMPANY_NAME : 'Daro 2021') as string;

export const clientId = import.meta.env.VITE_FE_AUTH_CLIENT_ID;

export const Factory = GlobalFactory();


