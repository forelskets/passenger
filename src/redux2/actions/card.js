import { cardAction } from "../actionTypes";

export const addCardDetailsInitiate = (data, detailType, currentData, navigate, prevPath) => ({
  type: cardAction.ADD_CARD_DETAILS_INITIATE,
  payload: data,
  detailType,
  currentData,
  navigate,
  prevPath
});

export const addCardDetailsSuccess = (data) => ({
  type: cardAction.ADD_CARD_DETAILS_SUCCESS,
  payload: data,
});

export const addCardDetailsFailure = (error) => ({
  type: cardAction.ADD_CARD_DETAILS_FAILURE,
  payload: error,
});

export const removeCardDetailsInitiate = (data, navigate) => ({
  type: cardAction.REMOVE_CARD_DETAILS_INITIATE,
  payload: data,
  navigate,
});

export const removeCardDetailsSuccess = (data) => ({
  type: cardAction.REMOVE_CARD_DETAILS_SUCCESS,
  payload: data,
});

export const removeCardDetailsFailure = (error) => ({
  type: cardAction.REMOVE_CARD_DETAILS_FAILURE,
  payload: error,
});

export const updateCardDetailsState = (data, key) => {
  const action = {
    type: cardAction.UPDATE_CARD_DETAILS_STATE,
    payload: data,
    key
  }
  return action;
}

export const clearCardsData = () => ({
  type: cardAction.CLEAR_CARD_DETAILS_DATA
});
