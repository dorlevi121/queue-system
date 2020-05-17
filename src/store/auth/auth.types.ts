export interface AuthState {
    error: string,
    loading: boolean
}

export enum AuthActionsEnum {
    START_POST_BUSINESS = "START_POST_BUSINESS",
    POST_BUSINESS = "POST_BUSINESS",
    SUCCESS_POST_BUSINESS = "SUCCESS_POST_BUSINESS",
    FALID_POST_BUSINESS = "FALID_POST_BUSINESS"

}

export interface AuthActionPattern {
    type: AuthActionsEnum; //Action Type
}

export interface startPostBusinessActionType extends AuthActionPattern {
    type: AuthActionsEnum.START_POST_BUSINESS
}

export interface postBusinessActionType extends AuthActionPattern {
    type: AuthActionsEnum.POST_BUSINESS,
    form: newBusniessForm
}

export interface successPostBusinesActionType extends AuthActionPattern {
    type: AuthActionsEnum.SUCCESS_POST_BUSINESS
}

export interface faildPostBusinesActionType extends AuthActionPattern {
    type: AuthActionsEnum.FALID_POST_BUSINESS,
    error: Error
}

export type newBusniessForm =  {
    // employeeDeatils: { name: string, phone: string, email: string, password: string },
    // businessDetails: { name: string, phone: string, email: string }
    name: string, phone: string, email: string, password: string 
  }