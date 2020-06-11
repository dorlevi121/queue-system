import { initialserviceState } from "./service.state";
import { cloneDeep } from 'lodash';
import {
  startServicectionType,
  successPostServicesActionType,
  faildServiceActionType,
  serviceActionsEnum,
  successGetAllServicesActionType,
  successUpdateServiceActionType,
  successDeleteServiceActionType
} from "./service.types";
import { Service } from "../../../models/system/service";

type allserviceActionTypes =
  startServicectionType | successPostServicesActionType | successUpdateServiceActionType
  | faildServiceActionType | successGetAllServicesActionType | successDeleteServiceActionType;

export const serviceReducer = (state = initialserviceState, action: allserviceActionTypes) => {
  switch (action.type) {
    case serviceActionsEnum.START_SERVICE:
      console.log("START_SERVICE");
      return {
        ...state,
        loading: true,
        error: "",
      };

    case serviceActionsEnum.SUCCESS_POST_SERVICE:
      console.log("SUCCESS_POST_SERVICE");
      const services = [...state.services];
      services.push(action.service);
      return {
        ...state,
        loading: false,
        error: "",
        services: services,
      };

    case serviceActionsEnum.FALID_SERVICE:
      console.log("FALID_SERVICE");
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case serviceActionsEnum.SUCCESS_UPDATE_SERVICE:
      console.log("SUCCESS_UPDATE_SERVICE");
      const s = [...state.services];

      s.forEach((service: Service, i) => {
        if (service._id === action.service._id) {
          service._id = action.service._id;
          service.available = action.service.available;
          service.category = action.service.category;
          service.duration = action.service.duration;
          service.price = action.service.price;
          service.title = action.service.title;
        }
      })
      return {
        ...state,
        loading: false,
        error: "",
        services: cloneDeep(s)
      };

    case serviceActionsEnum.SUCCESS_GET_ALL_SERVICES:
      console.log("SUCCESS_GET_ALL_SERVICES");
      return {
        ...state,
        loading: false,
        error: "",
        services: action.services
      };

    case serviceActionsEnum.SUCCESS_DELETE_SERVICE:
      const servicesUpdate = [...state.services].filter(ser => ser._id !== action.serviceId);
      console.log(servicesUpdate);

      console.log("SUCCESS_DELETE_SERVICE");
      return {
        ...state,
        loading: false,
        error: "",
        services: servicesUpdate
      };
  }
  return state;
};
