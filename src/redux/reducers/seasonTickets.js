import { seasonTicketAction } from "../actionTypes";

const initialState = {
  requestSeasonTktLoader: false,
  requestSeasonTktSuccess: false,
  requestSeasonTktDetails: {},
  seasonTktPaymentTypeUpdateLoader: false,
  seasonTktPaymentTypeUpdateSuccess: false,
  seasonTktDetailLoader: false,
  seasonTktDetailSuccess: false,
  seasonTktDetail: {},
  seasonTktPaymentLoader: false,
  seasonTktPaymentSuccess: false,
  seasonTktPaymentDetail: {},
};

export default function seasonTickets(
  state = initialState,
  { payload, type, key }
) {
  switch (type) {
    case seasonTicketAction.REQUEST_SEASON_TICKET_INITIATE:
      return {
        ...state,
        requestSeasonTktLoader: true,
        requestSeasonTktSuccess: false,
      };

    case seasonTicketAction.REQUEST_SEASON_TICKET_SUCCESS:
      return {
        ...state,
        requestSeasonTktLoader: false,
        requestSeasonTktDetails: payload,
        requestSeasonTktSuccess: true,
      };

    case seasonTicketAction.REQUEST_SEASON_TICKET_FAILURE:
      return {
        ...state,
        requestSeasonTktLoader: false,
      };

    case seasonTicketAction.SEASON_TICKET_UPDATE_PAYMENT_INITIATE:
      return {
        ...state,
        seasonTktPaymentTypeUpdateLoader: true,
        seasonTktPaymentTypeUpdateSuccess: false,
      };

    case seasonTicketAction.SEASON_TICKET_UPDATE_PAYMENT_SUCCESS:
      return {
        ...state,
        seasonTktPaymentTypeUpdateLoader: false,
        seasonTktPaymentTypeUpdateSuccess: true,
      };

    case seasonTicketAction.SEASON_TICKET_UPDATE_PAYMENT_FAILURE:
      return {
        ...state,
        seasonTktPaymentTypeUpdateLoader: false,
      };

    case seasonTicketAction.GET_SEASON_TICKET_DETAIL_INITIATE:
      return {
        ...state,
        seasonTktDetailLoader: true,
        seasonTktDetailSuccess: false,
      };

    case seasonTicketAction.GET_SEASON_TICKET_DETAIL_SUCCESS:
      return {
        ...state,
        seasonTktDetailLoader: false,
        seasonTktDetailSuccess: true,
        seasonTktDetail: payload ? payload : {},
      };

    case seasonTicketAction.GET_SEASON_TICKET_DETAIL_FAILURE:
      return {
        ...state,
        seasonTktDetailLoader: false,
      };

    case seasonTicketAction.SEASON_TICKET_PAYMENT_INITIATE:
      return {
        ...state,
        seasonTktPaymentLoader: true,
        seasonTktPaymentSuccess: false,
      };

    case seasonTicketAction.SEASON_TICKET_PAYMENT_SUCCESS:
      return {
        ...state,
        seasonTktPaymentLoader: false,
        seasonTktPaymentSuccess: true,
        seasonTktPaymentDetail: payload,
      };

    case seasonTicketAction.SEASON_TICKET_PAYMENT_FAILURE:
      return {
        ...state,
        seasonTktPaymentLoader: false,
      };

    case seasonTicketAction.UPDATE_SEASON_TICKET_STATE:
      state[key] = payload;
      return { ...state };

    case seasonTicketAction.CANCEL_SEASON_TICKET_INITIATE:
      state[key] = payload;
      return { ...state };

    case seasonTicketAction.CLEAR_SEASON_TICKET_DATA:
      return {
        ...state,
        requestSeasonTktSuccess: false,
        seasonTktPaymentTypeUpdateSuccess: false,
        seasonTktDetailSuccess: false,
        seasonTktPaymentSuccess: false,
      };

    default:
      return state;
  }
}
