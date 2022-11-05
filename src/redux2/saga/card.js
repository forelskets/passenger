import { put, call } from "redux-saga/effects";
import { toast } from "react-nextjs-toast";

import { addCardDetails, removeCardDetails } from "../../Api/index";
import {
  addCardDetailsSuccess,
  addCardDetailsFailure,
  removeCardDetailsSuccess,
  removeCardDetailsFailure,
  updateCardDetailsState
} from "../actions/card"
import {
  updateAuthenticationState,
  userProfileInitiate
} from "../actions/authentication"
import {
  updateSeasonTktState
} from "../actions/seasonTickets"
import { authenticationAction } from "../actionTypes"

function* loginAgain(result, navigate) {
  yield put({
    type: authenticationAction.API_AUTHENTICATION_FAILED,
  });
  localStorage.clear();
  navigate("/landing");
}

export function* addCardDetailsSaga(action) {
  try {

    console.log("the card = ", action)

    let response = yield call(addCardDetails, action.payload)
    let { result, status } = response
    console.log("this is status = ", response)
    if (status === 1) {
      console.log("first = = = = = ", result)
      console.log("action data = ", action.currentData)
      let updatedDetails
      updatedDetails = action.currentData
      if (action.detailType === 'userDetail' || action.detailType === 'newBooking') {

        updatedDetails.card.brand = result.data.data.brand
        updatedDetails.card.cardExpMonth = result.data.data.cardExpMonth
        updatedDetails.card.cardExpYear = result.data.data.cardExpYear
        updatedDetails.card.cardNumber = result.data.data.cardNumber
        updatedDetails.card.name = result.data.data.name
        yield put(updateAuthenticationState(updatedDetails, "userProfileDetail"))
      } else if (action.detailType === 'seasonDetail') {

        updatedDetails.card.brand = result.data.data.brand
        updatedDetails.card.cardExpMonth = result.data.data.cardExpMonth
        updatedDetails.card.cardExpYear = result.data.data.cardExpYear
        updatedDetails.card.cardNumber = result.data.data.cardNumber
        updatedDetails.card.name = result.data.data.name
        yield put(updateSeasonTktState(updatedDetails, "requestSeasonTktDetails"))
      }
      yield put(addCardDetailsSuccess(result.data.data));
      if (action?.prevPath) {
        action.navigate(`/${action?.prevPath}`)
      }
      //  yield put(userProfileInitiate());
      // action.navigate('/Profile')
      toast.notify(result.data.message, {
        duration: 5,
        type: "success",
      });
    } else {
      console.log("second = = = = = ", result)
      yield put(addCardDetailsFailure(result.data.message));
      toast.notify(result.data.message, {
        duration: 5,
        type: "success",
      });
    }

  } catch (error) {
    if (error?.status === 4) {
      yield call(loginAgain, error.error, action.navigate);
      yield put(addCardDetailsFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    } else {
      console.log("third = = = = = ", error)
      yield put(addCardDetailsFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    }
  }
}

export function* removeCardDetailsSaga(action) {
  try {
    let response = yield call(removeCardDetails)
    let { result, status } = response
    console.log("this is response = ", response)
    if (status === 1) {
      console.log("status 1 = ", result)

      let updatedDetails
      if (action.payload.userProfileDetail) {
        updatedDetails = action.payload.userProfileDetail
        updatedDetails.card.brand = null
        updatedDetails.card.cardExpMonth = null
        updatedDetails.card.cardExpYear = null
        updatedDetails.card.cardNumber = null
        updatedDetails.card.name = null
        updatedDetails.card.stripeCustomerId = null
        yield put(updateAuthenticationState(updatedDetails, "userProfileDetail"))
      } else if (action.payload.requestSeasonTktDetails) {
        updatedDetails = action.payload.requestSeasonTktDetails
        updatedDetails.card.brand = null
        updatedDetails.card.cardExpMonth = null
        updatedDetails.card.cardExpYear = null
        updatedDetails.card.cardNumber = null
        updatedDetails.card.name = null
        updatedDetails.card.stripeCustomerId = null
        yield put(updateSeasonTktState(updatedDetails, "requestSeasonTktDetails"))
      }
      yield put(updateCardDetailsState(false, "addCardSuccess"))
      yield put(removeCardDetailsSuccess(result));
    } else {
      console.log("try else = ", result)
      yield put(removeCardDetailsFailure(result.message));
      toast.notify(result.message, {
        duration: 5,
        type: "error",
      });
    }
  } catch (error) {
    if (error?.status === 4) {
      console.log("catch if = ", error)
      yield call(loginAgain, error.error, action.navigate);
      yield put(removeCardDetailsFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    } else {
      console.log("catch if = ", error)
      yield put(removeCardDetailsFailure(error.error));
    }
  }
}