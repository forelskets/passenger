import { Method, Method1 } from "./apiMethod";

// Authentication
export const loginApi = (userInfo) => Method.POST("/user/login", userInfo);
export const registerApi = (userInfo) =>
  Method.POST("/user/register", userInfo);
export const changePassword = (data) =>
  Method.POST("/user/changePassword", data);
export const forgotPassword = (data) =>
  Method.POST("/user/forgotPassword", data);
export const resetPassword = (data) => Method.POST("/user/resetPassword", data);
export const forgotLinkVerification = (data) => Method.POST("/user/link", data);
export const contactUsForm = (data) => Method.POST("/user/contact", data);

// MyBookings
// export const tubeBookingsList = (data) => Method.POST("/user/bookingList", data);
export const trainBookingsList = (data) =>
  Method.POST("/user/bookingList", data);
export const getBookingDetails = (data) =>
  Method.POST("/overground/bookingDetails", data);
export const cancelBooking = (data) =>
  Method.POST("/overground/cancelBooking", data);

//NewBookings
export const getStationsList = (data) =>
  Method.POST("/station/searchStation", data);
export const searchTrains = (data) =>
  Method.POST("/station/bookingSearch", data);
export const getSelectedBookingDetails = (data) =>
  Method.POST("/station/bookingDetail", data);
export const confirmBooking = (data) => Method.POST("/user/trainBook", data);

// Users
export const userProfile = (data) => Method.POST("/user/viewProfile", data);
export const userEdit = (data) => Method.POST("/user/editProfile", data);
export const userPictureEdit = (data) =>
  Method1.POST("/user/editProfile", data);

//Card
export const addCardDetails = (data) => Method.POST("/user/saveCard", data);
export const removeCardDetails = (data) =>
  Method.GET("/user/removeCardDetails");

//Season Ticket
export const seasonTktDetail = (data) => Method.POST("/season/detail", data);
export const requestSeasonTicket = (data) => Method.POST("/season/add", data);
export const seasonTicketPaymentTypeUpdate = (data) =>
  Method.POST("/season/payment", data);
export const seasonTicketCancel = (data) => Method.POST("/season/cancel", data);

//Flexi Ticket
export const flexiTktDetail = (data) => Method.POST("/flexi/detail", data);
export const requestFlexiTicket = (data) => Method.POST("/flexi/add", data);
export const flexiTicketPaymentTypeUpdate = (data) =>
  Method.POST("/flexi/payment", data);
//Oyster Card
export const getZonesList = (data) =>
  Method.GET(`/underground/stopPoints?search=${data}`);
export const confirmOysterBooking = (data) =>
  Method.POST("/underground/booking", data);

//Oyster card Second

export const getZonesLists = () => Method.GET("/oysterCard/allRow");
export const confirmOysterBookings = (data) =>
  Method.POST("/oysterCard/booking", data);
export const tubeBookingsList = (data) =>
  Method.POST("/oysterCard/bookingList", data);
