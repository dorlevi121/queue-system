import React, { useState } from 'react';
import NewQueueStyle from './add-new-queue.module.scss';
import Modal from '../../../../../../models/ui/modal/modal';
import Button from '../../../../../../models/ui/button/button';
import { Event } from '../../../../../../models/system/event';
import moment from 'moment';

interface OwnProps {
    close: () => void;
    addNewQueue: (event: Event) => void;
    event: { date: string, hour: string }
}

const NewQueue: React.FC<OwnProps> = (props) => {
    const [Form, setForm] = useState({
        title: "",
        phone: ""
    });

    const handleChange = (e: any, name: string) => {
        setForm({
            ...Form, [name]: e.target.value
        });
    }

    const onSubmit = (form: any) => {
        console.log(form);
        const newEvent: Event = {
            employeeId: 2,
            start: moment("2020-05-15 09:45").format("YYYY-MM-DD HH:mm"),
            end: moment("2020-05-15 10:00").format("YYYY-MM-DD HH:mm"),
            id: 5,
            title: form.title,
            userId: form.phone

        }
        props.addNewQueue(newEvent);
        props.close(); 

    }

    const schild = (
        <form onSubmit={onSubmit}>
            {/* Title */}
            <div className={NewQueueStyle.FormGroup}>
                <input
                    type="text"
                    onChange={(e) => handleChange(e, 'title')}
                    autoComplete="off"
                    value={Form.title}
                    required
                    placeholder="כותרת"
                />
            </div>
            {/* Client Phone */}
            <div className={NewQueueStyle.FormGroup}>
                <input
                    type="tel"
                    onChange={(e) => handleChange(e, 'phone')}
                    autoComplete="off"
                    value={Form.phone}
                    required
                    placeholder="טלפון הלקוח"
                />
            </div>

        </form>
    )

    const footer = (
        <div style={{ display: 'flex' }}>
            <Button color="purple" onClick={() => onSubmit(Form)}>שמור</Button>
            <Button color="purple" onClick={() => onSubmit(Form)}>בטל</Button>
        </div>

    )
    return (
        <div className={NewQueueStyle.NewQueue}>
            <Modal title="קביעת תור" close={props.close} footer={footer} >
                {props.event.date + " " + props.event.hour}

                {schild}
            </Modal>
        </div>
    )
}


export default NewQueue;