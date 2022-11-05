import { authenticationAction } from "../actionTypes";
import { put, call } from "redux-saga/effects";
import { toast } from "react-nextjs-toast";
import {
  loginApi,
  registerApi,
  changePassword,
  userProfile,
  userEdit,
  userPictureEdit,
  forgotPassword,
  forgotLinkVerification,
  resetPassword,
  contactUsForm,
} from "../../Api/index";
import {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  changePasswordSuccess,
  changePasswordFailure,
  userProfileSuccess,
  userProfileFailure,
  userProfileEditSuccess,
  userProfileEditFailure,
  forgotPasswordSuccess,
  forgotPasswordFailure,
  forgotLinkVerificationSuccess,
  forgotLinkVerificationFailure,
  resetPasswordSuccess,
  resetPasswordFailure,
  contactUsFormSuccess,
  contactUsFormFailure,
} from "../actions/authentication";

import { updateNewBookingsState } from "../actions/newBookings";

import { updateOysterCardState } from "../actions/oyster";
import { loadStripe } from "@stripe/stripe-js";

function* loginAgain(result, navigate) {
  yield put({
    type: authenticationAction.API_AUTHENTICATION_FAILED,
  });
  console.log(":::::::::::::::::::::loc", navigate);
  localStorage.clear();
  navigate("/landing");
}

export function* loginSaga(action) {
  // toast.dismiss();
  console.log("action = ", action);
  try {
    let response = yield call(loginApi, action.payload);

    let { result, status } = response;
    if (status === 1) {
      console.log("result = ", response);
      localStorage.setItem("token", result.data.token);
      localStorage.setItem("userDetails", JSON.stringify(result.data.data));
      yield put(loginSuccess(result.data.token));
      console.log(
        "window = = ",
        window.location,
        "history = = ",
        window.history
      );

      if (action.prevPage === "newBookings") {
        yield put(
          updateNewBookingsState({ prevData: action.prevData }, "prevPageData")
        );
        action.navigate("/newBookings");
      } else if (action.prevPage === "purchaseoyster") {
        yield put(
          updateOysterCardState({ prevData: action.prevData }, "prevPageData")
        );
        action.navigate("/purchaseoyster");
      } else {
        action.navigate("/landing", { state: { prevData: null } });
      }
      // window.location.reload()
      toast.notify(result.data.message, {
        duration: 5,
        type: "success",
      });
    } else {
      yield put(loginFailure(result.data.message));
      toast.notify(result.data.message, {
        duration: 5,
        type: "error",
      });
      // yield put(showSuccessSnackbar({ type: "error", msg: result.data.message }));
    }
  } catch (error) {
    yield put(loginFailure(error.error));
    toast.notify(error.error, {
      duration: 5,
      type: "error",
    });
    // yield put(showSuccessSnackbar({ type: "error", msg: error.error }));
  }
}

export function* registerSaga(action) {
  // toast.dismiss();
  console.log("action = ", action);
  try {
    let response = yield call(registerApi, action.payload);

    let { result, status } = response;
    if (status === 1) {
      yield put(registerSuccess(result.data));
      // toast.notify(result.data.message, {
      //   duration: 5,
      //   type: "success",
      // });
    } else {
      yield put(registerFailure(result.data.message));
      toast.notify(result.message, {
        duration: 5,
        type: "error",
      });
      // yield put(showSuccessSnackbar({ type: "error", msg: result.data.message }));
    }
  } catch (error) {
    yield put(registerFailure(error.error));
    toast.notify(error.error, {
      duration: 5,
      type: "error",
    });
  }
}

