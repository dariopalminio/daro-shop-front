import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { CenteringContainer } from "../common/elements/centering-container";
import AnonymousProfile from "../component/user/profile/anonymous-profile";




/**
 * CartItem
 * 
 * Pattern: Presentation Component and Controled Component
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