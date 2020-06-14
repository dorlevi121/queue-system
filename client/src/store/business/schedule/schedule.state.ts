import { scheduletate } from "./schedule.types";
import moment from "moment";

export const initialScheduleState: scheduletate = {
  loading: false,
  error: '',
  weekNumber: parseInt(moment(new Date()).format('WW')),
  scheduleWeek: []
};
