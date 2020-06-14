import { Service } from "./service";

export type Event = {
    _id?: number,
    serviceId: string
    title?: string,
    clientPhone: string,
    employeeId: string,
    description?: string,
    start: string,
    end: string,
    isApprove?: boolean,
    isPaid?: boolean
}

export type BusinessSchedule = {
    [weekNumber: number]: BusinessScheduleWeek
};

export type BusinessScheduleWeek = { [startHour: string]: Event }[]