import React, { useState, useEffect } from 'react';
import NewQueueStyle from './add-new-queue.module.scss';
import Modal from '../../../../../../models/ui/modal/modal';
import Button from '../../../../../../models/ui/button/button';
import { Event } from '../../../../../../models/system/event';
import moment from 'moment';
import * as language from '../../../../../../assets/language/language';
import { plainText, phone } from '../../../../../../models/ui/input/utility/input-types.input';
import { inputChanged } from '../../../../../../models/ui/input/utility/update-Input.input';
import Input from '../../../../../../models/ui/input/input';
import { Service } from '../../../../../../models/system/service';
import Options from '../../../../../../models/ui/options/options';

interface OwnProps {
    close: () => void;
    addNewEvent: (event: Event) => void;
    date: { date: string, hour: string },
    services: Service[],
    curEvent?: Event,
    deleteEvent: (event: Event | undefined) => void
}

const NewQueue: React.FC<OwnProps> = (props) => {
    const [Form, setForm] = useState<any>({
        title: {
            ...plainText, elementConfig: {
                type: "text",
                placeholder: language.eventTitle[1],
            },
            value: props.curEvent?.title ? props.curEvent.title : "",
            label: language.eventTitle[1],
            validation: {
                required: false,
                minLen: 2,
            }
        },
        description: {
            ...plainText, elementConfig: {
                type: "text",
                placeholder: language.description[1],
            },
            value: props.curEvent?.description ? props.curEvent.description : "", label: language.description[1],
            validation: {
                required: false,
                minLen: 2,
            }
        },
        clientPhone: {
            ...phone, value: props.curEvent?.clientPhone ? props.curEvent.clientPhone : "", label: language.clientPhone[1]
        },
        start: {
            ...plainText, value: props.curEvent ? props.curEvent.start : props.date.hour, editable: false, label: "שעת התחלה"
        },
        end: {
            ...plainText, value: props.curEvent?.end ? props.curEvent.end : "", label: "שעת סיום"
        }
    });
    const [Service, setService] = useState<Service | undefined>(undefined);
    const [Error, setError] = useState<string>("");
    const [CurEvent, setCurEvent] = useState(props.curEvent);

    useEffect(() => {
        if (props.curEvent) {
            setCurEvent(props.curEvent);
            const service = props.services.find(s => s._id === props.curEvent?.serviceId)
            setService(service);
        }
    }, [props])

    const inputChangedHandler = (e: any, inputIdentifier: any) => {
        const ans = inputChanged(Form, e, inputIdentifier);
        if (!ans) return;
        setForm(ans.updatedForm);
        setError("")

        if (!ans.formIsValid) {
            const index = Object.keys(ans.updatedForm).
                filter(it => ans.updatedForm[it].error && ans.updatedForm[it].touched).pop();
            !index ? setError("") : setError(ans.updatedForm[index].error)
        }
    };

    const updateDetails = () => {
        if (Error) return;
        const copyForm = Form;
        copyForm['serviceId'] = Service?._id;
        let ansForm = Object.assign(
            {},
            ...Object.keys(copyForm).map((k) => {
                if (k === 'serviceId') {
                    return ({ [k]: copyForm[k] })
                }
                return ({ [k]: copyForm[k].value })
            }))
        props.addNewEvent(ansForm);
        props.close();
    }

    const servicesName = props.services.map(s => s.title);

    const onChangeService = (e: any) => {
        const service = props.services.find(s => s.title === e.target.value);
        // Calculate duration time of event
        const endTime = moment(Form.start.value, "HH:mm").add(service?.duration, 'minute').format("HH:mm");
        setService(service);
        setForm({
            ...Form, end: { ...Form.end, value: endTime }
        })
    }

    const formElementsArray = Object.keys(Form).map((key) => {
        return {
            id: key,
            config: Form[key],
        };
    });

    const footer = (
        <div className={NewQueueStyle.Buttons}>
            {props.curEvent &&
                <Button color="orange" onClick={() => props.deleteEvent(CurEvent)}>{language.remove[1]}</Button>
            }
            <Button disabled={Error.length > 0 || !Service || !Form.clientPhone.value} color="purple" onClick={() => updateDetails()}>{props.curEvent ? language.update[1] : language.save[1]}</Button>

        </div>

    )
    return (
        <div className={NewQueueStyle.NewQueue}>
            <Modal title="קביעת תור" close={props.close} footer={footer} >
                <Options options={servicesName} onChange={onChangeService} disabled={false} value={Service ? Service.title : ""}
                    title="בחר שירות" style={{ width: '300px', margin: 'auto' }} defaultValue="בחר שירות" />

                {formElementsArray.map((formElement) => (
                    <Input
                        key={formElement.id}
                        label={formElement.config.label}
                        style={{ width: '300px' }}
                        class="line"
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(e) => inputChangedHandler(e, formElement.id)}
                    />
                ))}
            </Modal>
        </div>
    )
}


export default NewQueue;