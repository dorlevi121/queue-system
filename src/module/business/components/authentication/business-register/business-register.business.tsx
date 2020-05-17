import React, { useState } from 'react';
import BusinessRegisterStyle from './business-register.module.scss'

const BusinessRegister = () => {
    const [Form, setForm] = useState({
        name: '',
        phone: '',
        email: '',
        password: ''
    });

    const onChange = (e: any, name: string) => {
        setForm({
            ...Form, [name]: e.target.value
        });
        console.log(e.target.value);
    }

    const onSubmit = () => {

    }

    return (
        <div className={BusinessRegisterStyle.Register}>
            <input type="text" placeholder="name" onChange={(e) => onChange(e, 'name')} value={Form.name} />
            <input type="text" placeholder="phone" onChange={(e) => onChange(e, 'phone')} value={Form.phone} />
            <input type="text" placeholder="email" onChange={(e) => onChange(e, 'email')} value={Form.email} />
            <input type="text" placeholder="password" onChange={(e) => onChange(e, 'password')} value={Form.password} />
            <button>next</button>
        </div>
    )
}

export default BusinessRegister;