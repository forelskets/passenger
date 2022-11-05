import { seasonTicketAction } from "../actionTypes";

export const requsetSeasonTktInitiate = (data, navigate) => ({
  type: seasonTicketAction.REQUEST_SEASON_TICKET_INITIATE,
  payload: data,
  navigate,
});

export const requsetSeasonTktSuccess = (data) => ({
  type: seasonTicketAction.REQUEST_SEASON_TICKET_SUCCESS,
  payload: data,
});

export const requsetSeasonTktFailure = (error) => ({
  type: seasonTicketAction.REQUEST_SEASON_TICKET_FAILURE,
  payload: error,
});

export const seasonTktUpdatePaymentInitiate = (data, navigate) => ({
  type: seasonTicketAction.SEASON_TICKET_UPDATE_PAYMENT_INITIATE,
  payload: data,
  navigate,
});

export const seasonTktUpdatePaymentSuccess = (data) => ({
  type: seasonTicketAction.SEASON_TICKET_UPDATE_PAYMENT_SUCCESS,
  payload: data,
});

export const seasonTktUpdatePaymentFailure = (error) => ({
  type: seasonTicketAction.SEASON_TICKET_UPDATE_PAYMENT_FAILURE,
  payload: error,
});

export const getSeasonTktDetailInitiate = (data, navigate) => ({
  type: seasonTicketAction.GET_SEASON_TICKET_DETAIL_INITIATE,
  payload: data,
  navigate,
});

export const getSeasonTktDetailSuccess = (data) => ({
  type: seasonTicketAction.GET_SEASON_TICKET_DETAIL_SUCCESS,
  payload: data,
});

export const getSeasonTktDetailFailure = (error) => ({
  type: seasonTicketAction.GET_SEASON_TICKET_DETAIL_FAILURE,
  payload: error,
});

export const seasonTktPaymentInitiate = (data, navigate) => ({
  type: seasonTicketAction.SEASON_TICKET_PAYMENT_INITIATE,
  payload: data,
  navigate,
});

export const seasonTktPaymentSuccess = (data) => ({
  type: seasonTicketAction.SEASON_TICKET_PAYMENT_SUCCESS,
  payload: data,
});

export const seasonTktPaymentFailure = (error) => ({
  type: seasonTicketAction.SEASON_TICKET_PAYMENT_FAILURE,
  payload: error,
});

export const updateSeasonTktState = (data, key, navigate) => {
  const action = {
    type: seasonTicketAction.UPDATE_SEASON_TICKET_STATE,
    payload: data,
    key,
    navigate,
  };
  return action;
};

export const clearSeasonTktData = () => ({
  type: seasonTicketAction.CLEAR_SEASON_TICKET_DATA,
});
