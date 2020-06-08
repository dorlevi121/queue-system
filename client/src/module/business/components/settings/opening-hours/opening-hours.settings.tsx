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

const OpeningHours = () => {
    const [IsMobile, setIsMobile] = useState<any>(false);
    const [Hours, setHours] = useState<BusinesHours>({
        "sunday": [
            { start: "09:00", end: "18:00" }
        ],
        "monday": [
        ],
        "tuesday": [
            //{ start: "10:00", end: "17:00" }
        ],
        "wednesday": [
            //{ start: "09:00", end: "20:00" }
        ],
        "thursday": [
            //{ start: "12:00", end: "24:00" }
        ],
        "friday": [
            // { start: "08:00", end: "18:00" }
        ],
        "saturday": [
            //{ start: "12:00", end: "14:00" }
        ]
    })
    const [CurDay, setCurDay] = useState<string>('sunday');
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

    const onChangeHour = (e: any, arg: any) => {
        const hour = e.target.value;
        const time: "start" | "end" = arg;
        const curHours: { start: string, end: string }[] = Hours[CurDay];
        curHours[0][time] = hour;
        setHours({
            ...Hours, [CurDay]: curHours
        });
    }

    const onClickAvailable = (name: string, value: boolean) => {
        const curHours: { start: string, end: string }[] = Hours[CurDay];
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
            ...Hours, [CurDay]: curHours
        });
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
                            <p className={HoursStyle.Day} >{d}</p>
                        )}
                    </div>

                    <hr />

                    <div className={HoursStyle.DaysContent}>
                        {hebDays.map((d: string, i: number) => {
                            const curEnglishDay = days.FullEngDays[i];
                            const isAvailable = Hours[curEnglishDay].length && Hours[curEnglishDay][0].start !== "00:00" ? true : false;
                            const endHours = Hours[curEnglishDay].length ?
                                hours.hours.slice(hours.hours.indexOf(Hours[curEnglishDay][0].start)) : hours.hours;
                            return (
                                <div className={HoursStyle.DayContent} onClick={() => setCurDay(curEnglishDay)}>
                                    <p className={HoursStyle.Day} >{d}</p>

                                    <SwitchButton state={isAvailable} onChange={onClickAvailable} />
                                    <Options disabled={!isAvailable} options={hours.hours} title="פתיחה"
                                        onChange={onChangeHour} id="start" value={Hours[curEnglishDay].length ? Hours[curEnglishDay][0].start : ""}
                                    />
                                    <Options disabled={!isAvailable} options={endHours} title="סגירה"
                                        onChange={onChangeHour} id="end" value={Hours[curEnglishDay].length ? Hours[curEnglishDay][0].end : ""}
                                    />
                                </div>
                            )
                        })}
                    </div>
                </div>

                <div className={HoursStyle.Button}>
                    <Button color="purple">שמירה שינויים <ArrowNext /></Button>
                </div>
            </div>
        </React.Fragment>
    )
}


export default OpeningHours;