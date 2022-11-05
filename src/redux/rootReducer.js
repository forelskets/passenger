import { combineReducers } from "redux";

import authentication from "./reducers/authentication";
import myBookings from "./reducers/myBookings";
import newBookings from "./reducers/newBookings";
import card from "./reducers/card";
import seasonTickets from "./reducers/seasonTickets";
import flexiTickets from "./reducers/flexiTickets";
import oysterCard from "./reducers/oyster";
import oysterCards from "./reducers/oysterCard";

const rootReducer = combineReducers({
  authentication,
  myBookings,
  newBookings,
  card,
  seasonTickets,
  flexiTickets,
  oysterCard,
  oysterCards,
});

export default rootReducer;
