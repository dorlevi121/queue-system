import React, { useState } from 'react';
import CalendarStyle from './calendar.module.scss';
import moment from 'moment';
import { cloneDeep } from 'lodash';
import * as helper from './components/helper';
import { Event, BusinessSchedule } from '../../../../models/system/event';
import Button from '../../../../models/ui/button/button';
import NewQueue from './components/add-new-queue/add-new-queue.calendar';
import { connect } from 'react-redux';
import { BusinesHours } from '../../../../models/system/busines-hours';
import { getHours, getSchedule } from '../../../../store/business/details/details.selectors';
import { FullEngDays } from '../../../../assets/days/days';
import { Service } from '../../../../models/system/service';
import { getServices } from '../../../../store/business/service/service.selectors';
import { postBusinessSchedule } from '../../../../store/business/details/details.actions';

interface StateProps {
    hours: BusinesHours,
    services: Service[],
    schedule: BusinessSchedule
}

interface DispatchProps {
    postBusinessSchedule: typeof postBusinessSchedule;
}

type Props = DispatchProps & StateProps;
const CalendarUser: React.FC<Props> = (props) => {
    const [StartHour] = useState(7);
    const [EndHour] = useState(20);
    const [CurWeek, setCurWeek] = useState(parseInt(moment(new Date()).format('WW')))
    const [OpenModal, setOpenModal] = useState<boolean>(false)
    const [NewEvent, setNewEvent] = useState<{ date: string, hour: string }>({ date: "", hour: "" });
    const [Events, setEvents] = useState<{ [weekNumber: number]: { [id: string]: Event }[] }>(props.schedule)
    let eventsWeek: { [id: string]: Event }[] = Events[CurWeek] ? Events[CurWeek] : new Array(7); // all the events of week i    
    console.log(Events);
    console.log(eventsWeek);

    const addNewEvent = (event: Event) => {
        event.start = moment(event.start, "HH:mm").format("HH:mm");
        event.end = moment(event.end, "HH:mm").format("HH:mm");
        const copyEvents = cloneDeep(Events)
        const CurEventsWeek = copyEvents[CurWeek] ? cloneDeep(copyEvents[CurWeek]) : new Array(7);
        const dayEvents: { [id: string]: Event } = CurEventsWeek[3] ? CurEventsWeek[3] : {};
        dayEvents[event.start.toString()] = event;
        CurEventsWeek[3] = dayEvents
        copyEvents[CurWeek] = CurEventsWeek;
        props.postBusinessSchedule(copyEvents)
        setEvents(copyEvents)

    }

    const onSlotClick = (hour: string, date: string) => {
        setOpenModal(true);
        setNewEvent({ date, hour });
        // Duration time of event - minutes
        // const durationOfEvent = moment.utc(moment(e, "YYYY-DD-MM HH:mm").diff(moment(s, "YYYY-DD-MM HH:mm"))).minutes();
        // const sMin = (moment(s).hour() * 60) + moment(s).minute();
    }

    const onEventClick = (hour: string, date: string, event: Event) => {
        setOpenModal(true);
        setNewEvent({ date: date, hour: hour });
    }



    const allDaysWeek = helper.getWeekDaysByWeekNumber(CurWeek);

    const isEvents: Event[] = []; // Array of events or false
    const slots: JSX.Element[] = []; // Hold the table
    for (let i = StartHour; i < EndHour; i++) {
        for (let j = 0; j < 6; j++) {
            const hour = moment(i + ":" + j * 10, "HH:mm").format("HH:mm");

            for (let k = 0; k < 6; k++) { // i represent a day
                if (!eventsWeek[k]) continue; //O(1)
                if (eventsWeek[k][hour]) { //O(1)
                    isEvents[k] = eventsWeek[k][hour];
                }
                else if (isEvents[k]) {
                    if (!moment(hour, 'HH:mm').isBefore(moment(isEvents[k].end, 'HH:mm'))) {
                        delete isEvents[k];
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
                                return (
                                    <td key={r * 10} className={CalendarStyle.Slot + " " + CalendarStyle.Event}
                                        onClick={() => onEventClick(hour, day, isEvents[r])}>
                                        {isEvents[r].title}
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
            {OpenModal && <NewQueue date={NewEvent} close={() => setOpenModal(false)} addNewEvent={addNewEvent} services={props.services} />}
            <div className={CalendarStyle.Calendar}>
                <div className={CalendarStyle.Header}>
                    <Button color='purple' onClick={() => setCurWeek(CurWeek - 1)}>שבוע קודם</Button>
                    <Button color='orange' onClick={() => setCurWeek(parseInt(moment(new Date()).format('WW')))}>שבוע נוכחי</Button>
                    <Button color='orange' onClick={() => setCurWeek(CurWeek + 1)}>שבוע הבא</Button>

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
    schedule: getSchedule(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    postBusinessSchedule: (schedule: BusinessSchedule) => dispatch(postBusinessSchedule(schedule))
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(CalendarUser);