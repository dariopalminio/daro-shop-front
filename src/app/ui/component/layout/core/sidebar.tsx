import { useContext } from "react";
import styled from "styled-components";
import { RiHome2Fill, RiShieldUserFill, RiUserAddFill } from "react-icons/ri";
import { RiShoppingCart2Fill } from "react-icons/ri";
import { RiFunctionFill } from "react-icons/ri";
import { RiMailSendFill } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import SessionContext, { ISessionContext } from "domain/context/session.context";
import { AccessType, MenuItemType, MenuList } from "oaky-ui-kit";
import { useLocation, useNavigate } from "react-router-dom";

//Styled-components
const SideBarInner = styled.div`
        width: 100%;
        height: 100%;
        margin: 0px;
        background: #F9F9F9;
`;

interface Props {
  menuList?: MenuItemType[];
  style?: any;
}

/**
 * Patterns: Compound Components, Context Provider and Extensible Styles
 */
const SideBar: React.FC<Props> = ({ menuList, style }) => {
  const { permission } = useContext(SessionContext) as ISessionContext;
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  
  const LeftMenuData: MenuItemType[] = [
    {
      key: "11",
      title: t("menu.home"),
      path: "/",
      icon: <RiHome2Fill />,
      access: [AccessType.ANONYMOUS, AccessType.USER, AccessType.ADMIN],
      submenu: null
    },
    {
      key: "12",
      title: t("menu.catalog"),
      path: "/catalog",
      icon: <RiFunctionFill />,
      access: [AccessType.ANONYMOUS, AccessType.USER, AccessType.ADMIN],
      submenu: null
    },
    {
      key: "13",
      title: t("menu.my.cart"),
      path: "/cart",
      icon: <RiShoppingCart2Fill />,
      access: [AccessType.ANONYMOUS, AccessType.USER, AccessType.ADMIN],
      submenu: null
    },
    {
      key: "14",
      title: t("menu.login"),
      path: "/user/login",
      icon: <RiShieldUserFill />,
      access: [AccessType.ANONYMOUS],
      submenu: null
    },
    {
      key: "15",
      title: t("menu.logout"),
      path: "/user/logout",
      icon: <RiShieldUserFill />,
      access: [AccessType.USER, AccessType.ADMIN],
      submenu: null
    },
    {
      key: "16",
      title: t("menu.register"),
      path: "/user/register/form",
      icon: <RiUserAddFill />,
      access: [AccessType.ANONYMOUS],
      submenu: null
    },
    {
      key: "17",
      title: t("menu.contact"),
      path: "/contact",
      icon: <RiMailSendFill />,
      access: [AccessType.ANONYMOUS, AccessType.USER, AccessType.ADMIN],
      submenu: null
    }
  ];

  const handleClick = (item: MenuItemType) => {
    const redirectToPath: string = item.path;
    navigate(redirectToPath, { state: location }); // programmatically redirect
  }
  
  return (
    <SideBarInner style={style ? style : {}}>
      <MenuList
        onClick={(item: MenuItemType) => handleClick(item)}
        id="MenuLeft"
        permission={permission}
        menuList={LeftMenuData}></MenuList>
    </SideBarInner>
  );
};

export default SideBar;