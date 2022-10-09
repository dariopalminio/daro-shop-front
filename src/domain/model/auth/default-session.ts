import { SessionType } from "./session.type";

// Global user default value
export const DefaultSession: SessionType = {
    access_token: null,
    refresh_token: null,
    isLogged: false,
    email: "",
    email_verified: false,
    userName: "",
    userId: "", // sub is the ID userId
    roles: [],
    firstName: '',
    lastName: ''
  };