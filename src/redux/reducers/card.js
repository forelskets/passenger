import { cardAction } from "../actionTypes";
import store from "../store"

const initialState = {
  addCardLoader: false,
  addCardSuccess: false,
  addCardData: {},
  removeCardDetailsLoader: false,
  removeCardDetailsSuccess: false
}

export default function card(
  state = initialState,
  { payload, type, key }
) {
  switch (type) {
    case cardAction.ADD_CARD_DETAILS_INITIATE:

      return {
        ...state,
        addCardLoader: true,
        addCardSuccess: false
      };

    case cardAction.ADD_CARD_DETAILS_SUCCESS:
      return {
        ...state,
        addCardLoader: false,
        addCardData: payload,
        addCardSuccess: true,
      };

    case cardAction.ADD_CARD_DETAILS_FAILURE:
      return {
        ...state,
        addCardLoader: false,
      };

    case cardAction.REMOVE_CARD_DETAILS_INITIATE:
      return {
        ...state,
        removeCardDetailsLoader: true,
        removeCardDetailsSuccess: false
      };

    case cardAction.REMOVE_CARD_DETAILS_SUCCESS:
      return {
        ...state,
        removeCardDetailsLoader: false,
        removeCardDetailsSuccess: true,
      };

    case cardAction.REMOVE_CARD_DETAILS_FAILURE:
      return {
        ...state,
        removeCardDetailsLoader: false,
      };

    case cardAction.UPDATE_CARD_DETAILS_STATE:
      state[key] = payload
      return { ...state, }

    case cardAction.CLEAR_CARD_DETAILS_DATA:
      return {
        ...state,
        removeCardDetailsSuccess: false
      }

    default:
      return state;
  }
}