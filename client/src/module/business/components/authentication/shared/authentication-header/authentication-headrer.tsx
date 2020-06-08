import React from 'react';
import AuthenticationHeadrerStyle from './authentication-headrer.module.scss';

interface OwnProps {
    title: string,
    subTitle: string,
    error: string,
}
const AuthenticationHeadrer: React.FC<OwnProps> = (props) => {
    return (
        <React.Fragment>
            <div className={AuthenticationHeadrerStyle.Header}>
                <p className={AuthenticationHeadrerStyle.Title}>{props.title}</p>
                <p className={AuthenticationHeadrerStyle.SubTitle}>
                    {props.subTitle}
                </p>
            </div>

            {props.error && <p className={AuthenticationHeadrerStyle.Error}>{props.error}</p>}
        </React.Fragment>

    )
}


export default AuthenticationHeadrer;