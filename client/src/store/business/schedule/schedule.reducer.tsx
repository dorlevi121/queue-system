import { cloneDeep } from 'lodash';
import { initialScheduleState } from './schedule.state';
import {
  startScheduleActionType, faildScheduleActionType, postWeekScheduleActionType, updateWeekScheduleActionType,
  getAllScheduleActionType, getWeekScheduleActionType, scheduleActionsEnum, updateWeekNumberActionType
} from './schedule.types';

type allScheduleActionTypes = startScheduleActionType | faildScheduleActionType | postWeekScheduleActionType |
  updateWeekScheduleActionType | getAllScheduleActionType | getWeekScheduleActionType | updateWeekNumberActionType

export const scheduleReducer = (state = initialScheduleState, action: allScheduleActionTypes) => {
  switch (action.type) {
    case scheduleActionsEnum.START_SCHEDULE:
      console.log("START_SCHEDULE");
      return {
        ...state,
        loading: true,
        error: "",
      };

    case scheduleActionsEnum.FALID_SCHEDULE:
      console.log("FALID_SCHEDULE");
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case scheduleActionsEnum.SUCCESS_GET_WEEK_SCHEDULE:
      console.log("SUCCESS_GET_WEEK_SCHEDULE");
      return {
        ...state,
        loading: false,
        error: '',
        scheduleWeek: cloneDeep(action.scheduleWeek)
      };

    case scheduleActionsEnum.SUCCESS_UPDATE_WEEK_SCHEDULE:
      console.log("SUCCESS_UPDATE_WEEK_SCHEDULE");
      return {
        ...state,
        loading: false,
        error: "",
        scheduleWeek: cloneDeep(action.scheduleWeek)
      };

    case scheduleActionsEnum.SUCCESS_POST_WEEK_SCHEDULE:
      console.log("SUCCESS_POST_WEEK_SCHEDULE");
      return {
        ...state,
        loading: false,
        error: "",
        scheduleWeek: cloneDeep(action.scheduleWeek)
      };

    case scheduleActionsEnum.SUCCESS_WEEK_NUMBER:
      console.log("SUCCESS_WEEK_NUMBER");
      return {
        ...state,
        loading: false,
        error: "",
        scheduleWeek: action.scheduleWeek,
        weekNumber: action.weekNumber
      };
  }
  return state;
};
