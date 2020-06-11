import { BusinessDetails } from "../../../models/system/business-details";
import { BusinesHours } from "../../../models/system/busines-hours";

export interface BusinessState {
  error: string;
  loading: boolean;
  details: BusinessDetails | null;
  hours: BusinesHours
}

export enum DetailsActionsEnum {
  START_DETAILS = "START_DETAILS",
  FALID_DETAILS = "FALID_DETAILS",
  SUCCESS_GET_DETAILS = "SUCCESS_GET_DETAILS",
  SUCCESS_POST_DETAILS = "SUCCESS_POST_DETAILS",
  SUCCESS_POST_HOURS = "SUCCESS_POST_HOURS",
  GET_DETAILS = "GET_DETAILS"
}

export interface AuthActionPattern {
  type: DetailsActionsEnum; //Action Type
}

export interface startDetailsActionType extends AuthActionPattern {
  type: DetailsActionsEnum.START_DETAILS;
}

export interface faildDetailsActionType extends AuthActionPattern {
  type: DetailsActionsEnum.FALID_DETAILS;
  error: Error;
}

export interface getDetailsActionType extends AuthActionPattern {
  type: DetailsActionsEnum.GET_DETAILS;
  details: BusinessDetails;
}

export interface successPostDetailsActionType extends AuthActionPattern {
  type: DetailsActionsEnum.SUCCESS_POST_DETAILS;
  details: BusinessDetails
}

export interface successPostHoursActionType extends AuthActionPattern {
  type: DetailsActionsEnum.SUCCESS_POST_HOURS;
  hours: BusinesHours
}
