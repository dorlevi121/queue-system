import { initialAuthState } from "./auth.state";
import {
  startPostBusinessActionType, postBusinessActionType, successPostBusinesActionType,
  faildPostBusinesActionType, AuthActionsEnum
} from "./auth.types";

type allAuthActionTypes = startPostBusinessActionType | postBusinessActionType | successPostBusinesActionType | faildPostBusinesActionType


export const authReducer = (state = initialAuthState, action: allAuthActionTypes) => {
  switch (action.type) {
    case AuthActionsEnum.START_POST_BUSINESS:
      console.log("START_POST_BUSINESS");
      return {
        ...state,
        loading: true
      };

    case AuthActionsEnum.SUCCESS_POST_BUSINESS:
      console.log("SUCCESS_POST_BUSINESS");
      return {
        ...state,
        loading: false
      };

    case AuthActionsEnum.FALID_POST_BUSINESS:
      console.log("FALID_POST_BUSINESS");
      return {
        ...state,
        loading: false,
        error: action.error
      };

  }
  return state;

}