export interface AuthDomainState {
  error: string;
  loading: boolean;
  isSignIn: boolean;
}

export enum AuthDomainActionsEnum {
  START_AUTH_DOMAIN = "START_AUTH_DOMAIN",
  FALID_AUTH_DOMAIN = "FALID_AUTH_DOMAIN",
  SUCCESS_LOGIN_AUTH_DOMAIN = "SUCCESS_LOGIN_AUTH_DOMAIN",
  SIGN_IN_CHECK_DOMAIN = "SIGN_IN_CHECK_DOMAIN",
}

export interface AuthDomainActionPattern {
  type: AuthDomainActionsEnum; //Action Type
}

export interface startAuthDomainActionType extends AuthDomainActionPattern {
  type: AuthDomainActionsEnum.START_AUTH_DOMAIN;
}

export interface successDomainLoginAuthActionType extends AuthDomainActionPattern {
  type: AuthDomainActionsEnum.SUCCESS_LOGIN_AUTH_DOMAIN;
}

export interface faildDomainAuthActionType extends AuthDomainActionPattern {
  type: AuthDomainActionsEnum.FALID_AUTH_DOMAIN;
  error: string;
}

export interface signInCheckDomainActionType extends AuthDomainActionPattern {
  type: AuthDomainActionsEnum.SIGN_IN_CHECK_DOMAIN;
  ans: boolean;
}
