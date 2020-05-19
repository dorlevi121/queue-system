import React from 'react';
import TimelineStyle from './timeline.module.scss';

interface Props {
    step: number
}


const Timeline: React.FC <Props> = (props) => {
    return (
        <div className={TimelineStyle.Timeline}>
            <ul className={TimelineStyle.Progressbar}>
                <li className={TimelineStyle.Active}>הרשמת מנהל</li>
                <li className={props.step > 1 ? TimelineStyle.Active : ''}>הרשמת עסק</li>
                <li className={props.step > 2 ? TimelineStyle.Active : ''}>הוספת שירותים</li>
                <li className={props.step > 3 ? TimelineStyle.Active : ''}>זמנים</li>
                <li className={props.step > 4 ? TimelineStyle.Active : ''}>סיום</li>
            </ul>
        </div>
    )
}


export default Timeline;