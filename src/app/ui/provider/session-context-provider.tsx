import { FC, useEffect } from "react";
import SessionContext from "domain/context/session.context";
import { useSession } from "domain/hook/auth/session.hook";

interface Props {children?: React.ReactNode}

/**
 * Session Context Provider
 */
const SessionContextProvider: FC<Props> = ({ children }) => {
  const {session,
    setNewSession,
    removeSessionValue,
    permission} = useSession();

  useEffect(() => {

  }, []);

  return (
    <SessionContext.Provider
      value={{
        session,
        setNewSession,
        removeSessionValue,
        permission
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionContextProvider;
