import React, { useState } from 'react';
import ManagerRegistrationStyle from '../manager-registration/manager-registration.module.scss';
import BusinessRegistrationStyle from '../business-registration/business-registration.module.scss';
import TimesStyle from './times.module.scss';
import Button from '../../../../../../../models/ui/button/button';

interface Props {
    step: (step: 'decrement' | 'increment') => void,
    onChange: (e: any, name: string, value?: any) => void,
    values: any
}

const hebDays = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
const hours = ["06:00", "07:00", "08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
    "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "24:00"];


const Times: React.FC<Props> = (props) => {

    const [CurDay, setCurDay] = useState<number>(0)

    const onClickDay = (e: any, i: number) => {
        const workdays = [...props.values.workDays];
        if (workdays[i] === undefined)
            workdays[i] = true
        else
            workdays[i] = !props.values.workDays[i];

        props.onChange(e, 'workDays', workdays);
    }

    const changeDay = (e: any) => {
        setCurDay(e.target.value);
    }

    const changeHour = (e: any, value: 'start' | 'end') => {
        const workHours = [...props.values.workHours];
        workHours[CurDay][value] = e.target.value;
        props.onChange(e, 'workHours', workHours);
    }


    return (
        <div className={TimesStyle.Times}>
            <div className={ManagerRegistrationStyle.Header}>
                <p className={ManagerRegistrationStyle.Title}>קביעת זמני פעילות</p>
                <p className={ManagerRegistrationStyle.SubTitle}>הוסף אני הימים והשעות שהעסק שלך פועל בהם</p>
            </div>

            <div className={TimesStyle.Body}>

                <p className={TimesStyle.Title}>סמן את ימי העבודה שלך</p>
                <div className={TimesStyle.Days}>

                    {
                        hebDays.map((day: string, i: number) => {
                            return (
                                <React.Fragment key={i * 26}>
                                    <div className={TimesStyle.Day} >
                                        <input onClick={(e) => onClickDay(e, i)} className={TimesStyle.Checkbox}
                                            type="checkbox" defaultChecked={props.values.workDays[i]} id={"day" + i} value={i} />
                                        <label htmlFor={"day" + i}>{" " + day}</label>
                                    </div>
                                </React.Fragment>
                            )
                        })
                    }
                </div>

                {
                    (props.values.workDays[0] || props.values.workDays[1] || props.values.workDays[2] || props.values.workDays[3]) &&
                    <div className={TimesStyle.Hours}>
                        <p className={TimesStyle.Title}> סמן שעות עבודה </p>
                        <span>בחר יום</span>
                        <select onChange={changeDay} >
                            {
                                hebDays.map((day: string, i: number) => {
                                    if (props.values.workDays[i]) {
                                        return (
                                            <option key={i * 21} value={i}>{day}</option>
                                        );
                                    }
                                })
                            }
                        </select>
                        <br />
                        <div className={TimesStyle.Hour}>

                            <select onChange={(e) => changeHour(e, 'start')} value={props.values.workHours[CurDay]['start'] ?
                                props.values.workHours[CurDay]['start'] : ''}>
                                {
                                    hours.map((hour: string) => {
                                        return <option key={parseInt(hour) * 2} value={hour}>{hour}</option>
                                    })
                                }
                            </select>
                            <select onChange={(e) => changeHour(e, 'end')} value={props.values.workHours[CurDay]['end'] ?
                                props.values.workHours[CurDay]['end'] : ''}>
                                {
                                    hours.map((hour: string) => {
                                        if (props.values.workHours[CurDay]['start']) {
                                            if (parseInt(props.values.workHours[CurDay]['start']) > parseInt(hour)) return
                                        }
                                        return <option key={parseInt(hour) * 6} value={hour}>{hour}</option>
                                    })
                                }
                            </select>
                        </div>
                    </div>
                }
            </div>
            <div className={BusinessRegistrationStyle.Buttons} style={{marginTop: '30px'}}>
                <Button onClick={() => props.step('decrement')} color='orange'>חזור</Button>
                <Button onClick={() => props.step('increment')} color='purple-register'>המשך</Button>
            </div>
        </div>
    )
}

export default Times;
