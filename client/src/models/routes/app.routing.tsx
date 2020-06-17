import React, { lazy, Suspense } from "react";
import { Route, Switch, RouteComponentProps, withRouter } from "react-router-dom";
import Home from "../../module/business/components/home/home.business";
import PrivateRoute from "./private-route.routes";
import AdminRoute from "./admin-route.routes";
import HomeClient from "../../module/client/components/home.client";
const CalendarUser = lazy(() => import('../../module/business/components/calendar/calendar.business'));
const SerivcesSettings = lazy(() => import('../../module/business/components/settings/services/serivces.settings'));
const OpeningHours = lazy(() => import('../../module/business/components/settings/opening-hours/opening-hours.settings'));
const BusinessSettings = lazy(() => import('../../module/business/components/settings/business-settings/business-settings.settings'));
const Customers = lazy(() => import('../../module/business/components/customers/customers.business'));
const BusinessRegister = lazy(() => import('../../module/business/components/authentication/business-register/business-register.business'));
const BusinessLogin = lazy(() => import('../../module/business/components/authentication/busniess-login/business-login.business'));
const EmployeeReset = lazy(() => import('../../module/business/components/authentication/reset-password/reset-employee-password.business'));
const SetNewEmployeePassword = lazy(() => import('../../module/business/components/authentication/reset-password/setNew-employee-password.business'));

const Routing: React.FC<RouteComponentProps<{}>> = (props) => {

  const renderPage = (routerProps: any) => {
    const domain = routerProps.match.params.domain;
    console.log(domain, routerProps);

    return <HomeClient />;
  };
  return (
    <Suspense fallback={<div>Loading...</div>}>

      <Switch>
        {/* Authentnication */}
        <Route path="/business/register" component={BusinessRegister} />
        <Route path="/business/login" component={BusinessLogin} />

        {/* Reset Password */}
        <Route path="/business/resetpassword/:token" component={SetNewEmployeePassword} />
        <Route path="/business/resetpassword" component={EmployeeReset} />

        {/* Home */}
        <PrivateRoute exact path="/business" component={Home} />

        {/* Settings */}
        <AdminRoute path="/business/settings/services" component={SerivcesSettings} />
        <AdminRoute path="/business/settings/hours" component={OpeningHours} />
        <AdminRoute path="/business/settings/employees" component={OpeningHours} />
        <AdminRoute path="/business/settings/businesssettings" component={BusinessSettings} />

        {/* Calander */}
        <AdminRoute path="/business/calander" component={CalendarUser} />
        <Route path="/business/allcustomers" component={Customers} />


        {/* Client Routes */}
        <Route path="/:domain" render={(a: any) => renderPage(a)} />

      </Switch>
    </Suspense>

  );
};

export default withRouter(Routing);
