import { FunctionComponent, useContext } from "react";
import SessionContext, {
  ISessionContext,
} from "domain/context/session.context";
import AnonymousProfile from "../../../component/user/profile/anonymous-profile";
import UserProfile from "./user-profile";

/**
 * Profile Page
 * 
 * Pattern: Container Component (Stateful/Container/Smart component), Conditional Rendering and Context Provider
 */
const ProfilePage: FunctionComponent = () => {
  const { session } = useContext(SessionContext) as ISessionContext;


  const isNotLogged = () => {
    return !session || !session.isLogged;
  };

  return (
      <div className="page_container"  data-testid="page_container_profile">

        {isNotLogged() && <AnonymousProfile redirectTo="profile"/>}

        <UserProfile />

      </div>
  );
};

export default ProfilePage;