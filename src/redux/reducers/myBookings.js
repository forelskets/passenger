import { myBookingsAction } from "../actionTypes";

const initialState = {
  tubeBookingsLoader: false,
  tubeBookingsSuccess: false,
  tubeBookingsList: [],
  tubeBookingsPagination: {},
  trainBookingsLoader: false,
  trainBookingsSuccess: false,
  trainBookingsList: [],
  trainBookingsPagination: {},
  offsetValueActive: 0,
  offsetValueFuture: 0,
  offsetValuePast: 0,
  offsetValueLongDur: 0,
  offsetValueOneDay: 0,
  searchValueActive: '',
  searchValueFuture: '',
  searchValuePast: '',
  searchValueLongDur: '',
  searchValueOneDay: '',
  screenTabFirst: 1,
  screenTabTrain: 1,
  screenTabTube: 1,
  bookingDetailsLoader: false,
  bookingDetailsSuccess: false,
  bookingDetails: {},
  cancelBookingLoader: false,
  cancelBookingSuccess: false,
  cancelBookingDetail: {},
  screenName: null
}

export default function myBookings(
  state = initialState,
  { payload, type, key }
) {
  switch (type) {
    case myBookingsAction.GET_TUBE_BOOKINGS_INITIATE:
      return {
        ...state,
        tubeBookingsLoader: true,
        tubeBookingsSuccess: false
      };

    case myBookingsAction.GET_TUBE_BOOKINGS_SUCCESS:
      return {
        ...state,
        tubeBookingsLoader: false,
        tubeBookingsList: payload.bookingList,
        tubeBookingsPagination: payload.paginateData,
        tubeBookingsSuccess: true,
      };

    case myBookingsAction.GET_TUBE_BOOKINGS_FAILURE:
      return {
        ...state,
        tubeBookingsLoader: false,
      };

    case myBookingsAction.GET_TRAIN_BOOKINGS_INITIATE:
      return {
        ...state,
        trainBookingsLoader: true,
        trainBookingsSuccess: false
      };

    case myBookingsAction.GET_TRAIN_BOOKINGS_SUCCESS:
      return {
        ...state,
        trainBookingsLoader: false,
        trainBookingsList: payload.bookingList,
        trainBookingsPagination: payload.paginateData,
        trainBookingsSuccess: true,
      };

    case myBookingsAction.GET_TRAIN_BOOKINGS_FAILURE:
      return {
        ...state,
        trainBookingsLoader: false,
      };

    case myBookingsAction.GET_BOOKINGS_DETAILS_INITIATE:
      return {
        ...state,
        bookingDetailsLoader: true,
        bookingDetailsSuccess: false
      };

    case myBookingsAction.GET_BOOKINGS_DETAILS_SUCCESS:
      return {
        ...state,
        bookingDetailsLoader: false,
        bookingDetails: payload,
        bookingDetailsSuccess: true,
      };

    case myBookingsAction.GET_BOOKINGS_DETAILS_FAILURE:
      return {
        ...state,
        bookingDetailsLoader: false,
      };

    case myBookingsAction.CANCEL_BOOKING_INITIATE:
      return {
        ...state,
        cancelBookingLoader: true,
        cancelBookingSuccess: false
      };

    case myBookingsAction.CANCEL_BOOKING_SUCCESS:

      let tempArr = state.trainBookingsList

      let updatedData = tempArr.map((itm) => {
        let returnValue = { ...itm };

        if (itm._id == payload) {
          returnValue.isCancel = true;
        }

        return returnValue
      })

      return {
        ...state,
        cancelBookingLoader: false,
        cancelBookingDetail: payload,
        cancelBookingSuccess: true,
        trainBookingsList: updatedData
      };

    case myBookingsAction.CANCEL_BOOKING_FAILURE:
      return {
        ...state,
        cancelBookingLoader: false,
      };

    case myBookingsAction.UPDATE_BOOKINGS_STATE:
      state[key] = payload
      return { ...state, }

    case myBookingsAction.CLEAR_BOOKINGS_DATA:
      return {
        ...state,
        tubeBookingsSuccess: false,
        trainBookingsSuccess: false,
        bookingDetailsSuccess: false,
        cancelBookingSuccess: false
      }

    default:
      return state;
  }
}