
import { FunctionComponent } from "react";
import CatalogPage from "app/ui/page/catalog/catalog.page";
import RadioButtonList from "app/ui/common/select-list-radio-button/radio-button-list";
import AlertPopup from "app/ui/common/alert/alert-popup";


/**
 * HomePage
 */
const HomePage: FunctionComponent = () => {

  return (
    <div className="page_container" data-testid="page_container_home">

      <CatalogPage></CatalogPage>

    </div>
  );
};

export default HomePage;