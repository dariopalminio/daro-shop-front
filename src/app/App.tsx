import { FunctionComponent } from "react"
import { BrowserRouter as Router } from "react-router-dom"
import SessionContextProvider from "app/ui/provider/session-context-provider"
import CartContextProvider from "app/ui/provider/cart-context-provider"
import Layout from "app/ui/common/layout/core/layout"
import LayoutContextProvider from "app/ui/common/layout/layout-context-provider"
import { ThemeProvider } from "styled-components"
import MainContainer from "app/ui/page/main-container"
import TopNavBar from "app/ui/component/layout/core/top-nav-bar"
import Footer from "app/ui/page/footer"
import SideBar from "app/ui/component/layout/core/sidebar"
import * as GlobalConfig from 'infra/global.config';
import Themes from "app/ui/common/themes/themes";
import CheckoutContextProvider from "./ui/provider/checkout-context-provider"

/**
 * App
 * 
 * @visibleName Daro-Shop-Front
 * @version 1.0.0
 * @author [Dario Palminio]
 */
const App: FunctionComponent = () => {

  return (
    <Router>
      <SessionContextProvider>
        <ThemeProvider theme={Themes.primary}>
          <CartContextProvider>
            <CheckoutContextProvider>
              <LayoutContextProvider>
                <Layout
                  topbar={<TopNavBar />}
                  leftbar={<SideBar style={{ background: "#F9F9F9" }}></SideBar>}
                  footer={<Footer companyName={GlobalConfig.app_company_name} />}
                >
                  <MainContainer />
                </Layout>
              </LayoutContextProvider>
            </CheckoutContextProvider>
          </CartContextProvider>
        </ThemeProvider>
      </SessionContextProvider>
    </Router>
  )
}

export default App;
