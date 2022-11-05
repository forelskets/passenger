import { createSelector } from "reselect";

export const getMemoizedFlexiTicketsData = createSelector(
  (state) => state.flexiTickets,
  (flexiTicketsState) => {
    const {
      requestFlexiTktLoader,
      requestFlexiTktSuccess,
      requestFlexiTktDetails,
      flexiTktPaymentTypeUpdateLoader,
      flexiTktPaymentTypeUpdateSuccess,
      flexiTktDetailLoader,
      flexiTktDetailSuccess,
      flexiTktDetail,
      flexiTktPaymentLoader,
      flexiTktPaymentSuccess,
      flexiTktPaymentDetail,
    } = flexiTicketsState;

    return {
      requestFlexiTktLoader,
      requestFlexiTktSuccess,
      requestFlexiTktDetails,
      flexiTktPaymentTypeUpdateLoader,
      flexiTktPaymentTypeUpdateSuccess,
      flexiTktDetailLoader,
      flexiTktDetailSuccess,
      flexiTktDetail,
      flexiTktPaymentLoader,
      flexiTktPaymentSuccess,
      flexiTktPaymentDetail,
    };
  }
);
