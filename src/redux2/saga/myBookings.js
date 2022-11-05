import { put, call } from "redux-saga/effects";
import { toast } from "react-nextjs-toast";
import {
  tubeBookingsList,
  trainBookingsList,
  getBookingDetails,
  cancelBooking
} from "../../Api/index";
import {
  getTubeBookingsSuccess,
  getTubeBookingsFailure,
  getTrainBookingsSuccess,
  getTrainBookingsFailure,
  getBookingDetailsSuccess,
  getBookingDetailsFailure,
  cancelBookingSuccess,
  cancelBookingFailure
} from "../actions/myBookings"
import { authenticationAction } from "../actionTypes"

function* loginAgain(result, navigate) {
  yield put({
    type: authenticationAction.API_AUTHENTICATION_FAILED,
  });
  localStorage.clear();
  navigate("/landing");
}

export function* tubeBookingsListSaga(action) {
  // console.log("action = ", action)
  try {
    let response = yield call(tubeBookingsList, action.payload);

    let { result, status } = response;
    if (status === 1) {
      yield put(getTubeBookingsSuccess(result.data.data));
    } else {
      yield put(getTubeBookingsFailure(result.data.message));
      toast.notify(result.data.message, {
        duration: 5,
        type: "error",
      });
    }
  } catch (error) {
    if (error?.status === 4) {
      yield call(loginAgain, error.error, action.navigate);
      yield put(getTubeBookingsFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    } else {
      yield put(getTubeBookingsFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    }
  }
}

export function* trainBookingsListSaga(action) {
  try {
    let response = yield call(trainBookingsList, action.payload);

    let { result, status } = response;
    if (status === 1) {
      console.log("first = = = = = ", result)
      yield put(getTrainBookingsSuccess(result.data.data));
    } else {
      console.log("second = = = = = ", result)
      yield put(getTrainBookingsFailure(result.data.message));
      toast.notify(result.data.message, {
        duration: 5,
        type: "success",
      });
    }
  } catch (error) {
    if (error?.status === 4) {
      yield call(loginAgain, error.error, action.navigate);
      yield put(getTrainBookingsFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    } else {
      console.log("third = = = = = ", error)
      yield put(getTrainBookingsFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    }
  }
}

export function* getBookingDetailsSaga(action) {
  try {
    let response = yield call(getBookingDetails, action.payload);

    let { result, status } = response;
    if (status === 1) {
      console.log("first = = = = = ", result)
      yield put(getBookingDetailsSuccess(result.data.data));
    } else {
      console.log("second = = = = = ", result)
      yield put(getBookingDetailsFailure(result.data.message));
      toast.notify(result.data.message, {
        duration: 5,
        type: "success",
      });
    }
  } catch (error) {
    if (error?.status === 4) {
      yield call(loginAgain, error.error, action.navigate);
      yield put(getBookingDetailsFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    } else {
      console.log("third = = = = = ", error)
      yield put(getBookingDetailsFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    }
  }
}

export function* cancelBookingSaga(action) {
  try {
    let response = yield call(cancelBooking, action.payload);

    let { result, status } = response;
    if (status === 1) {
      console.log("first = = = = = ", result)
      yield put(cancelBookingSuccess(action.payload.bookingId));
    } else {
      console.log("second = = = = = ", result)
      yield put(cancelBookingFailure(result.data.message));
      toast.notify(result.data.message, {
        duration: 5,
        type: "success",
      });
    }
  } catch (error) {
    if (error?.status === 4) {
      yield call(loginAgain, error.error, action.navigate);
      yield put(cancelBookingFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    } else {
      console.log("third = = = = = ", error)
      yield put(cancelBookingFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    }
  }
}