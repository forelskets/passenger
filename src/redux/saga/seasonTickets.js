import { put, call } from "redux-saga/effects";
import { toast } from "react-nextjs-toast";
import {
  requestSeasonTicket,
  seasonTicketPaymentTypeUpdate,
  seasonTktDetail,
  seasonTicketCancel,
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
  console.log("action = ", action);
  try {
    let response = yield call(requestSeasonTicket, {
      ...action.payload,
      durations: [1, 3, 6, 12],
    });

    let { result, status } = response;

    if (status === 1) {
      if (result.data?.data) {
        result.data.data.durations = [1, 3, 6, 12];
        yield put(requsetSeasonTktSuccess(result.data.data));
      } else {
        yield put(requsetSeasonTktFailure(result.data.message));
        toast.notify(result.data.message, {
          duration: 5,
          type: "error",
        });
      }
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
  console.log("action = ", action);
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
  try {
    let response = yield call(seasonTktDetail, action.payload);

    console.log("response ", response);

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
    console.log("error ", error);
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

export function* cancelSeasonTicketsSaga(action) {
  try {
    let response = yield call(seasonTicketCancel, {
      ...action.payload,
    });

    let { result, status } = response;

    return console.log(result);

    if (status === 1) {
      if (result.data?.data) {
        yield put(requsetSeasonTktSuccess(result.data.data));
      } else {
        yield put(requsetSeasonTktFailure(result.data.message));
        toast.notify(result.data.message, {
          duration: 5,
          type: "error",
        });
      }
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

export function* seasonTktPaymentSaga(action) {
  console.log("action 123 = ", action);
  try {
    let response = yield call(seasonTicketPaymentTypeUpdate, action.payload);

    let { result, status } = response;
    if (status === 1) {
      yield put(seasonTktPaymentSuccess(result.data.data));
      yield put(getSeasonTktDetailInitiate({}, action.navigate));
      toast.notify(result.data.message, {
        duration: 5,
        type: "success",
      });
      action.navigate("/seasonTickets");
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
