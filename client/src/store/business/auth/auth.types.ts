export interface AuthState {
  error: string;
  loading: boolean;
  isSignIn: boolean;
  isAdmin: boolean;
}

export enum AuthActionsEnum {
  START_AUTH = "START_AUTH",
  FALID_AUTH = "FALID_AUTH",
  SUCCESS_LOGIN_AUTH = "SUCCESS_LOGIN_AUTH",
  SUCCESS_RESET_PASSWORD = "SUCCESS_RESET_PASSWORD",
  SUCCESS_SET_NEW_PASSWORD = "SUCCESS_SET_NEW_PASSWORD",
  SIGN_IN_CHECK = "SIGN_IN_CHECK",
  SUCESS_DOMAIN = "SUCESS_DOMAIN",
  SUCESS_POST_EMPLOYEE = "SUCESS_POST_EMPLOYEE"

}

export interface AuthActionPattern {
  type: AuthActionsEnum; //Action Type
}

export interface startAuthActionType extends AuthActionPattern {
  type: AuthActionsEnum.START_AUTH;
}

export interface successLoginAuthActionType extends AuthActionPattern {
  type: AuthActionsEnum.SUCCESS_LOGIN_AUTH;
}

export interface faildAuthActionType extends AuthActionPattern {
  type: AuthActionsEnum.FALID_AUTH;
  error: Error;
}

export interface signInCheckActionType extends AuthActionPattern {
  type: AuthActionsEnum.SIGN_IN_CHECK;
  ans: boolean;
  isAdmin: boolean;
}

export interface successResetPasswordActionType extends AuthActionPattern {
  type: AuthActionsEnum.SUCCESS_RESET_PASSWORD;
}


export interface successSetNewPasswordActionType extends AuthActionPattern {
  type: AuthActionsEnum.SUCCESS_SET_NEW_PASSWORD;
}

export interface successDomainActionType extends AuthActionPattern {
  type: AuthActionsEnum.SUCESS_DOMAIN;
}

export interface successPostEmployeeActionType extends AuthActionPattern {
  type: AuthActionsEnum.SUCESS_POST_EMPLOYEE;
}