import React, { useState } from 'react';
import PhoneValidationStyle from './phone-validation.module.scss';
import Input from '../../../../../../../../../models/ui/input/input';
import Button from '../../../../../../../../../models/ui/button/button';
import * as language from '../../../../../../../../../assets/language/language';
import { email, plainText } from '../../../../../../../../../models/ui/input/utility/input-types.input';

interface OwnProps {
    email: any,
    verificationPhone: (verificationCode: string) => void,
    onChangePhone: (e: any, inputIdentifier: any) => void,
    sendMassage?: () => void
}

const PhoneValidation: React.FC<OwnProps> = (props) => {
    const [ChangePhone, setChangePhone] = useState<boolean>(false);
    const [VerificationCode, setVerificationCode] = useState<string>("");
    const [Form, setForm] = useState<any>({
        validationCode: {
            ...plainText, label: "קוד אימות", style: { width: '50%', margin: 'auto' }
        }
    })
    const formElementsArray = Object.keys(Form).map((key) => {
        return {
            id: key,
            config: Form[key],
        };
    });

    return (
        <div className={PhoneValidationStyle.PhoneValidation}>
            {
                ChangePhone ?
                    <p>נא הזן מספר טלפון חדש לאימות </p>
                    :
                    <p>שלחנו אלייך עכשיו SMS עם קוד אימות למספר {props.email.value} </p>
            }
            {
                ChangePhone ?
                    <Input
                        key={props.email.id}
                        label={props.email.label}
                        style={{ width: '50%', margin: 'auto' }}
                        elementType={props.email.elementType}
                        elementConfig={props.email.elementConfig}
                        value={props.email.value}
                        invalid={props.email.valid}
                        shouldValidate={props.email.validation}
                        touched={props.email.touched}
                        changed={(e) => props.onChangePhone(e, 'email')}
                    />
                    :
                    <Input
                        key={formElementsArray[0].id}
                        label={formElementsArray[0].config.label}
                        style={formElementsArray[0].config.style}
                        elementType={formElementsArray[0].config.elementType}
                        elementConfig={formElementsArray[0].config.elementConfig}
                        value={VerificationCode}
                        invalid={!formElementsArray[0].config.valid}
                        shouldValidate={formElementsArray[0].config.validation}
                        touched={formElementsArray[0].config.touched}
                        changed={(e) => setVerificationCode(e.target.value)}
                    />
            }

            <div className={PhoneValidationStyle.Buttons}>
                {
                    ChangePhone ?
                        <React.Fragment>
                            <Button color="orange" onClick={() => setChangePhone(false)}>עדכן מספר טלפון</Button>
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Button color="orange" onClick={() => setChangePhone(true)}>החלף מספר</Button>
                            <Button color="purple-register" onClick={() => props.verificationPhone(VerificationCode)}>{language.next[1]}</Button>
                        </React.Fragment>
                }
            </div>
        </div>
    )
}

export default PhoneValidation;