
import { FunctionComponent } from "react";
import CatalogPage from "app/ui/page/catalog/catalog.page";

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