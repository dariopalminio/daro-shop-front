import { FunctionComponent } from "react";
import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterConfirmEmailPage from "./user/register/register-confirm-email.page";
import PassRecoveryFormPage from "./user/recovery/pass-recovery-form.page";
import ProductDetailPage from "./catalog/product-detail.page";
import Alert from "app/ui/common/alert/alert";
import CircularProgress from "app/ui/common/progress/circular-progress";
import RegisterConfirmStartPage from "./user/register/register-confirm-start.page";
import HomePage from "./home/home.page";
import LoginPage from "./user/auth/login.page";
import CartPage from "./cart/cart.page";
import InformationPage from "./checkout/information.page";
import CatalogPage from "./catalog/catalog.page";
import ContactPage from "./contact/contact.page";
import RegisterPage from "./user/register/register-form.page";
import PassRecoveryStartPage from "./user/recovery/pass-recovery-start.page";
import PassRecoveryMsgPage from "./user/recovery/pass-recovery-msg.page";
import ProfilePage from "./user/profile/profile.page";
import LogoutPage from "./user/auth/logout.page";
import NoMatchPage from "./no-match.page";
import ConfirmationPage from "./checkout/confirmation.page";
import PaymentPage from "./checkout/payment.page";

// lazy loading for components that must get loaded when it is required. 
/*
const HomePage = lazy(() => import("./home/home.page"));
const InformationPage = lazy(() => import("./checkout/information.page"));
const AuthPage = lazy(() => import("./user/auth/auth.page"));
const CartPage = lazy(() => import("./cart/cart.page"));
const CatalogPage = lazy(() => import("./catalog/catalog.page"));
const ContactPage = lazy(() => import("./contact/contact.page"));
const RegisterPage = lazy(() => import("./user/register/register-form.page"));
const RegisterConfirmStartPage = lazy(() => import("./user/register/register-confirm-start.page"));
const PassRecoveryStartPage = lazy(() => import("./user/recovery/pass-recovery-start.page"));
const PassRecoveryMsgPage = lazy(() => import("./user/recovery/pass-recovery-msg.page"));
const ProfilePage = lazy(() => import("./user/profile/profile.page"));
*/

/**
 * Main Container with principals routes
 * 
 * @visibleName MainContainer View
 */
const MainContainer: FunctionComponent = () => {

  try {
    return (
      <div id="MainContainer" className="main-container" data-testid="MainContainer">
      
        <Routes>
          <Route path="/"  element={<HomePage />} />

          <Route path="/home"  element={<HomePage />} />

          <Route path="/user/login"  element={<LoginPage />} />

          <Route path="/user/logout"  element={<LogoutPage />} />

          <Route path="/cart"  element={<CartPage />} />

          <Route path="/checkout/information" element={<InformationPage />} />

          <Route path="/checkout/confirmation" element={<ConfirmationPage />} />

          <Route path="/checkout/payment" element={<PaymentPage />} />

          <Route path="/catalog" element={<CatalogPage />} />

          <Route path="/catalog/product/detail/:productId" element={<ProductDetailPage/>}  />

          <Route path="/contact" element={<ContactPage/>}  />

          <Route path="/user/register/form" element={<RegisterPage/>}  />
  
          <Route path="/user/register/confirm/start" element={<RegisterConfirmStartPage/>} />
          <Route path="/user/register/confirm/:token" element={<RegisterConfirmEmailPage/>} />

          <Route path="/user/recovery/start" element={<PassRecoveryStartPage/>}  />

          <Route path="/user/recovery/msg" element={<PassRecoveryMsgPage/>} />

          <Route path="/user/recovery/form/:token" element={<PassRecoveryFormPage/>} ></Route>
          
          <Route path="/profile" element={<ProfilePage/>} />

          <Route path="*" element={<NoMatchPage />} />

        </Routes>
        
      </div>
    );
  } catch (error: any) {
    return (<Alert severity="error">{error.message}</Alert>)
  }
};

export default MainContainer;
