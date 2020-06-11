import { Service } from "../../../models/system/service";
import { serviceActionsEnum } from "./service.types";
import API from "../../../models/axios/axios";
import { cloneDeep } from 'lodash'

export const postService = (service: Service) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: serviceActionsEnum.START_SERVICE });

    API.post("business/service", service)
      .then((res) => {
        return dispatch({
          type: serviceActionsEnum.SUCCESS_POST_SERVICE,
          service: res.data.service,
        });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: serviceActionsEnum.FALID_SERVICE,
          error: msg,
        });
      });
  };
};

export const getAllServices = () => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: serviceActionsEnum.START_SERVICE });

    API.get("business/service")
      .then((res) => {
        console.log(res.data);
        return dispatch({
          type: serviceActionsEnum.SUCCESS_GET_ALL_SERVICES,
          service: res.data.services,
        });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: serviceActionsEnum.FALID_SERVICE,
          error: msg,
        });
      });
  };
};


export const updateService = (service: Service) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: serviceActionsEnum.START_SERVICE });
    const copyS: any = cloneDeep(service);
    copyS.id = service._id;
    delete copyS._id;

    API.put("business/service", copyS)
      .then((res) => {
        return dispatch({
          type: serviceActionsEnum.SUCCESS_UPDATE_SERVICE,
          service: res.data.service,
        });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: serviceActionsEnum.FALID_SERVICE,
          error: msg,
        });
      });
  };
};

export const deleteService = (service: Service) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: serviceActionsEnum.START_SERVICE });
    const config = {
      data: {
        service: service
      }
    }

    API.delete("business/service/", config)
      .then(() => {
        return dispatch({
          type: serviceActionsEnum.SUCCESS_DELETE_SERVICE,
          serviceId: service._id
        });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: serviceActionsEnum.FALID_SERVICE,
          error: msg,
        });
      });
  };
};