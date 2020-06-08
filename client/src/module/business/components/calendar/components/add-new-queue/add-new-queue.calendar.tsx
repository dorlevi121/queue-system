import React, { useState } from 'react';
import NewQueueStyle from './add-new-queue.module.scss';
import Modal from '../../../../../../models/ui/modal/modal';
import Button from '../../../../../../models/ui/button/button';
import { Event } from '../../../../../../models/system/event';
import moment from 'moment';
import * as language from '../../../../../../assets/language/language';
import { plainText, phone } from '../../../../../../models/ui/input/utility/input-types.input';
import { inputChanged } from '../../../../../../models/ui/input/utility/update-Input.input';
import Input from '../../../../../../models/ui/input/input';

interface OwnProps {
    close: () => void;
    addNewQueue: (event: Event) => void;
    event: { date: string, hour: string }
}

const NewQueue: React.FC<OwnProps> = (props) => {
    const [Form, setForm] = useState<any>({
        title: {
            ...plainText, elementConfig: {
                type: "text",
                placeholder: language.eventTitle[1],
            },
            value: "",
            label: language.eventTitle[1],
        },
        description: {
            ...plainText, elementConfig: {
                type: "text",
                placeholder: language.description[1],
            },
            value: "", label: language.description[1],
            validation: {
                required: true,
                minLen: 10,
            }
        },
        clientPhone: {
            ...phone, value: "", label: language.clientPhone[1]
        }
    });
    const [Error, setError] = useState<string>("");

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

    const handleChange = (e: any, name: string) => {
        setForm({
            ...Form, [name]: e.target.value
        });
    }

    const updateDetails = () => {
        if (Error) return;

        const copyForm = Form;
        // copyForm['links'] = BusinessDetails.links;
        let ansForm = Object.assign(
            {},
            ...Object.keys(copyForm).map((k) => {
                if (k === 'links') {
                    return ({ [k]: copyForm[k] })
                }
                return ({ [k]: copyForm[k].value })
            }))

        props.addNewQueue(ansForm);
        props.close();
    }

    const formElementsArray = Object.keys(Form).map((key) => {
        return {
            id: key,
            config: Form[key],
        };
    });

    const footer = (
        <div style={{ display: 'flex' }}>
            <Button color="purple" onClick={() => updateDetails()}>שמור</Button>
            <Button color="purple" onClick={() => updateDetails()}>בטל</Button>
        </div>

    )
    return (
        <div className={NewQueueStyle.NewQueue}>
            <Modal title="קביעת תור" close={props.close} footer={footer} >
                {props.event.date + " " + props.event.hour}

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