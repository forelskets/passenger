import { newBookingsAction } from "../actionTypes";

const initialState = {
  stationListLoader: false,
  stationListSuccess: false,
  stationsList: [],
  searchTrainListLoader: false,
  searchTrainListSuccess: false,
  searchTrainList: {},
  prevPageData: {},
  earlierSearch: false,
  laterSearch: false,
  earlierReturnSearch: false,
  laterReturnSearch: false,
  paginationTrainSearchType: '',
  selectedBookingDetailLoader: false,
  selectedBookingDetailSuccess: false,
  selectedBookingDetail: {},
  confirmTrainBookingSuccess: false,
  confirmTrainBookingLoader: false,
  confirmTrainBookingDetails: {}
}

export default function newBookings(
  state = initialState,
  { payload, type, key }
) {
  switch (type) {
    case newBookingsAction.GET_STATIONS_LIST_INITIATE:
      return {
        ...state,
        stationListLoader: true,
        stationListSuccess: false
      };

    case newBookingsAction.GET_STATIONS_LIST_SUCCESS:
      return {
        ...state,
        stationListLoader: false,
        stationsList: payload,
        stationListSuccess: true,
      };

    case newBookingsAction.GET_STATIONS_LIST_FAILURE:
      return {
        ...state,
        tubeBookingsLoader: false,
      };

    case newBookingsAction.SEARCH_TRAINS_LIST_INITIATE:
      return {
        ...state,
        searchTrainListLoader: true,
        searchTrainListSuccess: false,
        //searchTrainList: {}
      };

    case newBookingsAction.SEARCH_TRAINS_LIST_SUCCESS:
      return {
        ...state,
        searchTrainListLoader: false,
        searchTrainList: payload,
        searchTrainListSuccess: true,
      };

    case newBookingsAction.SEARCH_TRAINS_LIST_FAILURE:
      return {
        ...state,
        searchTrainListLoader: false,
      };

    case newBookingsAction.GET_SELECTED_BOOKING_DETAIL_INITIATE:
      return {
        ...state,
        selectedBookingDetailLoader: true,
        selectedBookingDetailSuccess: false,
        selectedBookingDetail: {}
      };

    case newBookingsAction.GET_SELECTED_BOOKING_DETAIL_SUCCESS:
      return {
        ...state,
        selectedBookingDetailLoader: false,
        selectedBookingDetail: payload,
        selectedBookingDetailSuccess: true,
      };

    case newBookingsAction.GET_SELECTED_BOOKING_DETAIL_FAILURE:
      return {
        ...state,
        selectedBookingDetailLoader: false,
      };

    case newBookingsAction.CONFIRM_TRAIN_BOOKING_INITIATE:
      return {
        ...state,
        confirmTrainBookingLoader: true,
        confirmTrainBookingSuccess: false
      };

    case newBookingsAction.CONFIRM_TRAIN_BOOKING_SUCCESS:
      return {
        ...state,
        confirmTrainBookingLoader: false,
        confirmTrainBookingDetails: payload,
        confirmTrainBookingSuccess: true,
      };

    case newBookingsAction.CONFIRM_TRAIN_BOOKING_FAILURE:
      return {
        ...state,
        confirmTrainBookingLoader: false,
      };

    case newBookingsAction.UPDATE_NEW_BOOKINGS_STATE:
      state[key] = payload
      return { ...state, }

    case newBookingsAction.CLEAR_NEW_BOOKINGS_DATA:
      return {
        ...state,
        confirmTrainBookingSuccess: false,
        selectedBookingDetailSuccess: false,
        searchTrainListSuccess: false
      }

    default:
      return state;
  }
}