import { combineReducers } from "redux";
import { authReducer } from "./business/auth/auth.reducer";
import { serviceReducer } from "./business/service/service.reducer";
import { businessReducer } from "./business/details/details.reducer";
import { scheduleReducer } from "./business/schedule/schedule.reducer";
import { authDomainReducer } from "./domain/auth-domain/auth-domain.reducer";

export const rootReducer = combineReducers({
  auth: authReducer,
  service: serviceReducer,
  details: businessReducer,
  schedule: scheduleReducer,
  authDomain: authDomainReducer
});
