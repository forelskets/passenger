import { createSelector } from 'reselect'

export const getMemoizedSeasonTicketsData = createSelector(
  (state) => state.seasonTickets,
  (seasonTicketsState) => {
    const {
      requestSeasonTktLoader,
      requestSeasonTktSuccess,
      requestSeasonTktDetails,
      seasonTktPaymentTypeUpdateLoader,
      seasonTktPaymentTypeUpdateSuccess,
      seasonTktDetailLoader,
      seasonTktDetailSuccess,
      seasonTktDetail,
      seasonTktPaymentLoader,
      seasonTktPaymentSuccess,
      seasonTktPaymentDetail
    } = seasonTicketsState

    return {
      requestSeasonTktLoader,
      requestSeasonTktSuccess,
      requestSeasonTktDetails,
      seasonTktPaymentTypeUpdateLoader,
      seasonTktPaymentTypeUpdateSuccess,
      seasonTktDetailLoader,
      seasonTktDetailSuccess,
      seasonTktDetail,
      seasonTktPaymentLoader,
      seasonTktPaymentSuccess,
      seasonTktPaymentDetail
    }
  }
)