import { oysterAction } from "../actionTypes";

let initialState = {
  zonesListLoader: false,
  zoneSelect: false,
  zonesListSuccess: false,
  zonesList: [],
  zoneNames: [],
  selectedZoneValue: {},
  selectedBookingDetails: {},
  oysterCardPurchaseLoader: false,
  oysterCardPurchaseSuccess: false,
  oysterCardPurchaseDetails: {},
  finalOysterCard: {},
};

export default function oysterCards(
  state = initialState,
  { payload, type, payload1, key }
) {
  console.log(payload, type, "reducerPayload");
  switch (type) {
    case oysterAction.GET_OYSTER_ZONES_LIST_SUCCESS:
      return {
        ...state,
        zoneNames: payload,
        zonesList: payload1,
      };

    case oysterAction.GET_OYSTER_ZONES_VALUES_SUCCESS:
      return {
        ...state,
        selectedZoneValue: payload,
      };

    case oysterAction.OYSTER_CARD_PURCHASE_INITIATES:
      return {
        ...state,
        oysterCardPurchaseLoader: true,
        oysterCardPurchaseSuccess: false,
      };

    case oysterAction.OYSTER_CARD_PURCHASE_SUCCESSS:
      return {
        ...state,
        oysterCardPurchaseLoader: false,
        oysterCardPurchaseDetails: payload,

        selectedZoneValue: {},
        oysterCardPurchaseSuccess: true,
      };

    case oysterAction.OYSTER_CARD_PURCHASE_FAILURES:
      return {
        ...state,
        oysterCardPurchaseLoader: false,
      };

    case oysterAction.UPDATE_OYSTER_CARD_STATES:
      state[key] = payload;
      return { ...state };

    case oysterAction.OYSTER_CARD_FINAL:
      return {
        ...state,
        finalOysterCard: payload,
        selectedBookingDetails: key,
      };

    default:
      return state;
  }
}
