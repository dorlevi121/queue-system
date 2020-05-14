import React from "react";
import { Route, Switch } from "react-router-dom";
import home from "../components/home/home.business";
import Customers from "../components/customers/customers.business";
import CalanderUser from "../components/calendar/calendar.business";

const UserRouting = () => {
  return (
    <Switch>
      <Route exact path="/business" component={home} />
      <Route path="/business/customers" component={Customers} />
      <Route path="/business/calander" component={CalanderUser} />
    </Switch>
  );
};

export default UserRouting;
