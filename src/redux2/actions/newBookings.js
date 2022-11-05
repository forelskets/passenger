import { newBookingsAction } from "../actionTypes";

export const getStationsListInitiate = (data, navigate) => ({
  type: newBookingsAction.GET_STATIONS_LIST_INITIATE,
  payload: data,
  navigate,
});

export const getStationsListSuccess = (data) => ({
  type: newBookingsAction.GET_STATIONS_LIST_SUCCESS,
  payload: data,
});

export const getStationsListFailure = (error) => ({
  type: newBookingsAction.GET_STATIONS_LIST_FAILURE,
  payload: error,
});

export const searchTrainsListInitiate = (data, navigate) => ({
  type: newBookingsAction.SEARCH_TRAINS_LIST_INITIATE,
  payload: data,
  navigate,
});

export const searchTrainsListSuccess = (data) => ({
  type: newBookingsAction.SEARCH_TRAINS_LIST_SUCCESS,
  payload: data,
});

export const searchTrainsListFailure = (error) => ({
  type: newBookingsAction.SEARCH_TRAINS_LIST_FAILURE,
  payload: error,
});

export const getSelectedBookingDetailInitiate = (data, navigate) => ({
  type: newBookingsAction.GET_SELECTED_BOOKING_DETAIL_INITIATE,
  payload: data,
  navigate,
});

export const getSelectedBookingDetailSuccess = (data) => ({
  type: newBookingsAction.GET_SELECTED_BOOKING_DETAIL_SUCCESS,
  payload: data,
});

export const getSelectedBookingDetailFailure = (error) => ({
  type: newBookingsAction.GET_SELECTED_BOOKING_DETAIL_FAILURE,
  payload: error,
});

export const confirmTrainBookingInitiate = (data, navigate) => ({
  type: newBookingsAction.CONFIRM_TRAIN_BOOKING_INITIATE,
  payload: data,
  navigate,
});

export const confirmTrainBookingSuccess = (data) => ({
  type: newBookingsAction.CONFIRM_TRAIN_BOOKING_SUCCESS,
  payload: data,
});

export const confirmTrainBookingFailure = (error) => ({
  type: newBookingsAction.CONFIRM_TRAIN_BOOKING_FAILURE,
  payload: error,
});

export const updateNewBookingsState = (data, key) => {
  const action = {
    type: newBookingsAction.UPDATE_NEW_BOOKINGS_STATE,
    payload: data,
    key
  }
  return action;
}

export const clearNewBookingsData = () => ({
  type: newBookingsAction.CLEAR_NEW_BOOKINGS_DATA
});