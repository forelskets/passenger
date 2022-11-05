import { flexiTicketAction } from "../actionTypes";

export const requsetFlexiTktInitiate = (data, navigate) => ({
  type: flexiTicketAction.REQUEST_FLEXI_TICKET_INITIATE,
  payload: data,
  navigate,
});

export const requsetFlexiTktSuccess = (data) => ({
  type: flexiTicketAction.REQUEST_FLEXI_TICKET_SUCCESS,
  payload: data,
});

export const requsetFlexiTktFailure = (error) => ({
  type: flexiTicketAction.REQUEST_FLEXI_TICKET_FAILURE,
  payload: error,
});

export const flexiTktUpdatePaymentInitiate = (data, navigate) => ({
  type: flexiTicketAction.FLEXI_TICKET_UPDATE_PAYMENT_INITIATE,
  payload: data,
  navigate,
});

export const flexiTktUpdatePaymentSuccess = (data) => ({
  type: flexiTicketAction.FLEXI_TICKET_UPDATE_PAYMENT_SUCCESS,
  payload: data,
});

export const flexiTktUpdatePaymentFailure = (error) => ({
  type: flexiTicketAction.FLEXI_TICKET_UPDATE_PAYMENT_FAILURE,
  payload: error,
});

export const getFlexiTktDetailInitiate = (data, navigate) => ({
  type: flexiTicketAction.GET_FLEXI_TICKET_DETAIL_INITIATE,
  payload: data,
  navigate,
});

export const getFlexiTktDetailSuccess = (data) => ({
  type: flexiTicketAction.GET_FLEXI_TICKET_DETAIL_SUCCESS,
  payload: data,
});

export const getFlexiTktDetailFailure = (error) => ({
  type: flexiTicketAction.GET_FLEXI_TICKET_DETAIL_FAILURE,
  payload: error,
});

export const flexiTktPaymentInitiate = (data, navigate) => ({
  type: flexiTicketAction.FLEXI_TICKET_PAYMENT_INITIATE,
  payload: data,
  navigate,
});

export const flexiTktPaymentSuccess = (data) => ({
  type: flexiTicketAction.FLEXI_TICKET_PAYMENT_SUCCESS,
  payload: data,
});

export const flexiTktPaymentFailure = (error) => ({
  type: flexiTicketAction.FLEXI_TICKET_PAYMENT_FAILURE,
  payload: error,
});

export const updateFlexiTktState = (data, key, navigate) => {
  const action = {
    type: flexiTicketAction.UPDATE_FLEXI_TICKET_STATE,
    payload: data,
    key,
    navigate,
  };
  return action;
};

export const clearFlexiTktData = () => ({
  type: flexiTicketAction.CLEAR_FLEXI_TICKET_DATA,
});
