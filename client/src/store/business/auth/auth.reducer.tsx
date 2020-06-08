import { initialAuthState } from "./auth.state";
import * as actions from './auth.types'

type allAuthActionTypes = actions.successLoginAuthActionType | actions.faildAuthActionType | actions.signInCheckActionType | actions.startAuthActionType
  | actions.successResetPasswordActionType | actions.successSetNewPasswordActionType | actions.successDomainActionType | actions.successPostEmployeeActionType

export const authReducer = (state = initialAuthState, action: allAuthActionTypes) => {
  switch (action.type) {

    case actions.AuthActionsEnum.START_AUTH:
      console.log("START_AUTH");
      return {
        ...state,
        loading: true,
        error: "",
      };

    case actions.AuthActionsEnum.FALID_AUTH:
      console.log("FALID_AUTH");
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case actions.AuthActionsEnum.SIGN_IN_CHECK:
      console.log("SIGN_IN_CHECK");
      return {
        ...state,
        isSignIn: action.ans,
        isAdmin: action.isAdmin,
      };

    case actions.AuthActionsEnum.SUCCESS_RESET_PASSWORD:
      console.log("SUCCESS_POST_RESET_PASSWORD");
      return {
        ...state,
        loading: false,
        error: "",
      };

    case actions.AuthActionsEnum.SUCCESS_SET_NEW_PASSWORD:
      console.log("SUCCESS_POST_SET_NEW_PASSWORD");
      return {
        ...state,
        loading: false,
        error: "",
      };

    case actions.AuthActionsEnum.SUCESS_DOMAIN:
      console.log("SUCESS_DOMAIN");
      return {
        ...state,
        loading: false,
        error: "",
      };

    case actions.AuthActionsEnum.SUCCESS_LOGIN_AUTH:
      console.log("SUCCESS_LOGIN_AUTH");
      return {
        ...state,
        loading: false,
        error: "",
      };

    case actions.AuthActionsEnum.SUCESS_POST_EMPLOYEE:
      console.log("SUCESS_POST_EMPLOYEE");
      return {
        ...state,
        loading: false,
        error: "",
      };

    default:
      return state;
  }
};
