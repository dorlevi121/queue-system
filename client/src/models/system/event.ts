import { Service } from "./service";

export type Event = {
    id?: number,
    service: Service
    title?: string,
    clientPhone: string,
    employeeId: number,
    description?: string,
    start: string,
    end: string,
}

export type BusinessSchedule = {
    [weekNumber: number]: { [startHour: string]: Event }[]
};