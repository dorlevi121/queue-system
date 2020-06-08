import React, { useState } from 'react';
import CalendarStyle from './calendar.module.scss';
import moment from 'moment';
import { cloneDeep } from 'lodash';
import * as helper from './components/helper';
import { Event } from '../../../../models/system/event';
import Button from '../../../../models/ui/button/button';
import NewQueue from './components/add-new-queue/add-new-queue.calendar';

const CalendarUser = () => {
    const [StartHour] = useState(7);
    const [EndHour] = useState(20);
    const [CurWeek, setCurWeek] = useState(parseInt(moment(new Date()).format('WW')))
    const [OpenModal, setOpenModal] = useState<boolean>(false)
    const [NewEvent, setNewEvent] = useState<{ date: string, hour: string }>({ date: "", hour: "" });

    const events: { [id: number]: { [id: string]: Event }[] } = helper.events;
    const eventsWeek: { [id: string]: Event }[] = events[CurWeek] ? events[CurWeek] : []; // all the events of week i    

    const addNewEvent = (e: Event) => {
        const friday: { [id: string]: Event } = {};
        friday['09:45'] = e;
        eventsWeek[5] = friday;
    }

    const onSlotClick = (hour: string, date: string) => {
        setOpenModal(true);
        setNewEvent({ date, hour });
        // Duration time of event - minutes
        // const durationOfEvent = moment.utc(moment(e, "YYYY-DD-MM HH:mm").diff(moment(s, "YYYY-DD-MM HH:mm"))).minutes();
        // const sMin = (moment(s).hour() * 60) + moment(s).minute();
    }

    const onEventClick = (hour: string, date: string, event: Event) => {
        console.log(hour, date, event);
        setOpenModal(true);
        setNewEvent({ date: date, hour: hour });
    }



    const allDaysWeek = helper.getWeekDaysByWeekNumber(CurWeek);

    const isEvents: Event[] = []; // Array of events or false
    const slots: JSX.Element[] = []; // Hold the table
    for (let i = StartHour; i < EndHour; i++) {
        for (let j = 0; j < 4; j++) {
            const hour = moment(i + ":" + j * 15, "HH:mm").format("HH:mm");

            for (let i = 0; i < 6; i++) { // i represent a day
                if (!eventsWeek[i]) continue; //O(1)
                if (eventsWeek[i][hour]) { //O(1)
                    isEvents[i] = eventsWeek[i][hour];
                }
                else if (isEvents[i] !== undefined) {
                    if (!(moment(hour, 'HH:mm').isBefore(moment(moment(isEvents[i].end).format("HH:mm"), 'HH:mm'))))
                        delete isEvents[i];
                }
            }

            slots.push((
                <tr key={hour}>
                    <td className={CalendarStyle.Hours} style={{ cursor: 'initial' }}>{hour}</td>
                    {
                        allDaysWeek.map((day: any, i: number) => {
                            const e = cloneDeep(isEvents[i]);
                            if (isEvents[i]) { //If The is a event
                                return (
                                    <td key={i * 10} className={CalendarStyle.Slot + " " + CalendarStyle.Event}
                                        onClick={() => onEventClick(hour, day, e)}>
                                        {isEvents[i].title}
                                    </td>
                                );
                            }
                            return ( //If The is not event
                                <td key={i * 10} className={CalendarStyle.Slot} onClick={() => onSlotClick(hour, day)}></td>
                            );
                        })
                    }
                </tr>
            ));
        }
    }


    // Return days and dats(The first row of table)
    const curMonth: string[] = [];
    const days = allDaysWeek.map((day: String, i: number) => {
        if (curMonth.indexOf(helper.monthNumberToHeb(moment(day.toString(), 'yyyy/MM/DD').month() + 1)) === -1) {
            curMonth.push(helper.monthNumberToHeb(moment(day.toString(), 'yyyy/MM/DD').month() + 1))
        }
        return (
            <th key={i * 11}>
                {helper.hebDays[i]}
                <br />
                {moment(day.toString(), "yyyy/MM/DD").format('DD/MM')}
            </th>
        );
    });


    return (
        <React.Fragment>
            {OpenModal && <NewQueue event={NewEvent} close={() => setOpenModal(false)} addNewQueue={addNewEvent} />}
            <div className={CalendarStyle.Calendar}>
                <div className={CalendarStyle.Header}>
                    <Button color='orange' onClick={() => setCurWeek(CurWeek + 1)}>שבוע הבא</Button>
                    <Button color='purple' onClick={() => setCurWeek(CurWeek - 1)}>שבוע קודם</Button>
                    <Button color='orange' onClick={() => setCurWeek(parseInt(moment(new Date()).format('WW')))}>שבוע נוכחי</Button>

                </div>
                <div className={CalendarStyle.Content}>
                    <table >
                        <tbody>
                            <tr>
                                <th className={CalendarStyle.TableHeader}>
                                    {curMonth.length === 1 ? curMonth : curMonth[0] + "-" + curMonth[1]}
                                </th>
                                {days}
                            </tr>
                            {slots}
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    )
}

export default CalendarUser;