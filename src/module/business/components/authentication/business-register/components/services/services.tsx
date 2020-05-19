import React, { useState } from 'react'
import ManagerRegistrationStyle from '../manager-registration/manager-registration.module.scss';
import BusinessRegistrationStyle from '../business-registration/business-registration.module.scss';

import Button from '../../../../../../../models/ui/button/button';

interface Props {
    step: (step: 'decrement' | 'increment') => void,
    onChange: (e: any, name: string, value?: any) => void,
    values: any
}

const Services: React.FC<Props> = (props) => {

    const [Errors, setErrors] = useState<any[]>(new Array(7));


    const onClickNext = () => {
        props.step('increment'); //// Delete for validation

        const temp = [...Errors];
        const urlValidation = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
        if (props.values.businessName.length < 2) {
            temp[0] = "שם חייב להכיל לפחות 2 אותיות";
            setErrors(temp);
        }
        else if (props.values.businessAddress.length < 2) {
            temp[1] = "כתובת חייבת להכיל לפחות 7 תווים";
            setErrors(temp);
        }
        else if (!props.values.businessPhone.match(/\d/g)) {
            temp[2] = "טלפון יכול להכיל רק מספרים";
            setErrors(temp);
        }
        else if (!props.values.businessEmail.match(/\S+@\S+\.\S+/)) {
            temp[3] = "אימייל לא תקין";
            setErrors(temp);
        }
        else if (props.values.socialMediaLinks['website'] && !props.values.socialMediaLinks['website'].match(urlValidation) ||
            props.values.socialMediaLinks['facebook'] && !props.values.socialMediaLinks['facebook'].match(urlValidation) ||
            props.values.socialMediaLinks['instagram'] && !props.values.socialMediaLinks['instagram'].match(urlValidation)) {
            temp[4] = "קישור לא תקין";
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
        <div>
            <div className={ManagerRegistrationStyle.Header}>
                <p className={ManagerRegistrationStyle.Title}>הוספת שירותים</p>
                <p className={ManagerRegistrationStyle.SubTitle}>הוסף את כל השירותים שהעסק שלך מציע.</p>
            </div>

            <div className={ManagerRegistrationStyle.Body}>

                {/* Busniess Name */}
                <div className={ManagerRegistrationStyle.Field}>
                    <label htmlFor="businessname">קטגוריה *</label>

                    <input id="businessname" name="businessname" required={true} type="text"
                        value={props.values.businessName} placeholder="" onChange={(e) => props.onChange(e, 'businessName')} />
                    <span className={ManagerRegistrationStyle.Error} style={Errors[0] ? {} : { display: 'none' }}>
                        <i>{Errors[0]}</i>
                    </span>
                </div>

                {/* Address */}
                <div className={ManagerRegistrationStyle.Field}>
                    <label htmlFor="businessAddress">שם השירות *</label>

                    <input id="businessAddress" name="businessAddress" required={true} type="text" value={props.values.businessAddress} placeholder=""
                        onChange={(e) => props.onChange(e, 'businessAddress')} />
                    <span className={ManagerRegistrationStyle.Error} style={Errors[1] ? {} : { display: 'none' }}>
                        <i>{Errors[1]}</i>
                    </span>
                </div>

                {/* Business Phone */}
                <div className={ManagerRegistrationStyle.Field}>
                    <label htmlFor="businessPhone">מחיר*</label>

                    <input id="businessPhone" name="businessPhone" required={true} type="tel" value={props.values.businessPhone} placeholder=""
                        onChange={(e) => props.onChange(e, 'businessPhone')} />
                    <span className={ManagerRegistrationStyle.Error} style={Errors[2] ? {} : { display: 'none' }}>
                        <i>{Errors[2]}</i>
                    </span>
                </div>

                {/* Email */}
                <div className={ManagerRegistrationStyle.Field}>
                    <label htmlFor="businessEmail">משך זמן*</label>

                    <input id="businessEmail" name="businessEmail" required={true} type="email" value={props.values.businessEmail} placeholder=""
                        onChange={(e) => props.onChange(e, 'businessEmail')} />
                    <span className={ManagerRegistrationStyle.Error} style={Errors[3] ? {} : { display: 'none' }}>
                        <i>{Errors[3]}</i>
                    </span>
                </div>

            </div>
            <Button color='purple-register'>הוסף שירות</Button>

            <div className={BusinessRegistrationStyle.Buttons} >
                <Button onClick={() => props.step('decrement')} color='orange'>חזור</Button>
                <Button onClick={onClickNext} color='purple-register'>המשך</Button>
            </div>

        </div>
    )
}


export default Services;