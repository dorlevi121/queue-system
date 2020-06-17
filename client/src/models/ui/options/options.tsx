import React from 'react';
import OptionsStyle from './options.module.scss';

interface OwnProps {
    options: any[],
    title?: string,
    disabled: boolean,
    value?: string,
    onChange: (e: any, arg?: any, day?: string) => void,
    id?: string,
    style?: {},
    styleSelect?: {},
    defaultValue?: any,
    day?: string
}

const Options: React.FC<OwnProps> = (props) => {
    return (
        <div className={OptionsStyle.Options} style={props.style}>
            {props.title &&
                <p className={OptionsStyle.Title}>{props.title}</p>
            }
            <select disabled={props.disabled} className={OptionsStyle.Select} style={props.styleSelect}
                value={props.value} id={props.id}
                onChange={(e) => props.onChange(e, props.id, props.day)}
            >
                {props.defaultValue &&
                    <option value={props.title} hidden defaultValue={props.defaultValue}>{props.title}</option>
                }

                {props.options.map((op: any, i: number) => {
                    return (
                        <option key={Math.random() * i} value={op}>
                            {op}
                        </option>
                    );
                })}
            </select>
        </div>
    )
}


export default Options;