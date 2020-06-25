import moment from "moment";
import API from "../../../models/axios/axios";
import { BusinessScheduleWeek } from "../../../models/system/event";
import { AuthDomainActionsEnum } from "./auth-domain.types";
import { Client } from "../../../models/system/client";

export const checkDomain = (domain: string) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: AuthDomainActionsEnum.START_AUTH_DOMAIN });

    API.get(domain + "/authDomain/checkDomain/" + domain)
      .then((res) => {
        localStorage.setItem("domain", domain);
        return dispatch({ type: AuthDomainActionsEnum.SUCCESS_LOGIN_AUTH_DOMAIN });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: AuthDomainActionsEnum.FALID_AUTH_DOMAIN,
          error: msg,
        });
      });
  };
};
 
export const clientRegister = (clientDetails: Client) => {
  const domain = localStorage.getItem("domain");
  return (dispatch: any, getState: any) => {
    dispatch({ type: AuthDomainActionsEnum.START_AUTH_DOMAIN });

    API.post(domain + "/authDomain/register", clientDetails)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
        return dispatch({ type: AuthDomainActionsEnum.SUCCESS_LOGIN_AUTH_DOMAIN });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: AuthDomainActionsEnum.FALID_AUTH_DOMAIN,
          error: msg,
        });
      });
  };
};

export const clientLogin = (phone: string) => {
  const domain = localStorage.getItem("domain");
  return (dispatch: any, getState: any) => {
    dispatch({ type: AuthDomainActionsEnum.START_AUTH_DOMAIN });

    API.post(domain + "/authDomain/login", phone)
      .then((res) => {
        const token = res.data.token;
        localStorage.setItem("token", token);
      })
      .then(() => {
        return dispatch({ type: AuthDomainActionsEnum.SUCCESS_LOGIN_AUTH_DOMAIN });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: AuthDomainActionsEnum.FALID_AUTH_DOMAIN,
          error: msg,
        });
      });
  };
};

export const signInCheck = () => {
  const token = localStorage.getItem("token");
  const domain = localStorage.getItem("domain");
  if (!token || !domain) {
    return { type: AuthDomainActionsEnum.SIGN_IN_CHECK_DOMAIN, ans: false };
  }

  return (dispatch: any, getState: any) => {
    dispatch({ type: AuthDomainActionsEnum.START_AUTH_DOMAIN });

    API.get(domain)
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
      })
      .catch((error: any) => {
        return dispatch({
          type: AuthDomainActionsEnum.FALID_AUTH_DOMAIN,
          ans: false,
          isAdmin: false,
        });
      });
  };
};
