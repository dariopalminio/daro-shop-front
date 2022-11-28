import { useContext } from "react";
import SessionContext, { ISessionContext } from "domain/context/session.context";
//https://react-icons.github.io/react-icons/icons?name=ri
import { RiEarthLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";
import { MenuItemType, AccessType, MenuIconButton } from "oaky-ui-kit";

interface Props {
  menuList?: MenuItemType[];
  style?: any;
}

/**
 * TopNavBar Function Component.
 * Header component.
 * @visibleName TopNavBar View
 */
const LanguageSelector: React.FC<Props> = () => {


  const { permission } = useContext(SessionContext) as ISessionContext;
  const { t, i18n } = useTranslation();

  const SubMenuLang: MenuItemType[] = [
    {
      key: "1",
      title: 'es',
      path: "#",
      icon: null,
      access: [AccessType.ANONYMOUS, AccessType.USER, AccessType.ADMIN],
      submenu: null
    },
    {
      key: "2",
      title: 'en',
      path: "#",
      icon: null,
      access: [AccessType.ANONYMOUS, AccessType.USER, AccessType.ADMIN],
      submenu: null
    }
  ];

  const LngButton: MenuItemType[] = [
    {
      key: "1",
      title: '',
      path: "#",
      icon: <RiEarthLine size={24} />,
      access: [AccessType.ANONYMOUS, AccessType.USER, AccessType.ADMIN],
      submenu: SubMenuLang
    }
  ];

  const changeLanguage = (itemElement: MenuItemType) => {
    if (itemElement && itemElement.title && itemElement.title.trim() !== '') {
      const lng = itemElement.title;
      i18n.changeLanguage(lng);
    }
  };

  return (
    <>
      <MenuIconButton
        permission={permission}
        menuList={LngButton}
        onClick={(itemElement: MenuItemType) => changeLanguage(itemElement)} />
    </>

  );
};

export default LanguageSelector;