export function* changePasswordSaga(action) {
  console.log("action = ", action);
  try {
    let response = yield call(changePassword, action.payload);

    let { result, status } = response;
    if (status === 1) {
      localStorage.clear();
      yield put(changePasswordSuccess(result.data.token));
      action.navigate("/");
      toast.notify(result.data.message, {
        duration: 5,
        type: "success",
      });
    } else {
      yield put(changePasswordFailure(result.data.message));
      toast.notify(result.data.message, {
        duration: 5,
        type: "error",
      });
    }
  } catch (error) {
    if (error?.status === 4) {
      yield call(loginAgain, error.error, action.navigate);
      yield put(changePasswordFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    } else {
      yield put(changePasswordFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    }
  }
}

export function* userProfileSaga(action) {
  console.log("action = ", action);
  try {
    let response = yield call(userProfile);

    let { result, status } = response;
    if (status === 1) {
      yield put(userProfileSuccess(result.data.data));
    } else {
      yield put(userProfileFailure(result.data.message));
    }
  } catch (error) {
    if (error?.status === 4) {
      yield call(loginAgain, error.error, action.navigate);
      yield put(userProfileFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    } else {
      yield put(userProfileFailure(error.error));
    }
  }
}

export function* userProfileEditSaga(action) {
  console.log("action = ", action);
  try {
    if (action.payload?.profile) {
      const fd = new FormData();
      fd.append("profile", action.payload.profile);
      yield call(userPictureEdit, fd);
    }

    delete action.payload?.profile;

    let response = yield call(userEdit, action.payload);

    let { result, status } = response;
    if (status === 1) {
      console.log("action after = ", result.data.data);

      localStorage.setItem("userDetails", JSON.stringify(result.data.data));

      yield put(userProfileEditSuccess(result.data.data));
      action.navigate("/Profile");
      toast.notify(result.data.message, {
        duration: 5,
        type: "success",
      });
    } else {
      yield put(userProfileEditFailure(result.data.message));
      toast.notify(result.data.message, {
        duration: 5,
        type: "success",
      });
    }
  } catch (error) {
    if (error?.status === 4) {
      yield call(loginAgain, error.error, action.navigate);
      yield put(userProfileEditFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    } else {
      yield put(userProfileEditFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    }
  }
}

export function* forgotPasswordSaga(action) {
  // toast.dismiss();
  console.log("action = ", action);
  try {
    let response = yield call(forgotPassword, action.payload);

    let { result, status } = response;
    if (status === 1) {
      yield put(forgotPasswordSuccess(result.data));
      toast.notify(result.data.message, {
        duration: 5,
        type: "success",
      });
    } else {
      yield put(forgotPasswordFailure(result.data.message));
      toast.notify(result.message, {
        duration: 5,
        type: "error",
      });
      // yield put(showSuccessSnackbar({ type: "error", msg: result.data.message }));
    }
  } catch (error) {
    yield put(forgotPasswordFailure(error.error));
    toast.notify(error.error, {
      duration: 5,
      type: "error",
    });
  }
}

export function* forgotLinkVerificationSaga(action) {
  // toast.dismiss();
  console.log("action = ", action);
  try {
    let response = yield call(forgotLinkVerification, action.payload);

    let { result, status } = response;
    if (status === 1) {
      yield put(forgotLinkVerificationSuccess(result.data.data.reset));
    } else {
      yield put(forgotLinkVerificationFailure(result.data));
      // yield put(showSuccessSnackbar({ type: "error", msg: result.data.message }));
    }
  } catch (error) {
    yield put(forgotLinkVerificationFailure(error.error));
  }
}

export function* resetPasswordSaga(action) {
  // toast.dismiss();
  console.log("action = ", action);
  try {
    let response = yield call(resetPassword, action.payload);

    let { result, status } = response;
    console.log("this is = ", result);
    if (status === 1) {
      yield put(resetPasswordSuccess(result.data));
      toast.notify(result.data.message, {
        duration: 5,
        type: "success",
      });
      action.navigate("/");
    } else {
      yield put(resetPasswordFailure(result.data.message));
      toast.notify(result.message, {
        duration: 5,
        type: "error",
      });
      // yield put(showSuccessSnackbar({ type: "error", msg: result.data.message }));
    }
  } catch (error) {
    yield put(resetPasswordFailure(error.error));
    toast.notify(error.error, {
      duration: 5,
      type: "error",
    });
  }
}

export function* contactUsFormSaga(action) {
  // toast.dismiss();
  console.log("action = ", action);
  try {
    let response = yield call(contactUsForm, action.payload);

    let { result, status } = response;
    if (status === 1) {
      yield put(contactUsFormSuccess(result.data));
      // action.navigate('/newBookings')
      toast.notify(result.data.message, {
        duration: 5,
        type: "success",
      });
    } else {
      yield put(contactUsFormFailure(result.data.message));
      toast.notify(result.data.message, {
        duration: 5,
        type: "error",
      });
      // yield put(showSuccessSnackbar({ type: "error", msg: result.data.message }));
    }
  } catch (error) {
    if (error?.status === 4) {
      yield call(loginAgain, error.error, action.navigate);
      yield put(contactUsFormFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    } else {
      yield put(contactUsFormFailure(error.error));
      toast.notify(error.error, {
        duration: 5,
        type: "error",
      });
    }
    // yield put(showSuccessSnackbar({ type: "error", msg: error.error }));
  }
}
