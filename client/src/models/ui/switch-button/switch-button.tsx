import React, { useState, useEffect } from 'react';
import SwitchButtonStyle from './switch-button.module.scss';

interface OwnProps {
    state: boolean,
    onChange: (name: string, value: any, day?: string) => void,
    day?: string
}

const SwitchButton: React.FC<OwnProps> = (props) => {
    const [State, setState] = useState(props.state)

    const Switch = () => {
        setState(!State);
        props.onChange('available', !State, props.day)
    }

    return (
        <label className={SwitchButtonStyle.Switch}>
            <input type="checkbox" onClick={() => Switch()} defaultChecked={State} />
            <span className={SwitchButtonStyle.Slider}></span>
        </label>
    )
}


export default SwitchButton;