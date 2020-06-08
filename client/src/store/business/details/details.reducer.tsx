import { initialAuthState } from "./details.state";
import {
  startDetailsActionType, successPostDetailsActionType, faildDetailsActionType, DetailsActionsEnum, getDetailsActionType,
  successPostHoursActionType
} from "./details.types";

type allAuthActionTypes = startDetailsActionType | successPostDetailsActionType | successPostHoursActionType
  | faildDetailsActionType | getDetailsActionType;

export const businessReducer = (state = initialAuthState, action: allAuthActionTypes) => {
  switch (action.type) {

    case DetailsActionsEnum.START_DETAILS:
      console.log("START_DETAILS");
      return {
        ...state,
        loading: true,
        error: "",
      };

    case DetailsActionsEnum.FALID_DETAILS:
      console.log("FALID_DETAILS");
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case DetailsActionsEnum.GET_DETAILS:
      console.log("GET_DETAILS");
      return {
        ...state,
        deatils: action.deatils
      };

    case DetailsActionsEnum.SUCCESS_POST_DETAILS:
      console.log("SUCCESS_POST_DETAILS");
      return {
        ...state,
        deatils: action.details
      };

    case DetailsActionsEnum.SUCCESS_POST_HOURS:
      console.log("SUCCESS_POST_HOURS");
      return {
        ...state,
        hours: action.hours
      };
  }
  return state;
};
