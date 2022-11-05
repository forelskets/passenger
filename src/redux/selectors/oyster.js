import { createSelector } from 'reselect'

export const getMemoizedOysterCardData = createSelector(
  (state) => state.oysterCard,
  (oysterCardState) => {
    const {
      zonesListSourceLoader,
      zonesListDestinationLoader,
      zonesListSuccess,
      zonesListSource,
      zonesListDestination,
      oysterCardPurchaseLoader,
      oysterCardPurchaseSuccess,
      prevPageData,
      oysterCardPurchaseDetails
    } = oysterCardState

    return {
      zonesListSourceLoader,
      zonesListDestinationLoader,
      zonesListSuccess,
      zonesListSource,
      zonesListDestination,
      oysterCardPurchaseLoader,
      oysterCardPurchaseSuccess,
      prevPageData,
      oysterCardPurchaseDetails
    }
  }
)