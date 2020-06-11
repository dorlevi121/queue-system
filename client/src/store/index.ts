import { combineReducers } from "redux";
import { authReducer } from "./business/auth/auth.reducer";
import { serviceReducer } from "./business/service/service.reducer";
import { businessReducer } from "./business/details/details.reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  service: serviceReducer,
  details: businessReducer,
});
