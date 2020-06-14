import API from "../../../models/axios/axios";
import { cloneDeep } from 'lodash'
import { BusinessScheduleWeek } from "../../../models/system/event";
import { scheduleActionsEnum } from "./schedule.types";

export const postScheduleWeek = (schedule: BusinessScheduleWeek, weekNumber: number) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: scheduleActionsEnum.START_SCHEDULE });
    const form = {
      schedule,
      year: "2020",
      weekNumber
    }
    API.post("business/schedule/scheduleWeek", form)
      .then((res) => {
        return dispatch({
          type: scheduleActionsEnum.SUCCESS_POST_WEEK_SCHEDULE,
          service: res.data.schedule,
        });
      })
      .catch((error: any) => {
        // const msg = error.response.data.message;
        console.log(error);

        return dispatch({
          type: scheduleActionsEnum.FALID_SCHEDULE,
          error: error,
        });
      });
  };
};


export const getScheduleWeek = (weekNumber: number) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: scheduleActionsEnum.START_SCHEDULE });
    const config = {
      data: {
        weekNumber
      }
    }

    API.get("business/schedule/scheduleWeek", config)
      .then((res) => {
        return dispatch({
          type: scheduleActionsEnum.SUCCESS_GET_WEEK_SCHEDULE,
          scheduleWeek: res.data.scheduleWeek,
        });
      })
      .catch((error: any) => {
        const msg = error.response.data.message;
        return dispatch({
          type: scheduleActionsEnum.FALID_SCHEDULE,
          error: msg,
        });
      });
  };
};


export const updateScheduleWeek = (scheduleWeek: BusinessScheduleWeek, weekNumber: number) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: scheduleActionsEnum.START_SCHEDULE });
    const form = {
      scheduleWeek,
      year: "2020",
      weekNumber
    }
    API.put("business/schedule/scheduleWeek", form)
      .then((res) => {
        return dispatch({
          type: scheduleActionsEnum.SUCCESS_UPDATE_WEEK_SCHEDULE,
          scheduleWeek: res.data.scheduleWeek,
        });
      })
      .catch((error: any) => {
        // const msg = error.response.data.message;
        console.log(error);

        return dispatch({
          type: scheduleActionsEnum.FALID_SCHEDULE,
          error: error,
        });
      });
  };
};

export const updateWeekNumber = (weekNumber: number) => {
  return (dispatch: any, getState: any) => {
    dispatch({ type: scheduleActionsEnum.START_SCHEDULE });
    const config = {
      data: {
        weekNumber: weekNumber
      }
    }
    API.post("business/schedule/scheduleWeek", config)
      .then((res) => {
        return dispatch({
          type: scheduleActionsEnum.SUCCESS_WEEK_NUMBER,
          weekNumber,
          scheduleWeek: res.data.scheduleWeek,
        });
      })
      .catch((error: any) => {
        // const msg = error.response.data.message;
        console.log(error);

        return dispatch({
          type: scheduleActionsEnum.FALID_SCHEDULE,
          error: error,
        });
      });
  };
};


// export const deleteService = (service: Service) => {
//   return (dispatch: any, getState: any) => {
//     dispatch({ type: serviceActionsEnum.START_SERVICE });
//     const config = {
//       data: {
//         service: service
//       }
//     }

//     API.delete("business/service/", config)
//       .then(() => {
//         return dispatch({
//           type: serviceActionsEnum.SUCCESS_DELETE_SERVICE,
//           serviceId: service._id
//         });
//       })
//       .catch((error: any) => {
//         const msg = error.response.data.message;
//         return dispatch({
//           type: serviceActionsEnum.FALID_SERVICE,
//           error: msg,
//         });
//       });
//   };
// };