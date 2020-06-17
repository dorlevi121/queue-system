import { AuthActionsEnum } from "./auth.types";
// import { loginEmployeeForm, employeeForm, AuthActionsEnum, setNewPasswordEmployeeForm } from "./auth.types";
import API from "../../../models/axios/axios";
import { serviceActionsEnum } from "../service/service.types";
import { DetailsActionsEnum } from "../details/details.types";
import { Employee } from "../../../models/system/employee";
import { scheduleActionsEnum } from "../schedule/schedule.types";
import moment from "moment";
import { BusinessScheduleWeek } from "../../../models/system/event";

export const setDomain = (domain: string) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: AuthActionsEnum.START_AUTH });

    API.get("business/auth/check/" + domain)
      .then((res) => {
        localStorage.setItem("domain", domain);
        return dispatch({ type: AuthActionsEnum.SUCESS_DOMAIN });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: AuthActionsEnum.FALID_AUTH,
          error: msg,
        });
      });
  };
};

export const registerEmployee = (employee: Employee) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: AuthActionsEnum.START_AUTH });

    API.post("business/auth/register", employee)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
      })
      .then(() => {
        return dispatch({ type: AuthActionsEnum.SUCESS_POST_EMPLOYEE });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: AuthActionsEnum.FALID_AUTH,
          error: msg,
        });
      });
  };
};

export const loginEmployee = (form: { phone: string; password: string }) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: AuthActionsEnum.START_AUTH });

    API.post("business/auth/login", form)
      .then((res) => {
        const token = res.data.token;
        const domain = res.data.domain;
        localStorage.setItem("token", token);
        localStorage.setItem("domain", domain);
      })
      .then(() => {
        return dispatch({ type: AuthActionsEnum.SUCCESS_LOGIN_AUTH });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: AuthActionsEnum.FALID_AUTH,
          error: msg,
        });
      });
  };
};

export const signInCheck = () => {
  const token = localStorage.getItem("token");
  const domain = localStorage.getItem("domain");
  if (!token || !domain) {
    return { type: AuthActionsEnum.SIGN_IN_CHECK, ans: false, isAdmin: false };
  }

  return (dispatch: any, getState: any) => {
    dispatch({ type: AuthActionsEnum.START_AUTH });

    API.get('business')
      .then((res) => {
        const businessDeatails = res.data.business;
        const employee = res.data.employee;
        const services = res.data.services;
        const schedule = res.data.schedule;
        let scheduleWeek: BusinessScheduleWeek = [];
        Object.keys(schedule).forEach((key) => {
          if (schedule[key].weekNumber === parseInt(moment(new Date()).format('WW')))
            scheduleWeek = schedule[key]
        });
          
        dispatch({
          type: AuthActionsEnum.SIGN_IN_CHECK,
          ans: true,
          isAdmin: employee.isAdmin,
        });
        dispatch({
          type: serviceActionsEnum.SUCCESS_GET_ALL_SERVICES,
          services,
        });
        dispatch({
          type: DetailsActionsEnum.SUCCESS_GET_DETAILS,
          details: businessDeatails,
        });
        dispatch({
          type: scheduleActionsEnum.SUCCESS_GET_WEEK_SCHEDULE,
          scheduleWeek: scheduleWeek ? scheduleWeek : new Array(7)
        });
        return;
      })
      .catch((error: any) => {
        return dispatch({
          type: AuthActionsEnum.FALID_AUTH,
          ans: false,
          isAdmin: false,
        });
      });
  };
};

export const resetPasswordEmployee = (email: string) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: AuthActionsEnum.START_AUTH });

    API.post("business/auth/sendResetMessage", { email })
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
      })
      .then(() => {
        return dispatch({ type: AuthActionsEnum.SUCCESS_RESET_PASSWORD });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: AuthActionsEnum.FALID_AUTH,
          error: msg,
        });
      });
  };
};

export const setNewPasswordEmployee = (
  form: { password: string },
  token: string
) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: AuthActionsEnum.START_AUTH });

    API.post("business/auth/resetPassword/" + token, form)
      .then((res) => {
        const token = res.data.token;
        const domain = res.data.domain;
        localStorage.setItem("token", token);
        localStorage.setItem("domain", domain);
      })
      .then(() => {
        return dispatch({
          type: AuthActionsEnum.SUCCESS_SET_NEW_PASSWORD,
        });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: AuthActionsEnum.FALID_AUTH,
          error: msg,
        });
      });
  };
};
