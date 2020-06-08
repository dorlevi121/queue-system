import React from 'react';
import OptionsStyle from './options.module.scss';

interface OwnProps {
    options: any[],
    title?: string,
    disabled: boolean,
    value?: string,
    onChange: (e: any, arg?: any) => void,
    id: string
}

const Options: React.FC<OwnProps> = (props) => {
    return (
        <div className={OptionsStyle.Options}>
            {props.title &&
                <p className={OptionsStyle.Title}>{props.title}</p>
            }
            <select disabled={props.disabled} className={OptionsStyle.Select}
            value={props.value} id={props.id}
            onChange={(e) => props.onChange(e, props.id)}
            >
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