import { put, call } from "redux-saga/effects";
import { toast } from "react-nextjs-toast";
import {
  getStationsList,
  searchTrains,
  getSelectedBookingDetails,
  confirmBooking
} from "../../Api/index";
import {
  getStationsListSuccess,
  getStationsListFailure,
  searchTrainsListSuccess,
  searchTrainsListFailure,
  updateNewBookingsState,
  getSelectedBookingDetailSuccess,
  getSelectedBookingDetailFailure,
  confirmTrainBookingSuccess,
  confirmTrainBookingFailure
} from "../actions/newBookings"
import {
  updateBookingsState
} from "../actions/myBookings"
import { authenticationAction } from "../actionTypes"

function* loginAgain(result, navigate) {
  yield put({
    type: authenticationAction.API_AUTHENTICATION_FAILED,
  });
  console.log(':::::::::::::::::::::loc', navigate)
  localStorage.clear();
  navigate("/");
}

export function* getStationListSaga(action) {
  // console.log("action = ", action)
  try {
    let response = yield call(getStationsList, action.payload);

    let { result, status } = response;
    if (status === 1) {
      yield put(getStationsListSuccess(result.data.data));
      // action.navigate('/Profile')
      // toast.notify(result.data.message, {
      //   duration: 5,
      //   type: "success",
      // });
    } else {
      yield put(getStationsListFailure(result.data.message));
      toast.notify(result.data.message, {
        duration: 5,
        type: "error",
      });
    }
  } catch (error) {
    if (error?.status === 4) {
      yield call(loginAgain, error.error, action.navigate);
      yield put(getStationsListFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    } else {
      yield put(getStationsListFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    }
  }
}

export function* getAvailableTrainsListSaga(action) {
  // console.log("action = ", action)
  try {
    let response = yield call(searchTrains, action.payload);

    let { result, status } = response;
    if (status === 1) {
      let tempObj = result.data.data
      tempObj.sourceStationName = action?.payload.source?.StationName
      tempObj.destinationStationName = action?.payload.destination?.StationName
      yield put(searchTrainsListSuccess(tempObj));
      // action.navigate('/search')
      yield put(updateNewBookingsState({}, 'prevPageData'))
      // toast.notify(result.data.message, {
      //   duration: 5,
      //   type: "success",
      // });
    } else {
      console.log("this is catch no error = ", result)
      yield put(searchTrainsListFailure(result.data.message));
      toast.notify(result.data.message, {
        duration: 5,
        type: "error",
      });
    }
  } catch (error) {
    if (error?.status === 4) {
      console.log("this is catch error = ", error)
      yield call(loginAgain, error.error, action.navigate);
      yield put(searchTrainsListFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    } else {
      console.log("this is catch error second = ", error)
      yield put(searchTrainsListFailure(error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    }
  }
}

export function* getSelectedBookingDetailsSaga(action) {
  console.log("action = ", action)
  try {
    let response = yield call(getSelectedBookingDetails, action.payload);

    let { result, status } = response;
    if (status === 1) {
      let tempObj = result.data.data
      tempObj.sourceStationName = action?.payload.origin?.StationName
      tempObj.destinationStationName = action?.payload.destination?.StationName
      yield put(getSelectedBookingDetailSuccess(tempObj));
      // action.navigate('/search')
      // toast.notify(result.data.message, {
      //   duration: 5,
      //   type: "success",
      // });
    } else {
      console.log("this is catch no error = ", result)
      yield put(getSelectedBookingDetailFailure(result.data.message));
      toast.notify(result.data.message, {
        duration: 5,
        type: "error",
      });
    }
  } catch (error) {
    if (error?.status === 4) {
      console.log("this is catch error = ", error)
      yield call(loginAgain, error.error, action.navigate);
      yield put(getSelectedBookingDetailFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    } else {
      console.log("this is catch error second = ", error)
      yield put(getSelectedBookingDetailFailure(error));
      // toast.notify(error.error, {
      //   duration: 5,
      //   type: "error",
      // });
    }
  }
}

export function* confirmTrainBookingsSaga(action) {
  console.log("action = ", action)
  try {
    let response = yield call(confirmBooking, action.payload);

    let { result, status } = response;
    if (status === 1) {
      let tempObj = result.data.data
      tempObj.sourceStationName = action?.payload.source?.StationName
      tempObj.destinationStationName = action?.payload.destination?.StationName
      yield put(confirmTrainBookingSuccess(tempObj));
      // yield put(updateBookingsState(2, 'screenTabTrain'))
      // action.navigate('/search')
      toast.notify(result.data.message, {
        duration: 5,
        type: "success",
      });
    } else {
      console.log("this is catch no error = ", result)
      yield put(confirmTrainBookingFailure(result.data.message));
      toast.notify(result.data.message, {
        duration: 5,
        type: "error",
      });
    }
  } catch (error) {
    if (error?.status === 4) {
      console.log("this is catch error = ", error)
      yield call(loginAgain, error.error, action.navigate);
      yield put(confirmTrainBookingFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    } else {
      console.log("this is catch error second = ", error)
      yield put(confirmTrainBookingFailure(error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    }
  }
}
