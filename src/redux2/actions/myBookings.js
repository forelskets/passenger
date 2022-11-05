import { myBookingsAction } from "../actionTypes";

export const getTubeBookingsInitiate = (data, navigate) => ({
  type: myBookingsAction.GET_TUBE_BOOKINGS_INITIATE,
  payload: data,
  navigate,
});

export const getTubeBookingsSuccess = (data) => ({
  type: myBookingsAction.GET_TUBE_BOOKINGS_SUCCESS,
  payload: data,
});

export const getTubeBookingsFailure = (error) => ({
  type: myBookingsAction.GET_TUBE_BOOKINGS_FAILURE,
  payload: error,
});

export const getTrainBookingsInitiate = (data, navigate) => ({
  type: myBookingsAction.GET_TRAIN_BOOKINGS_INITIATE,
  payload: data,
  navigate,
});

export const getTrainBookingsSuccess = (data) => ({
  type: myBookingsAction.GET_TRAIN_BOOKINGS_SUCCESS,
  payload: data,
});

export const getTrainBookingsFailure = (error) => ({
  type: myBookingsAction.GET_TRAIN_BOOKINGS_FAILURE,
  payload: error,
});

export const getBookingDetailsInitiate = (data, navigate) => ({
  type: myBookingsAction.GET_BOOKINGS_DETAILS_INITIATE,
  payload: data,
  navigate,
});

export const getBookingDetailsSuccess = (data) => ({
  type: myBookingsAction.GET_BOOKINGS_DETAILS_SUCCESS,
  payload: data,
});

export const getBookingDetailsFailure = (error) => ({
  type: myBookingsAction.GET_BOOKINGS_DETAILS_FAILURE,
  payload: error,
});

export const cancelBookingInitiate = (data, navigate) => ({
  type: myBookingsAction.CANCEL_BOOKING_INITIATE,
  payload: data,
  navigate,
});

export const cancelBookingSuccess = (data) => ({
  type: myBookingsAction.CANCEL_BOOKING_SUCCESS,
  payload: data,
});

export const cancelBookingFailure = (error) => ({
  type: myBookingsAction.CANCEL_BOOKING_FAILURE,
  payload: error,
});

export const updateBookingsState = (data, key) => {
  const action = {
    type: myBookingsAction.UPDATE_BOOKINGS_STATE,
    payload: data,
    key
  }
  return action;
}

export const clearBookingsData = () => ({
  type: myBookingsAction.CLEAR_BOOKINGS_DATA
});
