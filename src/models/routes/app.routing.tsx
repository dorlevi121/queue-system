import React from "react";
import { Route, Switch } from "react-router-dom";
//import MainUser from "../../module/business/core/main-user.user";
import Home from "../../module/business/components/home/home.business";
import Customers from "../../module/business/components/customers/customers.business";
import CalendarUser from "../../module/business/components/calendar/calendar.business";


const Routing = () => {
  return (
    <Switch>
      <Route exact path="/business" component={Home} />
      <Route path="/business/allcustomers" component={Customers} />
      <Route path="/business/calander" component={CalendarUser} />
    </Switch>
  );
};

export default Routing;