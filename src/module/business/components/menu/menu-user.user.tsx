import React, { useState, useEffect } from 'react';
import menuUserStyle from './menu-user.module.scss';
import Dropdown from './components/dropdown/dropdown.menu';
import { NavLink } from 'react-router-dom';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { BsGraphUp } from 'react-icons/bs';
import { MdSettings, MdKeyboardArrowLeft, MdPeople, MdDashboard } from 'react-icons/md';


const MenuUser = () => {
    const [ShowDropdown, setShowDropdown] = useState<boolean>(false);
    const [ShowMobileMenu, setShowMobileMenu] = useState<any>({ transform: "translateX(100%)" });
    const [IsMobile, setIsMobile] = useState<any>(false);

    // Component did mount
    useEffect(() => {
        resize();
    }, []);


    // Check if the device witdh <= 600px
    const resize = () => {
        let currentHideNav = (window.innerWidth <= 600);
        if (currentHideNav !== IsMobile) {
            setIsMobile({ hideNav: currentHideNav });
        }
    }


    // Menu button that show just in mobile device
    const menuButtonForMobile = () => {
        return (
            <div className={menuUserStyle.ButtonForMobile}>
                <input
                    type="checkbox"
                    className={menuUserStyle.Checkbox}
                    id="navi-toggle"
                    onClick={() => {
                        if (ShowMobileMenu.transform === "translateX(100%)")
                            setShowMobileMenu({ transform: "translateX(0)" })
                        else
                            setShowMobileMenu({ transform: "translateX(100%)" })

                    }}
                />
                <label htmlFor="navi-toggle" className={menuUserStyle.Navigation_button} >
                    <span className={menuUserStyle.Icon}>&nbsp;</span>
                </label>
            </div>
        )
    }


    return (
        <React.Fragment>
            {IsMobile && menuButtonForMobile()}

            <div className={menuUserStyle.Menu} style={IsMobile ? ShowMobileMenu : {}}>
                <p className={menuUserStyle.Logo}> Queue </p>
                <div className={menuUserStyle.User}>
                    <p>שלום, דור לוי.</p>
                </div>
                <hr />
                <div className={menuUserStyle.Items}>
                    <NavLink className={menuUserStyle.MenuItem} activeClassName={menuUserStyle.Current} exact to='/user'>
                        <div className={menuUserStyle.Text}>
                            <MdDashboard />
                            <span>בית</span>
                        </div>
                    </NavLink>

                    <NavLink className={menuUserStyle.MenuItem} activeClassName={menuUserStyle.Current} to='/user/calander'>
                        <div className={menuUserStyle.Text}>
                            <FaRegCalendarAlt />
                            <span> יומן תורים</span>
                        </div>
                    </NavLink>

                    <div className={menuUserStyle.MenuItem + " " + menuUserStyle.Dropdown} >
                        <div className={menuUserStyle.Text} onClick={() => { setShowDropdown(!ShowDropdown) }}>
                            <MdPeople />
                            <span >לקוחות</span>
                            <MdKeyboardArrowLeft size="1.3rem" className={menuUserStyle.ArrowIcon}
                                style={ShowDropdown ? { transform: ' rotate(-90deg)' } : {}} />
                        </div>

                        <Dropdown items={[{ title: 'כל הלקוחות', url: '/user/allcustomers' }, { title: 'לקוחות מהשבוע', url: '/user/customerweek' }]}
                            show={ShowDropdown} />
                    </div>

                    <NavLink className={menuUserStyle.MenuItem} activeClassName={menuUserStyle.Current} to='/s'>
                        <div className={menuUserStyle.Text}>
                            <BsGraphUp />
                            <span>סטטיסטיקות</span>
                        </div>
                    </NavLink>

                    <NavLink className={menuUserStyle.MenuItem} activeClassName={menuUserStyle.Current} to='/user/settings'>
                        <div className={menuUserStyle.Text}>
                            <MdSettings />
                            <span>הגדרות</span>
                        </div>
                    </NavLink>
                </div>
            </div>
        </React.Fragment>
    )
}

export default MenuUser;