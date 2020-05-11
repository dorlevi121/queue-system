import React from 'react'
import dropdownStyle from './dropdown.module.scss';
import { NavLink } from 'react-router-dom';
interface OwnProps {
    items: { title: string, url: string }[],
    show: boolean
}

type Props = OwnProps;
const Dropdown: React.FC<Props> = (props) => {
    if (!props.show) return <div></div>;

    return (
        <div className={dropdownStyle.Items}>
            {props.items.map((item: { title: string, url: string }, i: number) => {
                return (
                    <NavLink key={i} className={dropdownStyle.Item} to={item.url} activeClassName={dropdownStyle.Current}>
                        &bull; {item.title}
                    </NavLink>
                );
            })}
        </div>
    )
}


export default Dropdown;