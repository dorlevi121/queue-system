import { Service } from "../../../models/system/service";

export interface serviceState {
  error: string;
  loading: boolean;
  services: any[];
}

export enum serviceActionsEnum {
  START_SERVICE = "START_SERVICE",
  FALID_SERVICE = "FALID_SERVICE",
  SUCCESS_POST_SERVICE = "SUCCESS_POST_SERVICE",
  SUCCESS_GET_ALL_SERVICES = "SUCCESS_GET_ALL_SERVICES",
  SUCCESS_UPDATE_SERVICE = "SUCCESS_UPDATE_SERVICE",
  SUCCESS_DELETE_SERVICE = "SUCCESS_DELETE_SERVICE"

}

export interface serviceActionPattern {
  type: serviceActionsEnum; //Action Type
}

export interface startServicectionType extends serviceActionPattern {
  type: serviceActionsEnum.START_SERVICE;
}

export interface successPostServicesActionType extends serviceActionPattern {
  type: serviceActionsEnum.SUCCESS_POST_SERVICE;
  service: Service;
}

export interface faildServiceActionType extends serviceActionPattern {
  type: serviceActionsEnum.FALID_SERVICE;
  error: Error;
}

export interface successGetAllServicesActionType extends serviceActionPattern {
  type: serviceActionsEnum.SUCCESS_GET_ALL_SERVICES;
  services: Service[];
}

export interface successUpdateServiceActionType extends serviceActionPattern {
  type: serviceActionsEnum.SUCCESS_UPDATE_SERVICE;
  service: Service;
}

export interface successDeleteServiceActionType extends serviceActionPattern {
  type: serviceActionsEnum.SUCCESS_DELETE_SERVICE;
  serviceId: string;
}