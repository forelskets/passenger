import { oysterCardAction } from "../actionTypes";

export const getZonesListInitiate = (data, key, navigate) => ({
  type: oysterCardAction.GET_OYSTER_ZONES_LIST_INITIATE,
  payload: data,
  key,
  navigate,
});

export const getZonesListSuccess = (data, key) => ({
  type: oysterCardAction.GET_OYSTER_ZONES_LIST_SUCCESS,
  payload: data,
  key
});

export const getZonesListFailure = (error) => ({
  type: oysterCardAction.GET_OYSTER_ZONES_LIST_FAILURE,
  payload: error,
});

export const purchaseOysterCardInitiate = (data, navigate) => ({
  type: oysterCardAction.OYSTER_CARD_PURCHASE_INITIATE,
  payload: data,
  navigate,
});

export const purchaseOysterCardSuccess = (data) => ({
  type: oysterCardAction.OYSTER_CARD_PURCHASE_SUCCESS,
  payload: data,
});

export const purchaseOysterCardFailure = (error) => ({
  type: oysterCardAction.OYSTER_CARD_PURCHASE_FAILURE,
  payload: error,
});

export const updateOysterCardState = (data, key) => {
  const action = {
    type: oysterCardAction.UPDATE_OYSTER_CARD_STATE,
    payload: data,
    key
  }
  return action;
}

export const clearOysterCardData = () => ({
  type: oysterCardAction.CLEAR_OYSTER_CARD_DATA
});
