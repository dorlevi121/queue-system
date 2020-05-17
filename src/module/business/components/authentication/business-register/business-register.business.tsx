import React, { useState } from 'react';
import BusinessRegisterStyle from './business-register.module.scss'
import { compose } from 'redux';
import { connect } from 'react-redux';
import { postBusiness } from '../../../../../store/auth/auth.actions';
import { getLoading, getError } from '../../../../../store/auth/auth.selectors';

interface StateProps {
    loading: boolean;
    error: Error
}

interface DispatchProps {
    postBusiness: typeof postBusiness
}

type Props = DispatchProps & StateProps;
const BusinessRegister: React.FC <Props> = (props) => {
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
    }

    const onSubmit = () => {
        props.postBusiness(Form);

    }

    console.log(props.error);
    
    return (
        <div className={BusinessRegisterStyle.Register}>
            <input type="text" placeholder="name" onChange={(e) => onChange(e, 'name')} value={Form.name} />
            <input type="text" placeholder="phone" onChange={(e) => onChange(e, 'phone')} value={Form.phone} />
            <input type="text" placeholder="email" onChange={(e) => onChange(e, 'email')} value={Form.email} />
            <input type="text" placeholder="password" onChange={(e) => onChange(e, 'password')} value={Form.password} />
            <button onClick={onSubmit}>next</button>
        </div>
    )
}

const mapStateToProps = (state: any) => ({
    loading: getLoading(state),
    error: getError(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    postBusiness: (form: any) => dispatch(postBusiness(form))

});

export default compose<any>(
    connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)
)(BusinessRegister);