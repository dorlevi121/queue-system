import React from 'react'
import UserRouting from '../routing/routes.user';
import MenuUser from '../components/menu/menu-user.user';

const MainUser = () => {
    return (
        <React.Fragment>
            <MenuUser />
            <UserRouting />
        </React.Fragment>
    )
}

export default MainUser;