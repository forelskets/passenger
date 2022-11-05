import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./protectedRoutes";

import Home from "../components/home";
import Landing from "../components/landing";
import Login from "../components/login";
import Register from "../components/register";
import ResetPassword from "../components/resetPassword";
import NewBooking from "../components/newBookings";
import MyBookings from "../components/myBookings";
import Profile from "../components/myProfile";
import PurchaseOyseterCard from "../components/purchaseOyster";
import PurchaseOyseter from "../components/purchaseOysterCard";
import SearchBooking from "../components/searchBookings";
import BookingDetails from "../components/myBookings/bookingDetails";
import PaymentAddCard from "../components/payment.js";
import PaymentShipping from "../components/payment.js/paymentShipping";
import PaymentRemovedCard from "../components/payment.js/paymentRemovecard";
import AddCardDetails from "../components/addCarddetails";
import SeasonTickets from "../components/seasonTickets";
import ChangePassword from "../components/changepassword";
import EditProfile from "../components/myProfile/editProfile";
import PaymentBooking from "../components/payment.js/paymentBooking";
import CardDetails from "../components/addCarddetails/carddetails";
import Finance from "../components/finance";
import AboutUs from "../components/about";
import Investors from "../components/investors";
import Press from "../components/press";
import Careers from "../components/careers";
import TermsConditions from "../components/termsCondition";
import PrivacyPolicy from "../components/privacyPolicy";
import Facts from "../components/faq";
import ContactUs from "../components/contactUs";
import SearchResult from "../components/searchResult";
import SearchResultFlexi from "../components/searchResultFlexi";
import Traveller from "../components/traveller";
import Basket from "../components/basket";
import BasketFlexi from "../components/basketFlexi";
import FullFillment from "../components/fullfillment";
import Delivery from "../components/delivery";
import DeliveryFlexi from "../components/deliveryFlexi";
import PaymentOrder from "../components/paymentOrder";
import OrderManager from "../components/orderManage";
import OysterPaymentBooking from "../components/purchaseOysterCard/oysterPaymentBooking";
function CommonRoutes() {
  let query = window.location.search;
  query = new URLSearchParams(window.location.search).get("userId");
  console.log("this is query = ", query);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing title="The PassengerHub" />} />
        {/* <Route path="/landing" element={<Landing title="Home" />} /> */}
        <Route path="/*" element={<Navigate to="/" />} />
        <Route
          exact
          path="/newBookings"
          element={<NewBooking title="The PassengerHub" />}
        />
         {/* <Route path="/purchaseoyster" element={<PurchaseOyseterCard />} /> */}
         <Route path="/purchaseoyster" element={<PurchaseOyseter />} />
       <Route
          path="/oysterPaymentBooking"
          element={<OysterPaymentBooking />}
        />
        <Route
          exact
          path="/finance"
          element={<Finance title="The PassengerHub" />}
        />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/landing" element={<Landing />} />
        <Route exact path="/about" element={<AboutUs />} />
        <Route exact path="/investors" element={<Investors />} />
        <Route exact path="/careers" element={<Careers />} />
        <Route exact path="/press" element={<Press />} />
        <Route exact path="/terms" element={<TermsConditions />} />
        <Route exact path="/privacyPolicy" element={<PrivacyPolicy />} />
        <Route exact path="/faq" element={<Facts />} />
        <Route exact path="/contactUs" element={<ContactUs />} />
        <Route exact path="/searchResult" element={<SearchResult />} />
        
        <Route exact path="/basket" element={<Basket />} />
       
        <Route exact path="/delivery" element={<Delivery />} />
        <Route
          exact
          path="/searchResultFlexi"
          element={<SearchResultFlexi />}
        />
        <Route exact path="/basketFlexi" element={<BasketFlexi />} />
        <Route exact path="/deliveryFlexi" element={<DeliveryFlexi />} />
        <Route exact path="/traveller" element={<Traveller />} />
        <Route exact path="/fullfillment" element={<FullFillment />} />
        <Route exact path="/paymentOrder" element={<PaymentOrder />} />
        <Route exact path="/orderManager" element={<OrderManager />} />

        {/*Public Route without localStorage only */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              {console.log("this is event = login")}
              <Login title="The PassengerHub" />
            </PublicRoute>
          }
        />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/resetPassword"
          element={
            query ? (
              <PublicRoute>
                <ResetPassword />
              </PublicRoute>
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/newBookings"
          element={
            <PublicRoute>
              <NewBooking title="The PassengerHub" />
            </PublicRoute>
          }
        />
        {/* <Route path="/purchaseoyster"
          element={
            <PublicRoute>
              <PurchaseOyseterCard />
            </PublicRoute>
          }
        /> */}

        {/* protected routes */}

        <Route
          exact
          path="/search"
          element={
            <PrivateRoute>
              <SearchBooking />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/myBookings"
          element={
            <PrivateRoute>
              <MyBookings title="The PassengerHub" />
            </PrivateRoute>
          }
        />
        <Route
          exact
          path="/bookingdetails"
          element={
            <PrivateRoute>
              <BookingDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/bookingdetails"
          element={
            <PrivateRoute>
              <BookingDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/bookingdetails"
          element={
            <PrivateRoute>
              <BookingDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/longduartionbookingdetails"
          element={
            <PrivateRoute>
              <BookingDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/bookingdetails"
          element={
            <PrivateRoute>
              <BookingDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/Profile"
          element={
            <PrivateRoute>
              <Profile title="The PassengerHub" />
            </PrivateRoute>
          }
        />
        <Route
          path="/Paymentaddcard"
          element={
            <PrivateRoute>
              <PaymentAddCard />
            </PrivateRoute>
          }
        />
        <Route
          path="/Paymentshipping"
          element={
            <PrivateRoute>
              <PaymentShipping />
            </PrivateRoute>
          }
        />
        <Route
          path="/paymentremovedcard"
          element={
            <PrivateRoute>
              <PaymentRemovedCard />
            </PrivateRoute>
          }
        />
        <Route
          path="/seasontickets"
          element={
            <PrivateRoute>
              <SeasonTickets />
            </PrivateRoute>
          }
        />
        <Route
          path="/changepassword"
          element={
            <PrivateRoute>
              <ChangePassword />
            </PrivateRoute>
          }
        />
        <Route
          path="/EditProfile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/paymentbooking"
          element={
            <PrivateRoute>
              <PaymentBooking />
            </PrivateRoute>
          }
        />
        <Route
          path="/addcarddetails"
          element={
            <PrivateRoute>
              <AddCardDetails />
            </PrivateRoute>
          }
        />
        <Route
          path="/carddetails"
          element={
            <PrivateRoute>
              <CardDetails />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default CommonRoutes;
