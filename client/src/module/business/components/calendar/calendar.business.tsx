import React, { useState, useEffect } from 'react';
import CalendarStyle from './calendar.module.scss';
import moment from 'moment';
import { cloneDeep } from 'lodash';
import { Event, BusinessScheduleWeek } from '../../../../models/system/event';
import Button from '../../../../models/ui/button/button';
import NewQueue from './components/add-new-queue/add-new-queue.calendar';
import { connect } from 'react-redux';
import { BusinesHours } from '../../../../models/system/busines-hours';
import { getHours } from '../../../../store/business/details/details.selectors';
import { FullEngDays, getWeekDaysByWeekNumber, monthNumberToHeb, FullHebDays } from '../../../../assets/days/days';
import { Service } from '../../../../models/system/service';
import { getServices } from '../../../../store/business/service/service.selectors';
import { postScheduleWeek, updateScheduleWeek, updateWeekNumber } from '../../../../store/business/schedule/schedule.actions';
import { getScheduleWeek, getWeekNumber, getLoading, getError } from '../../../../store/business/schedule/schedule.selectors';
import Slots from './components/slots/slots.calendar';
import Loading from '../../../../models/ui/loading/loading';

interface StateProps {
    loading: boolean,
    error: string,
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
        start: 8,
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

    const deleteEvent = (event: Event | undefined) => {
        if (!event) return;
        const dayNumber = moment(Time.date).day();
        const CurEventsWeek = cloneDeep(EventsWeek);
        const dayEvents: { [id: string]: Event } = CurEventsWeek[dayNumber] ? CurEventsWeek[dayNumber] : {};
        delete dayEvents[event.start.toString()];
        CurEventsWeek[dayNumber] = dayEvents
        props.updateScheduleWeek(CurEventsWeek, props.weekNumber);
        setOpenModal(false);
    }


    if (!OpenModal && CurEvent) {
        setCurEvent(undefined)
    }

    // Return days and dats(The first row of table)
    const curMonth: string[] = [];
    const days = getWeekDaysByWeekNumber(props.weekNumber).map((day: String, i: number) => {
        if (curMonth.indexOf(monthNumberToHeb(moment(day.toString(), 'yyyy/MM/DD').month() + 1)) === -1) {
            curMonth.push(monthNumberToHeb(moment(day.toString(), 'yyyy/MM/DD').month() + 1))
        }
        return (
            <th key={i * 11}>
                {FullHebDays[i]}
                <br />
                {moment(day.toString(), "yyyy/MM/DD").format('DD/MM')}
            </th>
        );
    });

    return (
        <React.Fragment>
            {OpenModal && <NewQueue date={Time} close={() => setOpenModal(false)} curEvent={CurEvent}
                addNewEvent={addNewEvent} services={props.services} deleteEvent={deleteEvent} />}
            <div className={CalendarStyle.Calendar}>
                <div className={CalendarStyle.Header}>
                    <div className={CalendarStyle.Buttons}>
                        <Button color='purple' onClick={() => props.updateWeekNumber(props.weekNumber - 1)}>שבוע קודם</Button>
                        <Button color='orange' onClick={() => props.updateWeekNumber(parseInt(moment(new Date()).format('WW')))}>שבוע נוכחי</Button>
                        <Button color='orange' onClick={() => props.updateWeekNumber(props.weekNumber + 1)}>שבוע הבא</Button>
                    </div>
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
                            {
                                props.loading ? (<Loading />) :
                                    (
                                        <Slots
                                            weekNumber={props.weekNumber}
                                            activityTime={ActivityTime}
                                            eventsWeek={EventsWeek}
                                            onEventClick={onEventClick}
                                            onSlotClick={onSlotClick}
                                            businessHours={props.hours}
                                            services={props.services}
                                        />
                                    )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state: any) => ({
    loading: getLoading(state),
    error: getError(state),
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