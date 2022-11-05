import { takeLatest } from "redux-saga/effects";

import {
  getZonesSaga,
  getZoneValuesSaga,
  purchaseOysterCardSagas,
} from "./oysterCard";

import {
  authenticationAction,
  myBookingsAction,
  newBookingsAction,
  cardAction,
  seasonTicketAction,
  oysterCardAction,
  oysterAction,
} from "../actionTypes";

import {
  loginSaga,
  registerSaga,
  changePasswordSaga,
  userProfileSaga,
  userProfileEditSaga,
  forgotPasswordSaga,
  forgotLinkVerificationSaga,
  resetPasswordSaga,
  contactUsFormSaga,
} from "./authentication";

import {
  trainBookingsListSaga,
  tubeBookingsListSaga,
  getBookingDetailsSaga,
  cancelBookingSaga,
} from "./myBookings";

import {
  getStationListSaga,
  getAvailableTrainsListSaga,
  getSelectedBookingDetailsSaga,
  confirmTrainBookingsSaga,
} from "./newBookings";

import { addCardDetailsSaga, removeCardDetailsSaga } from "./card";

import {
  requestForSeasonTicketsSaga,
  seasonTicketPaymentTypeUpdateSaga,
  getSeasonTktDetailSaga,
  seasonTktPaymentSaga,
} from "./seasonTickets";

import { purchaseOysterCardSaga, getZonesListSaga } from "./oyster";

export default function* watcherSaga() {
  //Authentication
  yield takeLatest(authenticationAction.USER_LOGIN_INITIATE, loginSaga);
  yield takeLatest(authenticationAction.USER_REGISTER_INITIATE, registerSaga);
  yield takeLatest(
    authenticationAction.CHANGE_PASSWORD_INITIATE,
    changePasswordSaga
  );
  yield takeLatest(authenticationAction.USER_PROFILE_INITIATE, userProfileSaga);
  yield takeLatest(
    authenticationAction.USER_PROFILE_EDIT_INITIATE,
    userProfileEditSaga
  );
  yield takeLatest(
    authenticationAction.FORGOT_PASSWORD_INITIATE,
    forgotPasswordSaga
  );
  yield takeLatest(
    authenticationAction.FORGOT_LINK_VERIFICATION_INITIATE,
    forgotLinkVerificationSaga
  );
  yield takeLatest(
    authenticationAction.RESET_PASSWORD_INITIATE,
    resetPasswordSaga
  );
  yield takeLatest(
    authenticationAction.CONTACT_US_FORM_INITIATE,
    contactUsFormSaga
  );
  //MyBookings
  yield takeLatest(
    myBookingsAction.GET_TUBE_BOOKINGS_INITIATE,
    tubeBookingsListSaga
  );
  yield takeLatest(
    myBookingsAction.GET_TRAIN_BOOKINGS_INITIATE,
    trainBookingsListSaga
  );
  yield takeLatest(
    myBookingsAction.GET_BOOKINGS_DETAILS_INITIATE,
    getBookingDetailsSaga
  );
  yield takeLatest(myBookingsAction.CANCEL_BOOKING_INITIATE, cancelBookingSaga);
  //NewBookings
  yield takeLatest(
    newBookingsAction.GET_STATIONS_LIST_INITIATE,
    getStationListSaga
  );
  yield takeLatest(
    newBookingsAction.SEARCH_TRAINS_LIST_INITIATE,
    getAvailableTrainsListSaga
  );
  yield takeLatest(
    newBookingsAction.GET_SELECTED_BOOKING_DETAIL_INITIATE,
    getSelectedBookingDetailsSaga
  );
  yield takeLatest(
    newBookingsAction.CONFIRM_TRAIN_BOOKING_INITIATE,
    confirmTrainBookingsSaga
  );
  //Card
  yield takeLatest(cardAction.ADD_CARD_DETAILS_INITIATE, addCardDetailsSaga);
  yield takeLatest(
    cardAction.REMOVE_CARD_DETAILS_INITIATE,
    removeCardDetailsSaga
  );
  //Season Tickets
  yield takeLatest(
    seasonTicketAction.REQUEST_SEASON_TICKET_INITIATE,
    requestForSeasonTicketsSaga
  );
  yield takeLatest(
    seasonTicketAction.SEASON_TICKET_UPDATE_PAYMENT_INITIATE,
    seasonTicketPaymentTypeUpdateSaga
  );
  yield takeLatest(
    seasonTicketAction.GET_SEASON_TICKET_DETAIL_INITIATE,
    getSeasonTktDetailSaga
  );
  yield takeLatest(
    seasonTicketAction.SEASON_TICKET_PAYMENT_INITIATE,
    seasonTktPaymentSaga
  );

  //Oyster Card
  yield takeLatest(
    oysterCardAction.OYSTER_CARD_PURCHASE_INITIATE,
    purchaseOysterCardSaga
  );
  yield takeLatest(
    oysterCardAction.GET_OYSTER_ZONES_LIST_INITIATE,
    getZonesListSaga
  );

  // Oyster Card second

  yield takeLatest(oysterAction.GET_OYSTER_ZONE_LIST_INITIATE, getZonesSaga);
  yield takeLatest(
    oysterAction.GET_OYSTER_ZONES_VALUES_INITIATE,
    getZoneValuesSaga
  );
  yield takeLatest(
    oysterAction.OYSTER_CARD_PURCHASE_INITIATES,
    purchaseOysterCardSagas
  );
}
