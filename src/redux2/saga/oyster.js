import { put, call } from "redux-saga/effects";
import { toast } from "react-nextjs-toast";
import { getZonesList, confirmOysterBooking } from "../../Api/index";
import {
  getZonesListSuccess,
  getZonesListFailure,
  purchaseOysterCardSuccess,
  purchaseOysterCardFailure,
  updateOysterCardState
} from "../actions/oyster"
import { updateBookingsState } from "../actions/myBookings"
import { authenticationAction } from "../actionTypes"

function* loginAgain(result, navigate) {
  yield put({
    type: authenticationAction.API_AUTHENTICATION_FAILED,
  });
  localStorage.clear();
  navigate("/landing");
}

export function* getZonesListSaga(action) {
  console.log("action = ", action)
  try {
    let response = yield call(getZonesList, action.payload);

    let { result, status } = response;
    console.log("success = = = = = ", result)
    if (status === 1) {
      yield put(getZonesListSuccess(result.data.list, action.key));
    } else {
      console.log("try = = = = = ", result)
      yield put(getZonesListFailure(result.data.message));
      toast.notify(result.data.message, {
        duration: 5,
        type: "error",
      });
    }
  } catch (error) {
    if (error?.status === 4) {
      yield call(loginAgain, error.error, action.navigate);
      yield put(getZonesListFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    } else {
      console.log("catch = = = = = ", error)
      yield put(getZonesListFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    }
  }
}

export function* purchaseOysterCardSaga(action) {
  // console.log("action = ", action)
  try {
    let response = yield call(confirmOysterBooking, action.payload);

    let { result, status } = response;
    if (status === 1) {
      yield put(purchaseOysterCardSuccess(result.data.data));
      toast.notify(result.data.message, {
        duration: 5,
        type: "success",
      });
      yield put(updateBookingsState(2, 'screenTabFirst'))
      yield put(updateOysterCardState({}, 'prevPageData'))
      action.navigate('/myBookings')
    } else {
      console.log("try = = = = = ", result)
      yield put(purchaseOysterCardFailure(result.data.message));
      toast.notify(result.data.message, {
        duration: 5,
        type: "error",
      });
    }
  } catch (error) {
    if (error?.status === 4) {
      yield call(loginAgain, error.error, action.navigate);
      yield put(purchaseOysterCardFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    } else {
      console.log("catch = = = = = ", error)
      yield put(purchaseOysterCardFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    }
  }
}
