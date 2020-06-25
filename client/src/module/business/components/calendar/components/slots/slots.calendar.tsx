import React from 'react';
import CalendarStyle from '../../calendar.module.scss';
import moment from 'moment';
import { cloneDeep } from 'lodash';
import { getWeekDaysByWeekNumber, FullEngDays } from '../../../../../../assets/days/days';
import { BusinessScheduleWeek, Event } from '../../../../../../models/system/event';
import { BusinesHours } from '../../../../../../models/system/busines-hours';
import { Service } from '../../../../../../models/system/service';
import { findServiceById } from '../../../shared/helper-functions/helper';

interface OwnProps {
    weekNumber: number,
    activityTime: { start: number, end: number },
    eventsWeek: BusinessScheduleWeek,
    onEventClick: (hour: string, day: string, event: Event) => void,
    onSlotClick: (hour: string, day: string) => void,
    businessHours: BusinesHours,
    services: Service[]
}

const Slots: React.FC<OwnProps> = React.memo(props => {
    console.log("slots");

    const allDaysWeek = getWeekDaysByWeekNumber(props.weekNumber);

    const isEvents: Event[] = []; // Array of events or false
    const slots: JSX.Element[] = []; // Hold the table
    for (let i = props.activityTime.start; i < props.activityTime.end; i++) {
        for (let j = 0; j < 6; j++) {
            const hour = moment(i + ":" + j * 10, "HH:mm").format("HH:mm");

            // for (let day = 0; day < 6; day++) { // i represent a day
            //     if (!props.eventsWeek[day]) continue; //O(1)
            //     if (props.eventsWeek[day][hour]) { //O(1)
            //         isEvents[day] = props.eventsWeek[day][hour];
            //     }
            //     else if (isEvents[day] && !moment(hour, 'HH:mm').isBefore(moment(isEvents[day].end, 'HH:mm'))) {
            //         delete isEvents[day];
            //     }
            // }

            slots.push((
                <tr key={hour}>
                    <td className={CalendarStyle.Hours} style={{ cursor: 'initial' }}>{hour}</td>
                    {
                        allDaysWeek.map((day: any, r: number) => {
                            const hours = props.businessHours[FullEngDays[r]];
                            if (props.eventsWeek[day][hour]) { //O(1)
                                isEvents[day] = props.eventsWeek[day][hour];
                            }
                            else if (isEvents[day] && !moment(hour, 'HH:mm').isBefore(moment(isEvents[day].end, 'HH:mm'))) {
                                delete isEvents[day];
                            }
                            if ((hours[0] && ((moment(hour, 'HH:mm').isBefore(moment(hours[0].start, 'HH:mm'))) ||
                                (moment(hours[0].end, 'HH:mm').isBefore(moment(hour, 'HH:mm')))) || hours.length < 1)) {
                                return (
                                    <td key={r * 10} className={CalendarStyle.Slot + " " + CalendarStyle.NoWork}>
                                    </td>
                                )
                            }
                            if (isEvents[r]) { //If there is a event        
                                const service = findServiceById(props.services, isEvents[r].serviceId);
                                const event: Event = cloneDeep(isEvents[r]);
                                return (
                                    <td key={r * 10} className={CalendarStyle.Slot + " " + CalendarStyle.Event}
                                        onClick={() => props.onEventClick(hour, day, event)}>
                                        {service?.title}
                                    </td>
                                );
                            }
                            return ( //If The is not event
                                <td key={r * 10} className={CalendarStyle.Slot} onClick={() => props.onSlotClick(hour, day)}></td>
                            );
                        })
                    }
                </tr>
            ));
        }
    }
    return (
        <React.Fragment>
            {slots}
        </React.Fragment>
    )
},
    (perv, next) => {
        if (perv.eventsWeek === next.eventsWeek)
            return true
        return false;
    })

export default Slots;
