import React from 'react';
import HeaderStyle from './settings-header.module.scss';

interface OwnProps {
    title: string,
    sunTitle: string
}

const SettingsHeader: React.FC<OwnProps> = (props) => {
    return (
        <div className={HeaderStyle.Header}>
            <p className={HeaderStyle.Title}>{props.title}</p>
            <span className={HeaderStyle.SubTitle}>{props.sunTitle}</span>
        </div>
    )
}

export default SettingsHeader;
