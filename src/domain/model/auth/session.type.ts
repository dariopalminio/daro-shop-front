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
    ANONYMOUS = "ANONYMOUS",
    USER = "USER",
    ADMIN = "ADMIN",
  }