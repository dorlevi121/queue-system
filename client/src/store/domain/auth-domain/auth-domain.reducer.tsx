import { initialAuthDomainState } from "./auth-domain.state";
import * as actions from './auth-domain.types'


type allAuthActionTypes = actions.successDomainLoginAuthActionType | actions.startAuthDomainActionType | actions.signInCheckDomainActionType |
  actions.faildDomainAuthActionType;

export const authDomainReducer = (state = initialAuthDomainState, action: allAuthActionTypes) => {
  switch (action.type) {

    case actions.AuthDomainActionsEnum.START_AUTH_DOMAIN:
      console.log("START_AUTH_DOMAIN");
      return {
        ...state,
        loading: true,
        error: "",
      };

    case actions.AuthDomainActionsEnum.FALID_AUTH_DOMAIN:
      console.log("FALID_AUTH_DOMAIN");
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case actions.AuthDomainActionsEnum.SIGN_IN_CHECK_DOMAIN:
      console.log("SIGN_IN_CHECK_DOMAINK");
      return {
        ...state,
        loading: false,
        isSignIn: action.ans
      };

    case actions.AuthDomainActionsEnum.SUCCESS_LOGIN_AUTH_DOMAIN:
      console.log("SUCCESS_LOGIN_AUTH_DOMAIN");
      return {
        ...state,
        loading: false,
        error: "",
        isSignIn: true
      };

    default:
      return state;
  }
};
