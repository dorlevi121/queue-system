import React, { useState, useEffect } from 'react';
import HoursStyle from './opening-hours.module.scss';
import * as days from '../../../../../assets/days/days';
import * as hours from '../../../../../assets/hours/hours';
import SettingsHeader from '../../shared/header/settings-header.shared';
import Breadcrumbs from '../../../../../models/ui/breadcrumbs/breadcrumbs';
import SwitchButton from '../../../../../models/ui/switch-button/switch-button';
import Options from '../../../../../models/ui/options/options';
import { BusinesHours } from '../../../../../models/system/busines-hours';
import { ArrowNext } from '../../../../../assets/icons/icons';
import Button from '../../../../../models/ui/button/button';
import { connect } from 'react-redux';
import { getLoading, getError, getHours, getBusinessDetails } from '../../../../../store/business/details/details.selectors';
import { BusinessDetails } from '../../../../../models/system/business-details';
import { postBuisnessHours } from '../../../../../store/business/details/details.actions';

interface StateProps {
    loading: boolean;
    error: string;
    hours: BusinesHours;
    businesDetails: BusinessDetails | null
}

interface DispatchProps {
    postBuisnessHours: typeof postBuisnessHours;
}

type Props = DispatchProps & StateProps;
const OpeningHours: React.FC<Props> = (props) => {
    const [IsMobile, setIsMobile] = useState<any>(false);
    const [Hours, setHours] = useState<BusinesHours>(props.hours)

    // Component did mount
    useEffect(() => {
        const resize = () => {
            let currentHideNav = window.innerWidth <= 600; // Check if the device witdh <= 600px
            if (currentHideNav !== IsMobile) {
                setIsMobile(currentHideNav);
            }
        };
        resize();
    }, [IsMobile]);

    const onChangeHour = (e: any, arg: any, day?: string) => {
        if (!day) return;
        const hour = e.target.value;
        const time: "start" | "end" = arg;
        const curHours: { start: string, end: string }[] = Hours[day];
        curHours[0][time] = hour;
        setHours({
            ...Hours, [day]: curHours
        });
    }

    const onClickAvailable = (name: string, value: boolean, day?: string) => {
        if (!day) return;
        const curHours: { start: string, end: string }[] = Hours[day];
        if (!value) {
            // if day[0] == {start: "00:00", end: "00:00"} meaning that day us unavailable
            curHours.unshift({ start: "00:00", end: "00:00" });
        }
        else {
            if (!curHours.length) {
                curHours.push({ start: "06:00", end: "24:00" });
            }
            else {
                curHours.splice(0, 1);
            }
        }
        setHours({
            ...Hours, [day]: curHours
        });
    }

    const updateHours = () => {
        props.postBuisnessHours(Hours)
    }

    let hebDays: string[] = IsMobile ? days.shortenedHebDays : days.FullHebDays;

    return (
        <React.Fragment>
            <SettingsHeader title="שעות פתיחה" sunTitle="כאן תוכל לערוך את ימי ושעות פתיחת העסק שלך" />
            <div className={HoursStyle.OpeningHours}>
                <Breadcrumbs title="שעות פתיחה" />

                <div className={HoursStyle.Body}>
                    <div className={HoursStyle.Days}>
                        {hebDays.map((d: string, i: number) =>
                            <p key={d} className={HoursStyle.Day} >{d}</p>
                        )}
                    </div>

                    <hr />

                    <div className={HoursStyle.DaysContent}>
                        {hebDays.map((d: string, i: number) => {
                            const curEnglishDay = days.FullEngDays[i];
                            const isAvailable = Hours[curEnglishDay].length && Hours[curEnglishDay][0].start !== "00:00" ? true : false;
                            // Define end hour by start time
                            const endHours = Hours[curEnglishDay].length ?
                                hours.hours.slice(hours.hours.indexOf(Hours[curEnglishDay][0].start) + 1) : hours.hours;
                            return (
                                <div key={d} className={HoursStyle.DayContent} >
                                    <p className={HoursStyle.Day} >{d}</p>

                                    <SwitchButton state={isAvailable} onChange={onClickAvailable} day={curEnglishDay} />
                                    <Options disabled={!isAvailable} options={hours.hours} title="פתיחה" styleSelect={{ fontSize: '.8rem' }} day={curEnglishDay}
                                        onChange={onChangeHour} id="start" value={Hours[curEnglishDay].length ? Hours[curEnglishDay][0].start : ""}
                                    />
                                    <Options disabled={!isAvailable} options={endHours} title="סגירה" styleSelect={{ fontSize: '.8rem' }} day={curEnglishDay}
                                        onChange={onChangeHour} id="end" value={Hours[curEnglishDay].length ? Hours[curEnglishDay][0].end : ""}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className={HoursStyle.Button}>
                    <Button onClick={() => updateHours()} color="purple">שמירה שינויים <ArrowNext /></Button>
                </div>
            </div>
        </React.Fragment>
    )
}


const mapStateToProps = (state: any) => ({
    loading: getLoading(state),
    error: getError(state),
    hours: getHours(state),
    businesDetails: getBusinessDetails(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    postBuisnessHours: (hours: BusinesHours) => dispatch(postBuisnessHours(hours))
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(OpeningHours);