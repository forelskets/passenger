import { flexiTicketAction } from "../actionTypes";

const initialState = {
  requestFlexiTktLoader: false,
  requestFlexiTktSuccess: false,
  requestFlexiTktDetails: {},
  flexiTktPaymentTypeUpdateLoader: false,
  flexiTktPaymentTypeUpdateSuccess: false,
  flexiTktDetailLoader: false,
  flexiTktDetailSuccess: false,
  flexiTktDetail: {},
  flexiTktPaymentLoader: false,
  flexiTktPaymentSuccess: false,
  flexiTktPaymentDetail: {},
};

export default function flexiTickets(
  state = initialState,
  { payload, type, key }
) {
  switch (type) {
    case flexiTicketAction.REQUEST_FLEXI_TICKET_INITIATE:
      return {
        ...state,
        requestFlexiTktLoader: true,
        requestFlexiTktSuccess: false,
      };

    case flexiTicketAction.REQUEST_FLEXI_TICKET_SUCCESS:
      return {
        ...state,
        requestFlexiTktLoader: false,
        requestFlexiTktDetails: payload,
        requestFlexiTktSuccess: true,
      };

    case flexiTicketAction.REQUEST_FLEXI_TICKET_FAILURE:
      return {
        ...state,
        requestFlexiTktLoader: false,
      };

    case flexiTicketAction.FLEXI_TICKET_UPDATE_PAYMENT_INITIATE:
      return {
        ...state,
        flexiTktPaymentTypeUpdateLoader: true,
        flexiTktPaymentTypeUpdateSuccess: false,
      };

    case flexiTicketAction.FLEXI_TICKET_UPDATE_PAYMENT_SUCCESS:
      return {
        ...state,
        flexiTktPaymentTypeUpdateLoader: false,
        flexiTktPaymentTypeUpdateSuccess: true,
      };

    case flexiTicketAction.FLEXI_TICKET_UPDATE_PAYMENT_FAILURE:
      return {
        ...state,
        flexiTktPaymentTypeUpdateLoader: false,
      };

    case flexiTicketAction.GET_FLEXI_TICKET_DETAIL_INITIATE:
      return {
        ...state,
        flexiTktDetailLoader: true,
        flexiTktDetailSuccess: false,
      };

    case flexiTicketAction.GET_FLEXI_TICKET_DETAIL_SUCCESS:
      return {
        ...state,
        flexiTktDetailLoader: false,
        flexiTktDetailSuccess: true,
        flexiTktDetail: payload ? payload : {},
      };

    case flexiTicketAction.GET_FLEXI_TICKET_DETAIL_FAILURE:
      return {
        ...state,
        flexiTktDetailLoader: false,
      };

    case flexiTicketAction.FLEXI_TICKET_PAYMENT_INITIATE:
      return {
        ...state,
        flexiTktPaymentLoader: true,
        flexiTktPaymentSuccess: false,
      };

    case flexiTicketAction.FLEXI_TICKET_PAYMENT_SUCCESS:
      return {
        ...state,
        flexiTktPaymentLoader: false,
        flexiTktPaymentSuccess: true,
        flexiTktPaymentDetail: payload,
      };

    case flexiTicketAction.FLEXI_TICKET_PAYMENT_FAILURE:
      return {
        ...state,
        flexiTktPaymentLoader: false,
      };

    case flexiTicketAction.UPDATE_FLEXI_TICKET_STATE:
      state[key] = payload;
      return { ...state };

    case flexiTicketAction.CLEAR_FLEXI_TICKET_DATA:
      return {
        ...state,
        requestFlexiTktSuccess: false,
        flexiTktPaymentTypeUpdateSuccess: false,
        flexiTktDetailSuccess: false,
        flexiTktPaymentSuccess: false,
      };

    default:
      return state;
  }
}
