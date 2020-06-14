import { initialAuthState } from "./details.state";
import { cloneDeep } from 'lodash'
import {
  startDetailsActionType, successPostDetailsActionType, faildDetailsActionType, DetailsActionsEnum, successGetDetailsActionType,
  successPostHoursActionType
} from "./details.types";

type allAuthActionTypes = startDetailsActionType | successPostDetailsActionType | successPostHoursActionType
  | faildDetailsActionType | successGetDetailsActionType;

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

    case DetailsActionsEnum.SUCCESS_GET_DETAILS:
      console.log("SUCCESS_GET_DETAILS");
      return {
        ...state,
        loading: false,
        error: '',
        details: cloneDeep(action.details),
        hours: action.details.hours,
      };

    case DetailsActionsEnum.SUCCESS_POST_DETAILS:
      console.log("SUCCESS_POST_DETAILS");
      return {
        ...state,
        loading: false,
        error: '',
        details: action.details
      };

    case DetailsActionsEnum.SUCCESS_POST_HOURS:
      console.log("SUCCESS_POST_HOURS");
      return {
        ...state,
        loading: false,
        error: '',
        hours: action.hours
      };

  }
  return state;
};
