import { oysterCardAction } from "../actionTypes";

const initialState = {
  zonesListSourceLoader: false,
  zonesListDestinationLoader: false,
  zonesListSuccess: false,
  zonesListSource: [],
  zonesListDestination: [],
  oysterCardPurchaseLoader: false,
  oysterCardPurchaseSuccess: false,
  oysterCardPurchaseDetails: {},
  prevPageData: {}
}

export default function oysterCard(
  state = initialState,
  { payload, type, key }
) {
  switch (type) {
    case oysterCardAction.GET_OYSTER_ZONES_LIST_INITIATE:
      console.log("red = ", key, type)
      return {
        ...state,
        zonesListSourceLoader: key === 'zone1' && true,
        zonesListDestinationLoader: key === 'zone2' && true,
        zonesListSource: key === 'zone1' ? [] : state.zonesListSource,
        zonesListDestination: key === 'zone2' ? [] : state.zonesListDestination,
        zonesListSuccess: false
      };

    case oysterCardAction.GET_OYSTER_ZONES_LIST_SUCCESS:
      return {
        ...state,
        zonesListSourceLoader: key === 'zone1' && false,
        zonesListDestinationLoader: key === 'zone2' && false,
        zonesListSource: key === 'zone1' ? payload : state.zonesListSource,
        zonesListDestination: key === 'zone2' ? payload : state.zonesListDestination,
        zonesListSuccess: true,
      };

    case oysterCardAction.GET_OYSTER_ZONES_LIST_FAILURE:
      return {
        ...state,
        zonesListSourceLoader: false,
        zonesListDestinationLoader: false
      };

    case oysterCardAction.OYSTER_CARD_PURCHASE_INITIATE:
      return {
        ...state,
        oysterCardPurchaseLoader: true,
        oysterCardPurchaseSuccess: false
      };

    case oysterCardAction.OYSTER_CARD_PURCHASE_SUCCESS:
      return {
        ...state,
        oysterCardPurchaseLoader: false,
        oysterCardPurchaseDetails: payload,
        zonesListSource: [],
        zonesListDestination: [],
        oysterCardPurchaseSuccess: true,
      };

    case oysterCardAction.OYSTER_CARD_PURCHASE_FAILURE:
      return {
        ...state,
        oysterCardPurchaseLoader: false,
      };

    case oysterCardAction.UPDATE_OYSTER_CARD_STATE:
      state[key] = payload
      return { ...state, }

    case oysterCardAction.CLEAR_OYSTER_CARD_DATA:
      return {
        ...state,
        oysterCardPurchaseSuccess: false,
        zonesListSuccess: false
      }


    default:
      return state;
  }
}