import React from 'react';
import ButtonStyle from './button.module.scss';

interface OwnProps {
    onClick: () => void;
    color: 'purple' | 'orange';
}

const Button: React.FC<OwnProps> = (props) => {
    const color = props.color === 'purple' ? '#7467ef' : '#ff9e43'
    return (
        <button style={{background: color }} className={ButtonStyle.Button} onClick={props.onClick}>{props.children}</button>
    )
}


export default Button;