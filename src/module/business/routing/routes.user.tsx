import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../components/home/home.user";
import Customers from "../components/customers/customers.user";
import CalanderUser from "../components/calendar/calendar.user";


const UserRouting = () => {
    return (
        <Switch>
            <Route exact path="/user" component={Home} />   
            <Route path="/user/customers" component={Customers} />
            <Route path="/user/calander" component={CalanderUser} />
        </Switch>
    );
};

export default UserRouting;