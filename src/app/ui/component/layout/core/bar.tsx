import styled from "styled-components";
import LanguageSelector from "../../language/languages-selector";
import CartTopMenu from "./cart-top-menu";
import SessionContext, { ISessionContext } from "domain/context/session.context";
import { useContext } from "react";
import { RiAccountCircleFill } from "react-icons/ri";
import { RiShieldUserFill } from "react-icons/ri";
import { RiUserAddFill } from "react-icons/ri";
import { RiUserSearchFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { MenuIconButton, MenuItemType, AccessType } from "daro-ui-kit";
import { useLocation, useNavigate } from "react-router-dom";

const TopMenuContainer = styled.div`
  position: relative;
  width: 100%;
  right: 30px;
  margin-right: 30px;
  left: 5px;
  display: flex; 
  align-items: center;
  justify-content: right;
`;

const Bar: React.FC = () => {
  const { permission } = useContext(SessionContext) as ISessionContext;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  const SubMenuUser: MenuItemType[] = [
    {
      key: "11",
      title: t("menu.login"),
      path: "/user/login",
      icon: <RiShieldUserFill />,
      access: [AccessType.ANONYMOUS],
      submenu: null
    },
    {
      key: "12",
      title: t("menu.logout"),
      path: "/user/logout",
      icon: <RiShieldUserFill />,
      access: [AccessType.USER, AccessType.ADMIN],
      submenu: null
    },
    {
      key: "13",
      title: t("menu.register"),
      path: "/user/register/form",
      icon: <RiUserAddFill />,
      access: [AccessType.ANONYMOUS],
      submenu: null
    },
    {
      key: "14",
      title: t("menu.profile"),
      path: "/profile",
      icon: <RiUserSearchFill />,
      access: [AccessType.ANONYMOUS, AccessType.USER, AccessType.ADMIN],
      submenu: null
    },
  ];

  const UserTopMenuData: MenuItemType[] = [
    {
      key: "15",
      title: t("menu.user"),
      path: "/",
      icon: <RiAccountCircleFill size={24} />,
      access: [AccessType.ANONYMOUS, AccessType.USER, AccessType.ADMIN],
      submenu: SubMenuUser
    },
  ];

  const handleClick = (item: MenuItemType) => {
    const redirectToPath: string = item.path;
    navigate(redirectToPath, { state: location }); // programmatically redirect
  }

  return (
    <TopMenuContainer>
      <LanguageSelector />
      <MenuIconButton 
      permission={permission} 
      menuList={UserTopMenuData} 
      onClick={(item: MenuItemType) => handleClick(item)}
      />
      <CartTopMenu />
    </TopMenuContainer>
  );
};

export default Bar;