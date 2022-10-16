import React from "react";
import { useTranslation } from "react-i18next";
import { CenteringContainer } from "../common/elements/centering-container";
import AnonymousProfile from "../component/user/profile/anonymous-profile";

/**
 * No Match Page (404 not found)
 */
 const NoMatchPage: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div>
      <CenteringContainer>
      <h1>Error 404</h1>
      </CenteringContainer>

      <CenteringContainer>
      <p>{t('page.not.found')}</p>
      </CenteringContainer>

     <AnonymousProfile redirectTo="home"/>
  </div>
  );
};
export default NoMatchPage;