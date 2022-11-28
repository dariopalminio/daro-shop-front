import { FunctionComponent } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import SessionContextProvider from "app/ui/provider/session-context-provider"
import CartContextProvider from "app/ui/provider/cart-context-provider"
import { ThemeProvider } from "styled-components"
import MainContainer from "app/ui/page/main-container"
import Footer from "app/ui/page/footer"
import SideBar from "app/ui/component/layout/core/sidebar"
import * as GlobalConfig from 'infra/global.config';
import CheckoutContextProvider from "./ui/provider/checkout-context-provider"
import logo from "app/ui/image/logo_app.png";
import Bar from "./ui/component/layout/core/bar"
import {ThemeCore, LayoutCore, LayoutContextProvider, TopNavBar} from "oaky-ui-kit";

/**
 * App
 * 
 * @visibleName Daro-Shop-Front
 * @version 1.0.0
 * @author [Dario Palminio]
 */
const App: FunctionComponent = () => {

  const getLogoImage = () => {
    return (
      <img style={{ marginRight: "10px" }}
      src={logo}
      onError={({ currentTarget }) => {
          currentTarget.onerror = null; // prevents looping
          currentTarget.src = "../images/no-image.jpg";
      }}
      loading="lazy" />
    )
  }

  return (
    <Router>
      <SessionContextProvider>
        <ThemeProvider theme={ThemeCore}>
          <CartContextProvider>
            <CheckoutContextProvider>
              <LayoutContextProvider>
                <LayoutCore
                  topbar={<TopNavBar logo={getLogoImage()} bar={<Bar />} />}
                  leftbar={<SideBar style={{ background: "#F9F9F9" }}></SideBar>}
                  footer={<Footer companyName={GlobalConfig.app_company_name} />}
                >
                  <MainContainer />
                </LayoutCore>
              </LayoutContextProvider>
            </CheckoutContextProvider>
          </CartContextProvider>
        </ThemeProvider>
      </SessionContextProvider>
    </Router>
  )
}

export default App;
