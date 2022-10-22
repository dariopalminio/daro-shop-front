// Global user type
export interface SessionType {
    access_token: (string | null);
    refresh_token: (string | null);
    isLogged: boolean;
    email: string;
    email_verified: boolean;
    userName: string;
    userId: string;
    firstName: string;
    lastName: string;
    roles: Array<string>;
  };

  export enum PermissionType {
    ANONYMOUS = "anonymous", //User not logged
    USER = "user",
    ADMIN = "admin",
    APP = "app",
  }