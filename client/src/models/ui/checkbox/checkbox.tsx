import React from 'react';
import CheckboxStyle from './checkbox.module.scss';

interface OwnProps {
    onClick: (...args: any[]) => void,
    defaultChecked?: any,
    id: string,
    value: any,
    label: string
}

const Checkbox: React.FC<OwnProps> = (props) => {
    return (
        <div className={CheckboxStyle.Checkbox} >
            <input onClick={props.onClick}
                type="checkbox" defaultChecked={props.defaultChecked} id={props.id} value={props.value} />
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    )
}

export default Checkbox;