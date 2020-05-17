import { newBusniessForm, AuthActionsEnum } from "./auth.types";
import { instace } from '../../models/axios/axios';

export const postBusiness = (form: newBusniessForm) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: AuthActionsEnum.START_POST_BUSINESS })
    instace.post('employee/auth/register', JSON.stringify(form))
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
      }).then(() => {
        return dispatch({ type: AuthActionsEnum.SUCCESS_POST_BUSINESS });
      }).catch((error: any) => {
        return dispatch({ type: AuthActionsEnum.FALID_POST_BUSINESS, error: error });
      })
  }
}