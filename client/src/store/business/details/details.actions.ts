import { DetailsActionsEnum } from "./details.types";
import API from "../../../models/axios/axios";
import { BusinessDetails } from "../../../models/system/business-details";
import { BusinesHours } from "../../../models/system/busines-hours";
import { BusinessSchedule } from "../../../models/system/event";

export const getDetails = () => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: DetailsActionsEnum.START_DETAILS });

    API.get("business/details")
      .then(res => {
        const details = res.data.details;
        return dispatch({ type: DetailsActionsEnum.SUCCESS_GET_DETAILS, details });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: DetailsActionsEnum.FALID_DETAILS,
          error: msg,
        });
      });
  };
};

// Put and Post
export const postDetails = (details: BusinessDetails) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: DetailsActionsEnum.START_DETAILS });

    API.post("business/details", details)
      .then(res => {        
        return dispatch({ type: DetailsActionsEnum.SUCCESS_POST_DETAILS, details: res.data.updatdeDetail });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: DetailsActionsEnum.FALID_DETAILS,
          error: msg,
        });
      });
  };
};

export const postBuisnessHours = (hours: BusinesHours) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: DetailsActionsEnum.START_DETAILS });

    API.post("business/details/hours", hours)
      .then((res) => {
        return dispatch({ type: DetailsActionsEnum.SUCCESS_POST_HOURS, hours: res.data.hours });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: DetailsActionsEnum.FALID_DETAILS,
          error: msg,
        });
      });
  };
};
