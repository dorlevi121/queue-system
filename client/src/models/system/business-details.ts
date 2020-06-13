import { BusinesHours } from "./busines-hours";

export type BusinessDetails = {
    id?: string;
    name: string;
    address: string;
    phone: string;
    email: string;
    about: string;
    links: { [key: string]: string };
    logo?: string;
    domain: string;
    hours?: BusinesHours,
    schedule: Schedule
}


export type Schedule = {
    [weekNumber: number]: { [startHour: string]: Event }[]
};