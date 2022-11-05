import { put, call } from "redux-saga/effects";
import { toast } from "react-nextjs-toast";
import {
  requestSeasonTicket,
  seasonTicketPaymentTypeUpdate,
  seasonTktDetail,
} from "../../Api/index";
import {
  requsetSeasonTktSuccess,
  requsetSeasonTktFailure,
  seasonTktUpdatePaymentSuccess,
  seasonTktUpdatePaymentFailure,
  getSeasonTktDetailInitiate,
  getSeasonTktDetailSuccess,
  getSeasonTktDetailFailure,
  seasonTktPaymentSuccess,
  seasonTktPaymentFailure,
} from "../actions/seasonTickets";
import { authenticationAction } from "../actionTypes";

function* loginAgain(result, navigate) {
  yield put({
    type: authenticationAction.API_AUTHENTICATION_FAILED,
  });
  localStorage.clear();
  navigate("/landing");
}

export function* requestForSeasonTicketsSaga(action) {
  // console.log("action = ", action)
  try {
    let response = yield call(requestSeasonTicket, action.payload);

    let { result, status } = response;
    if (status === 1) {
      yield put(requsetSeasonTktSuccess(result.data.data));
      // action.navigate("/searchResult");
      // toast.notify(result.data.message, {
      //   duration: 5,
      //   type: "success",
      // });
    } else {
      console.log("try = = = = = ", result);
      yield put(requsetSeasonTktFailure(result.data.message));
      toast.notify(result.data.message, {
        duration: 5,
        type: "error",
      });
    }
  } catch (error) {
    if (error?.status === 4) {
      yield call(loginAgain, error.error, action.navigate);
      yield put(requsetSeasonTktFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    } else {
      console.log("catch = = = = = ", error);
      yield put(requsetSeasonTktFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    }
  }
}

export function* seasonTicketPaymentTypeUpdateSaga(action) {
  // console.log("action = ", action)
  try {
    let response = yield call(seasonTicketPaymentTypeUpdate, action.payload);

    let { result, status } = response;
    if (status === 1) {
      yield put(seasonTktUpdatePaymentSuccess(result.data.data));
      // action.navigate('/Profile')
      // toast.notify(result.data.message, {
      //   duration: 5,
      //   type: "success",
      // });
    } else {
      yield put(seasonTktUpdatePaymentFailure(result.data.message));
      toast.notify(result.data.message, {
        duration: 5,
        type: "error",
      });
    }
  } catch (error) {
    if (error?.status === 4) {
      yield call(loginAgain, error.error, action.navigate);
      yield put(seasonTktUpdatePaymentFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    } else {
      yield put(seasonTktUpdatePaymentFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    }
  }
}

export function* getSeasonTktDetailSaga(action) {
  // console.log("action = ", action)
  try {
    let response = yield call(seasonTktDetail, action.payload);

    let { result, status } = response;
    if (status === 1) {
      yield put(getSeasonTktDetailSuccess(result.data.data));
      // action.navigate('/Profile')
      // toast.notify(result.data.message, {
      //   duration: 5,
      //   type: "success",
      // });
    } else {
      yield put(getSeasonTktDetailFailure(result.data.message));
      toast.notify(result.data.message, {
        duration: 5,
        type: "error",
      });
    }
  } catch (error) {
    if (error?.status === 4) {
      yield call(loginAgain, error.error, action.navigate);
      yield put(getSeasonTktDetailFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    } else {
      yield put(getSeasonTktDetailFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    }
  }
}

export function* seasonTktPaymentSaga(action) {
  // console.log("action = ", action)
  try {
    let response = yield call(seasonTicketPaymentTypeUpdate, action.payload);

    let { result, status } = response;
    if (status === 1) {
      yield put(seasonTktPaymentSuccess(result.data.data));
      yield put(getSeasonTktDetailInitiate({}, action.navigate));
      // action.navigate('/Profile')
      toast.notify(result.data.message, {
        duration: 5,
        type: "success",
      });
    } else {
      yield put(seasonTktPaymentFailure(result.data.message));
      toast.notify(result.data.message, {
        duration: 5,
        type: "error",
      });
    }
  } catch (error) {
    if (error?.status === 4) {
      yield call(loginAgain, error.error, action.navigate);
      yield put(seasonTktPaymentFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    } else {
      yield put(seasonTktPaymentFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    }
  }
}
