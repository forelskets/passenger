import { createSelector } from 'reselect'

export const getMemoizedNewBookingsData = createSelector(
  (state) => state.newBookings,
  (newBookingsState) => {
    const {
      stationListLoader,
      stationListSuccess,
      stationsList,
      searchTrainListLoader,
      searchTrainListSuccess,
      searchTrainList,
      prevPageData,
      earlierSearch,
      laterSearch,
      earlierReturnSearch,
      laterReturnSearch,
      paginationTrainSearchType,
      selectedBookingDetailLoader,
      selectedBookingDetailSuccess,
      selectedBookingDetail,
      confirmTrainBookingSuccess,
      confirmTrainBookingLoader,
      confirmTrainBookingDetails
    } = newBookingsState

    return {
      stationListLoader,
      stationListSuccess,
      stationsList,
      searchTrainListLoader,
      searchTrainListSuccess,
      searchTrainList,
      prevPageData,
      earlierSearch,
      laterSearch,
      earlierReturnSearch,
      laterReturnSearch,
      paginationTrainSearchType,
      selectedBookingDetailLoader,
      selectedBookingDetailSuccess,
      selectedBookingDetail,
      confirmTrainBookingSuccess,
      confirmTrainBookingLoader,
      confirmTrainBookingDetails
    }
  }
)