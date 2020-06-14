import React, { useState, useEffect } from 'react';
import CalendarStyle from './calendar.module.scss';
import moment from 'moment';
import { cloneDeep } from 'lodash';
import * as helper from './components/helper';
import { Event, BusinessScheduleWeek } from '../../../../models/system/event';
import Button from '../../../../models/ui/button/button';
import NewQueue from './components/add-new-queue/add-new-queue.calendar';
import { connect } from 'react-redux';
import { BusinesHours } from '../../../../models/system/busines-hours';
import { getHours } from '../../../../store/business/details/details.selectors';
import { FullEngDays } from '../../../../assets/days/days';
import { Service } from '../../../../models/system/service';
import { getServices } from '../../../../store/business/service/service.selectors';
import { postScheduleWeek, updateScheduleWeek, updateWeekNumber } from '../../../../store/business/schedule/schedule.actions';
import { getScheduleWeek, getWeekNumber } from '../../../../store/business/schedule/schedule.selectors';
import { scheduleActionsEnum } from '../../../../store/business/schedule/schedule.types';

interface StateProps {
    hours: BusinesHours,
    services: Service[],
    scheduleWeek: any,
    weekNumber: number
}

interface DispatchProps {
    postScheduleWeek: typeof postScheduleWeek;
    updateScheduleWeek: typeof updateScheduleWeek;
    updateWeekNumber: typeof updateWeekNumber
}

type Props = DispatchProps & StateProps;
const CalendarUser: React.FC<Props> = (props) => {
    const [ActivityTime, setActivityTime] = useState({
        start: 7,
        end: 20
    })
    const [OpenModal, setOpenModal] = useState<boolean>(false)
    const [Time, setTime] = useState<{ date: string, hour: string }>({ date: "", hour: "" });
    const [CurEvent, setCurEvent] = useState<Event | undefined>();
    const [EventsWeek, setEventsWeek] = useState<BusinessScheduleWeek>([])

    useEffect(() => {
        const events = props.scheduleWeek.events ? props.scheduleWeek.events : props.scheduleWeek
        setEventsWeek(events)
    }, [props.scheduleWeek])


    const addNewEvent = (event: Event) => {
        const newEvent: Event = {
            start: event.start,
            end: event.end,
            serviceId: event.serviceId,
            employeeId: "111",
            clientPhone: event.clientPhone,
            isApprove: true,
            isPaid: false,
            title: event.title,
            description: event.description
        }
        const dayNumber = moment(Time.date).day();
        const CurEventsWeek = cloneDeep(EventsWeek);
        const dayEvents: { [id: string]: Event } = CurEventsWeek[dayNumber] ? CurEventsWeek[dayNumber] : {};
        dayEvents[newEvent.start.toString()] = newEvent;
        CurEventsWeek[dayNumber] = dayEvents
        props.updateScheduleWeek(CurEventsWeek, props.weekNumber)
    }

    const onSlotClick = (hour: string, date: string) => {
        setOpenModal(true);
        setTime({ date, hour });
    }

    const onEventClick = (hour: string, date: string, event: Event) => {
        setOpenModal(true);
        setCurEvent(event);
        setTime({ date: date, hour: hour });
    }

    const allDaysWeek = helper.getWeekDaysByWeekNumber(props.weekNumber);

    const isEvents: Event[] = []; // Array of events or false
    const slots: JSX.Element[] = []; // Hold the table
    for (let i = ActivityTime.start; i < ActivityTime.end; i++) {
        for (let j = 0; j < 6; j++) {
            const hour = moment(i + ":" + j * 10, "HH:mm").format("HH:mm");

            for (let day = 0; day < 6; day++) { // i represent a day
                if (!EventsWeek[day]) continue; //O(1)
                if (EventsWeek[day][hour]) { //O(1)
                    isEvents[day] = EventsWeek[day][hour];
                }
                else if (isEvents[day]) {
                    if (!moment(hour, 'HH:mm').isBefore(moment(isEvents[day].end, 'HH:mm'))) {
                        delete isEvents[day];
                    }
                }
            }

            slots.push((
                <tr key={hour}>
                    <td className={CalendarStyle.Hours} style={{ cursor: 'initial' }}>{hour}</td>
                    {
                        allDaysWeek.map((day: any, r: number) => {
                            const hours = props.hours[FullEngDays[r]];

                            if (hours[0] && ((moment(hour, 'HH:mm').isBefore(moment(hours[0].start, 'HH:mm'))) ||
                                (moment(hours[0].end, 'HH:mm').isBefore(moment(hour, 'HH:mm'))))) {
                                return (
                                    <td key={r * 10} className={CalendarStyle.Slot + " " + CalendarStyle.NoWork}>
                                    </td>
                                )
                            }
                            if (isEvents[r]) { //If there is a event        
                                const service = props.services.find(s => s._id === isEvents[r].serviceId)
                                return (
                                    <td key={r * 10} className={CalendarStyle.Slot + " " + CalendarStyle.Event}
                                        onClick={() => onEventClick(hour, day, isEvents[r])}>
                                        {service?.title}
                                    </td>
                                );
                            }
                            return ( //If The is not event
                                <td key={r * 10} className={CalendarStyle.Slot} onClick={() => onSlotClick(hour, day)}></td>
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
            {OpenModal && <NewQueue date={Time} close={() => setOpenModal(false)} curEvent={CurEvent}
                addNewEvent={addNewEvent} services={props.services} />}
            <div className={CalendarStyle.Calendar}>
                <div className={CalendarStyle.Header}>
                    <Button color='purple' onClick={() => props.updateWeekNumber(props.weekNumber - 1)}>שבוע קודם</Button>
                    <Button color='orange' onClick={() => props.updateWeekNumber(parseInt(moment(new Date()).format('WW')))}>שבוע נוכחי</Button>
                    <Button color='orange' onClick={() => props.updateWeekNumber(props.weekNumber + 1)}>שבוע הבא</Button>

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

const mapStateToProps = (state: any) => ({
    hours: getHours(state),
    services: getServices(state),
    scheduleWeek: getScheduleWeek(state),
    weekNumber: getWeekNumber(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    postScheduleWeek: (schedule: BusinessScheduleWeek, weekNumber: number) => dispatch(postScheduleWeek(schedule, weekNumber)),
    updateScheduleWeek: (schedule: BusinessScheduleWeek, weekNumber: number) => dispatch(updateScheduleWeek(schedule, weekNumber)),
    updateWeekNumber: (weekNumber: number) => dispatch(updateWeekNumber(weekNumber))
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(CalendarUser);