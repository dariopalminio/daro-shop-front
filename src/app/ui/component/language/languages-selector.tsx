import { FunctionComponent, useContext } from "react";
import logo from "app/ui/image/logo_app.png";
import styled, { useTheme } from "styled-components";
import { RiMenuFill } from "react-icons/ri";
import IconButton from "app/ui/common/icon-button/icon-button";
import { ILayoutContext, LayoutContext } from "app/ui/provider/layout-context-provider";
import MenuIconButton from "app/ui/common/menu-icon-button/menu-icon-button";
import SessionContext, { ISessionContext } from "domain/context/session.context";
import { MenuItemType, AccessType } from "app/ui/common/menu-list/menu-item.type";

//https://react-icons.github.io/react-icons/icons?name=ri
import { RiAccountCircleFill } from "react-icons/ri";
import { RiShieldUserFill } from "react-icons/ri";
import { RiEarthLine } from "react-icons/ri";
import { RiUserSearchFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";

const Topbar = styled.div`
  position: relative;
  display: flex; 
  align-items: center;
  background-image: ${props => props.theme.layout.headerBackgroundImage};
  height: ${props => props.theme.layout.headerHeight}px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
`;

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

const LogoImg = styled.img``;

const containerTopMenuStyle = {
  display: "flex",
  flexGrow: 100,
  marginLeft: "6px",
  justifyContent: "flex-start",
};

interface Props {
  menuList?: MenuItemType[];
  style?: any;
}

/**
 * TopNavBar Function Component.
 * Header component.
 * @visibleName TopNavBar View
 */
const LanguageSelector: React.FC<Props> = ({ menuList, style }) => {
  const theme: any = useTheme();
  const { sidebarWidth,
    isSidebarOpen,
    toggleSidebar } = useContext(LayoutContext) as ILayoutContext;
  const { permission } = useContext(SessionContext) as ISessionContext;
  const { t, i18n } = useTranslation();

  const SubMenuLang: MenuItemType[] = [
    {
      key: "1",
      title: 'es',
      path: "#",
      icon: null,
      access: [AccessType.ANONYMOUS],
      divider: false,
      submenu: null
    },
    {
      key: "2",
      title: 'en',
      path: "#",
      icon: null,
      access: [AccessType.ANONYMOUS],
      divider: false,
      submenu: null
    }
  ];

  const LngButton: MenuItemType[] = [
    {
      key: "1",
      title: '',
      path: "#",
      icon: <RiEarthLine size={24} />,
      access: [AccessType.ANONYMOUS],
      divider: false,
      submenu: SubMenuLang
    }
  ];

  const changeLanguage = (itemElement: MenuItemType) => {
    if (itemElement && itemElement.title && itemElement.title.trim() !==''){
      const lng = itemElement.title;
      i18n.changeLanguage(lng);
    }
  };

  return (
    <>
      <MenuIconButton permission={permission} menuList={LngButton} onClick={(itemElement: MenuItemType)=>changeLanguage(itemElement)}/>
    </>

  );
};

export default LanguageSelector;