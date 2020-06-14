import { BusinessScheduleWeek, BusinessSchedule } from "../../../models/system/event";

export interface scheduletate {
  error: string;
  loading: boolean;
  weekNumber: number;
  scheduleWeek: BusinessScheduleWeek;
}

export enum scheduleActionsEnum {
  START_SCHEDULE = "START_SCHEDULE",
  FALID_SCHEDULE = "FALID_SCHEDULE",
  SUCCESS_POST_WEEK_SCHEDULE = "SUCCESS_POST_WEEK_SCHEDULE",
  SUCCESS_UPDATE_WEEK_SCHEDULE = "SUCCESS_UPDATE_WEEK_SCHEDULE",
  SUCCESS_GET_WEEK_SCHEDULE = "SUCCESS_GET_WEEK_SCHEDULE",
  SUCCESS_GET_ALL_SCHEDULE = "SUCCESS_GET_ALL_SCHEDULE",
  SUCCESS_WEEK_NUMBER= "SUCCESS_WEEK_NUMBER"

}

export interface scheduleActionPattern {
  type: scheduleActionsEnum; //Action Type
}

export interface startScheduleActionType extends scheduleActionPattern {
  type: scheduleActionsEnum.START_SCHEDULE;
}

export interface faildScheduleActionType extends scheduleActionPattern {
  type: scheduleActionsEnum.FALID_SCHEDULE;
  error: Error;
}

export interface postWeekScheduleActionType extends scheduleActionPattern {
  type: scheduleActionsEnum.SUCCESS_POST_WEEK_SCHEDULE;
  scheduleWeek: BusinessScheduleWeek;
}

export interface updateWeekScheduleActionType extends scheduleActionPattern {
  type: scheduleActionsEnum.SUCCESS_UPDATE_WEEK_SCHEDULE;
  scheduleWeek: BusinessScheduleWeek;
}

export interface getWeekScheduleActionType extends scheduleActionPattern {
  type: scheduleActionsEnum.SUCCESS_GET_WEEK_SCHEDULE;
  scheduleWeek: BusinessScheduleWeek;
}

export interface getAllScheduleActionType extends scheduleActionPattern {
  type: scheduleActionsEnum.SUCCESS_GET_ALL_SCHEDULE;
  allSchedule: BusinessSchedule;
}

export interface updateWeekNumberActionType extends scheduleActionPattern {
  type: scheduleActionsEnum.SUCCESS_WEEK_NUMBER;
  weekNumber: number;
  scheduleWeek: BusinessScheduleWeek;
}
