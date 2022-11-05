import { oysterAction } from "../actionTypes";

export const getZonesListInitiate = () => ({
  type: oysterAction.GET_OYSTER_ZONE_LIST_INITIATE,
});

export const getZonesListSuccess = (data1, data2) => ({
  type: oysterAction.GET_OYSTER_ZONES_LIST_SUCCESS,
  payload: data1,
  payload1: data2,
});

export const getZoneValuesInitiate = (id, values) => ({
  type: oysterAction.GET_OYSTER_ZONES_VALUES_INITIATE,
  payload: id,
  payload1: values,
});

export const getZoneValuesSuccess = (data) => ({
  type: oysterAction.GET_OYSTER_ZONES_VALUES_SUCCESS,
  payload: data,
});

export const purchaseOysterCardInitiate = (data, navigate) => ({
  type: oysterAction.OYSTER_CARD_PURCHASE_INITIATES,
  payload: data,
  navigate,
});

export const purchaseOysterCardSuccess = (data) => ({
  type: oysterAction.OYSTER_CARD_PURCHASE_SUCCESSS,
  payload: data,
});

export const oysterCardFinal = (data, key) => ({
  type: oysterAction.OYSTER_CARD_FINAL,
  payload: data,
  key,
});

export const updateOysterCardState = (data, key) => {
  const action = {
    type: oysterAction.UPDATE_OYSTER_CARD_STATES,
    payload: data,
    key,
  };
  return action;
};

export const purchaseOysterCardFailure = (error) => ({
  type: oysterAction.OYSTER_CARD_PURCHASE_FAILURES,
  payload: error,
});
