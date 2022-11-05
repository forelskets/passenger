import { put, call } from "redux-saga/effects";
import { toast } from "react-nextjs-toast";
import {
  requestFlexiTicket,
  flexiTicketPaymentTypeUpdate,
  flexiTktDetail,
} from "../../Api/index";
import {
  requsetFlexiTktSuccess,
  requsetFlexiTktFailure,
  flexiTktUpdatePaymentSuccess,
  flexiTktUpdatePaymentFailure,
  getFlexiTktDetailInitiate,
  getFlexiTktDetailSuccess,
  getFlexiTktDetailFailure,
  flexiTktPaymentSuccess,
  flexiTktPaymentFailure,
} from "../actions/flexiTickets";
import { authenticationAction } from "../actionTypes";

function* loginAgain(result, navigate) {
  yield put({
    type: authenticationAction.API_AUTHENTICATION_FAILED,
  });
  localStorage.clear();
  navigate("/landing");
}

export function* requestForFlexiTicketsSaga(action) {
  console.log("action = ", action);
  try {
    let response = yield call(requestFlexiTicket, {
      ...action.payload,
      durations: [1, 3, 6, 12],
    });

    let { result, status } = response;
    console.log(result);
    if (status === 1) {
      if (result.data?.data) {
        result.data.data.durations = [1, 3, 6, 12];
        yield put(requsetFlexiTktSuccess(result.data.data));
      } else {
        yield put(requsetFlexiTktFailure(result.data.message));
        toast.notify(result.data.message, {
          duration: 5,
          type: "error",
        });
      }
    } else {
      console.log("try = = = = = ", result);
      yield put(requsetFlexiTktFailure(result.data.message));
      toast.notify(result.data.message, {
        duration: 5,
        type: "error",
      });
    }
  } catch (error) {
    if (error?.status === 4) {
      yield call(loginAgain, error.error, action.navigate);
      yield put(requsetFlexiTktFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    } else {
      console.log("catch = = = = = ", error);
      yield put(requsetFlexiTktFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    }
  }
}

export function* flexiTicketPaymentTypeUpdateSaga(action) {
  console.log("action = ", action);
  try {
    let response = yield call(flexiTicketPaymentTypeUpdate, action.payload);

    let { result, status } = response;
    if (status === 1) {
      yield put(flexiTktUpdatePaymentSuccess(result.data.data));
      // action.navigate('/Profile')
      // toast.notify(result.data.message, {
      //   duration: 5,
      //   type: "success",
      // });
    } else {
      yield put(flexiTktUpdatePaymentFailure(result.data.message));
      toast.notify(result.data.message, {
        duration: 5,
        type: "error",
      });
    }
  } catch (error) {
    if (error?.status === 4) {
      yield call(loginAgain, error.error, action.navigate);
      yield put(flexiTktUpdatePaymentFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    } else {
      yield put(flexiTktUpdatePaymentFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    }
  }
}

export function* getFlexiTktDetailSaga(action) {
  try {
    let response = yield call(flexiTktDetail, action.payload);

    console.log("response ", response);

    let { result, status } = response;
    if (status === 1) {
      yield put(getFlexiTktDetailSuccess(result.data.data));
      // action.navigate('/Profile')
      // toast.notify(result.data.message, {
      //   duration: 5,
      //   type: "success",
      // });
    } else {
      yield put(getFlexiTktDetailFailure(result.data.message));
      toast.notify(result.data.message, {
        duration: 5,
        type: "error",
      });
    }
  } catch (error) {
    console.log("error ", error);
    if (error?.status === 4) {
      yield call(loginAgain, error.error, action.navigate);
      yield put(getFlexiTktDetailFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    } else {
      yield put(getFlexiTktDetailFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    }
  }
}

export function* flexiTktPaymentSaga(action) {
  console.log("action 123 = ", action);
  try {
    let response = yield call(flexiTicketPaymentTypeUpdate, action.payload);

    let { result, status } = response;
    if (status === 1) {
      yield put(flexiTktPaymentSuccess(result.data.data));
      yield put(getFlexiTktDetailInitiate({}, action.navigate));
      toast.notify(result.data.message, {
        duration: 5,
        type: "success",
      });
      action.navigate("/flexiTickets");
    } else {
      yield put(flexiTktPaymentFailure(result.data.message));
      toast.notify(result.data.message, {
        duration: 5,
        type: "error",
      });
    }
  } catch (error) {
    if (error?.status === 4) {
      yield call(loginAgain, error.error, action.navigate);
      yield put(flexiTktPaymentFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    } else {
      yield put(flexiTktPaymentFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    }
  }
}
