import React, { lazy, Suspense } from "react";
import { Route, Switch, RouteComponentProps, withRouter, Redirect } from "react-router-dom";
import Home from "../../module/business/components/home/home.business";
import PrivateRoute from "./private-route.routes";
import AdminRoute from "./admin-route.routes";
import HomeClient from "../../module/client/components/home.client";
import Loading from "../ui/loading/loading";
import { setDomain } from "../../store/business/auth/auth.actions";
import { getIsSignIn, getLoading, getError } from "../../store/business/auth/auth.selectors";
import { connect } from "react-redux";
const CalendarUser = lazy(() => import('../../module/business/components/calendar/calendar.business'));
const SerivcesSettings = lazy(() => import('../../module/business/components/settings/services/serivces.settings'));
const OpeningHours = lazy(() => import('../../module/business/components/settings/opening-hours/opening-hours.settings'));
const BusinessSettings = lazy(() => import('../../module/business/components/settings/business-settings/business-settings.settings'));
const Customers = lazy(() => import('../../module/business/components/customers/customers.business'));
const BusinessRegister = lazy(() => import('../../module/business/components/authentication/business-register/business-register.business'));
const BusinessLogin = lazy(() => import('../../module/business/components/authentication/busniess-login/business-login.business'));
const EmployeeReset = lazy(() => import('../../module/business/components/authentication/reset-password/reset-employee-password.business'));
const SetNewEmployeePassword = lazy(() => import('../../module/business/components/authentication/reset-password/setNew-employee-password.business'));
const NotFoundPage = lazy(() => import('../../module/shared/not-found-page/not-found-page.shared'));

interface StateProps {
  isSignIn: boolean;
  loading: boolean;
  error: string;
}

interface DispatchProps {
  checkDomain: typeof setDomain
}

type Props = DispatchProps & StateProps & RouteComponentProps;
const Routing: React.FC<Props> = (props) => {

  const renderClientPage = (routerProps: any) => {
    const domain = routerProps.match.params.domain;
    props.checkDomain(domain);

    console.log(domain, routerProps);

    return <HomeClient />;
  };
  return (
    <Suspense fallback={<Loading />}>

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
        <Route exact path="/:domain" render={(a: any) => renderClientPage(a)} />

        {/* Not Found */}
        {/* <Route component={NotFoundPage} /> */}
      </Switch>
    </Suspense>

  );
};

const mapStateToProps = (state: any) => ({
  isSignIn: getIsSignIn(state),
  loading: getLoading(state),
  error: getError(state)
})

const mapDispatchToProps = (dispatch: any) => ({
  checkDomain: (domain: string) => dispatch(setDomain(domain))
})

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(withRouter(Routing));