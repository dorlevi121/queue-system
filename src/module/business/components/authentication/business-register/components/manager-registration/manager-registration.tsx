import React, { useState } from 'react';
import ManagerRegistrationStyle from './manager-registration.module.scss';
import Button from '../../../../../../../models/ui/button/button';

interface Props {
    step: (step: 'decrement' | 'increment') => void,
    onChange: (e: any, name: string) => void,
    values: any
}

const ManagerRegistration: React.FC<Props> = (props) => {
    const [Errors, setErrors] = useState<any[]>(new Array(7));

    const onClickNext = () => {
        props.step('increment'); //// Delete for validation

        const temp = [...Errors];
        if (props.values.managerFirstName.length < 2) {
            temp[0] = "שם חייב להכיל לפחות 2 אותיות";
            setErrors(temp);
        }
        else if (props.values.managerLastName.length < 2) {
            temp[1] = "שם משפחה חייב להכיל לפחות 2 אותיות";
            setErrors(temp);
        }
        else if (!props.values.managerPhone.match(/\d/g)) {
            temp[2] = "טלפון יכול להכיל רק מספרים";
            setErrors(temp);
        }
        else if (!props.values.managerEmail.match(/\S+@\S+\.\S+/)) {
            temp[3] = "אימייל לא תקין";
            setErrors(temp);
        }
        else if (props.values.password.length < 6) {
            temp[4] = "סיסמא חייבת להכיל לפחות 6 תווים";
            setErrors(temp);
        }
        else if (props.values.password !== props.values.validatePassword) {
            temp[5] = "סיסמאות לא תואמות";
            setErrors(temp);
        }
        else {
            props.step('increment');
            return;
        }
        setTimeout(() => {
            setErrors(new Array(7))
        }, 3000);
    }

    return (
        <div className={ManagerRegistrationStyle.Manager} >
            <div className={ManagerRegistrationStyle.Header}>
                <p className={ManagerRegistrationStyle.Title}>הרשמת מנהל</p>
                <p className={ManagerRegistrationStyle.SubTitle}>הפרטים שתמלא בדף זה, יהיו פרטי ההתחברות שלך למערכת בעתיד.</p>
            </div>

            <div className={ManagerRegistrationStyle.Body}>

                {/* First Name */}
                <div className={ManagerRegistrationStyle.Field}>
                    <label htmlFor="firstname">שם פרטי *</label>

                    <input pattern="[A-Za-z]{3}" id="firstname" name="firstname" required={true} type="text"
                        value={props.values.managerFirstName} placeholder="" onChange={(e) => props.onChange(e, 'managerFirstName')} />
                    <span className={ManagerRegistrationStyle.Error} style={Errors[0] ? {} : { display: 'none' }}>
                        <i>{Errors[0]}</i>
                    </span>
                </div>

                {/* Last Name */}
                <div className={ManagerRegistrationStyle.Field}>
                    <label htmlFor="lastname">שם משפחה *</label>

                    <input id="lastname" name="lastname" required={true} type="text" value={props.values.managerLastName} placeholder=""
                        onChange={(e) => props.onChange(e, 'managerLastName')} />
                    <span className={ManagerRegistrationStyle.Error} style={Errors[1] ? {} : { display: 'none' }}>
                        <i>{Errors[1]}</i>
                    </span>
                </div>

                {/* Phone */}
                <div className={ManagerRegistrationStyle.Field}>
                    <label htmlFor="phone">מספר טלפון *</label>

                    <input id="phone" name="phone" required type="tel" value={props.values.managerPhone} placeholder=""
                        onChange={(e) => props.onChange(e, 'managerPhone')} />
                    <span className={ManagerRegistrationStyle.Error} style={Errors[2] ? {} : { display: 'none' }}>
                        <i>{Errors[2]}</i>
                    </span>
                </div>

                <div className={ManagerRegistrationStyle.Field}>
                    <label htmlFor="email">אימייל *</label>

                    <input id="email" name="email" required type="email" value={props.values.managerEmail} placeholder=""
                        onChange={(e) => { props.onChange(e, 'managerEmail') }} />
                    <span className={ManagerRegistrationStyle.Error} style={Errors[3] ? {} : { display: 'none' }}>
                        <i>{Errors[3]}</i>
                    </span>
                </div>

                <div className={ManagerRegistrationStyle.Field}>
                    <label htmlFor="password">סיסמא *</label>

                    <input id="password" name="password" required type="password" value={props.values.password} placeholder=""
                        onChange={(e) => props.onChange(e, 'password')} />
                    <span className={ManagerRegistrationStyle.Error} style={Errors[4] ? {} : { display: 'none' }}>
                        <i>{Errors[4]}</i>
                    </span>
                </div>

                <div className={ManagerRegistrationStyle.Field}>
                    <label htmlFor="validatePassword">וודא סיסמא *</label>

                    <input id="validatePassword" name="validatePassword" required type="password" value={props.values.validatePassword} placeholder=""
                        onChange={(e) => { props.onChange(e, 'validatePassword') }} />
                    <span className={ManagerRegistrationStyle.Error} style={Errors[5] ? {} : { display: 'none' }}>
                        <i>{Errors[5]}</i>
                    </span>
                </div>
            </div>

            <div className={ManagerRegistrationStyle.Buttons} onClick={onClickNext}>
                <Button color='purple-register'>המשך</Button>
            </div>

        </div>
    )
}


export default ManagerRegistration;