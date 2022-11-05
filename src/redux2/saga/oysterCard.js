import { put, call } from "redux-saga/effects";
import { getZonesLists, confirmOysterBookings } from "../../Api";
import {
  getZonesListSuccess,
  getZoneValuesSuccess,
  purchaseOysterCardSuccess,
  updateOysterCardState,
  purchaseOysterCardFailure,
} from "../actions/oysterCard";
import { authenticationAction } from "../actionTypes";
import { updateBookingsState } from "../actions/myBookings";

import { toast } from "react-nextjs-toast";
import { notification } from "antd";

function* loginAgain(result, navigate) {
  yield put({
    type: authenticationAction.API_AUTHENTICATION_FAILED,
  });
  localStorage.clear();
  navigate("/landing");
}

export function* getZonesSaga() {
  console.log("zones saga");
  try {
    const response = yield call(getZonesLists);
    const { status, result } = response;
    const results = result.result;

    let zones = [];
    if (status === 1) {
      zones = results.map((ele) => {
        if (ele) {
          return { id: ele._id, value: ele.zones };
        }
      });
      console.log(zones, "total cnes");
      yield put(getZonesListSuccess(zones, results));
    }
  } catch (error) {
    console.log(error);
  }
}

export function* getZoneValuesSaga({ payload, payload1 }) {
  try {
    const response = payload1.filter((ele) => ele._id === payload);
    let selectedZone = [];
    let newZone = {};
    let newZone2 = {};
    Object.entries(response[0]).forEach(([key, value]) => {
      if (
        key !== "_id" &&
        key !== "createdAt" &&
        key !== "__v" &&
        key !== "updatedAt" &&
        key !== "zones" &&
        key !== "oneDayAnyTime" &&
        key !== "oneDayOffPeak" &&
        key !== "sevenday" &&
        key !== "monthly" &&
        key !== "annual" &&
        key !== "percent"
      ) {
        newZone[key] = value;
      }
    });
    if (newZone.oneDayAnyTimeFinal) {
      newZone["1 Day"] = newZone.oneDayAnyTimeFinal;
      delete newZone.oneDayAnyTimeFinal;
    }
    if (newZone.oneDayOffPeakFinal) {
      newZone["1 Day off-Peak"] = newZone.oneDayOffPeakFinal;
      delete newZone.oneDayOffPeakFinal;
    }
    if (newZone.sevendayFinal) {
      newZone["7 Day"] = newZone.sevendayFinal;
      delete newZone.sevendayFinal;
    }
    if (newZone.monthlyFinal) {
      newZone["Monthly"] = newZone.monthlyFinal;
      delete newZone.monthlyFinal;
    }
    if (newZone.annualFinal) {
      newZone["Annual"] = newZone.annualFinal;
      delete newZone.annualFinal;
    }
    console.log(response[0], newZone, "resonse[0]");
    yield put(getZoneValuesSuccess(newZone));
  } catch (error) {
    console.log(error);
  }
}

export function* purchaseOysterCardSagas(action) {
  // console.log("action = ", action)
  try {
    let response = yield call(confirmOysterBookings, action.payload);

    let { result, status } = response;
    if (status === 1) {
      yield put(purchaseOysterCardSuccess(result.data.data));
      console.log(toast, "toast");

      notification.open({
        message: "Notification Title",
        description: result?.data?.message,
        duration: 0,
      });

      yield put(updateBookingsState(2, "screenTabFirst"));
      yield put(updateOysterCardState({}, "prevPageData"));
      action.navigate("/myBookings");
    } else {
      console.log("try = = = = = ", result);
      yield put(purchaseOysterCardFailure(result.data.message));
      notification.open({
        message: "Notification Title",
        description: result?.data?.message,
        duration: 5,
      });
    }
  } catch (error) {
    if (error?.status === 4) {
      yield call(loginAgain, error.error, action.navigate);
      yield put(purchaseOysterCardFailure(error.error));
      notification.open({
        message: "Notification Title",
        description: error.error,
        duration: 5,
      });
    } else {
      console.log("catch = = = = = ", error);
      yield put(purchaseOysterCardFailure(error.error));
      notification.open({
        message: "Notification Title",
        description: error.error,
        duration: 5,
      });
    }
  }
}
