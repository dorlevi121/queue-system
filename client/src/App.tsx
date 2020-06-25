import React, { useEffect, useState } from 'react';
//import MainUser from './module/business/core/main-user.user';
import Routing from './models/routes/app.routing';
import { RouteComponentProps, Link, withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import MainUser from './module/business/core/main-user.user';
import { signInCheck, setDomain } from './store/business/auth/auth.actions';
import { getIsSignIn, getLoading, getError } from './store/business/auth/auth.selectors';
import Loading from './models/ui/loading/loading';

interface StateProps {
  isSignIn: boolean;
  loading: boolean;
  error: string;
}

interface DispatchProps {
  signInCheck: typeof signInCheck,
  checkDomain: typeof setDomain
}


type Props = DispatchProps & StateProps & RouteComponentProps;
const App: React.FC<Props> = (props) => {
  const [Checl, setChecl] = useState(false)
  // useEffect(() => {
  //   if (props.location.pathname === '/business')
  //     props.signInCheck();
  // }, []);
  const path = props.location.pathname;

  if (props.error === "כתובת עסק תפוסה") {
    console.log('hi');
  }

  else if (path.includes('/business') && !Checl && !path.includes('/register')) {
    props.signInCheck();
    setChecl(true)
  }


  if (props.loading) return <Loading />

  return (
    <React.Fragment>
      {path.includes('/business') && props.isSignIn && <MainUser />}
      {path === '/' &&
        <div>
          <Link to="/business" >עסק</Link> <br />
          <Link to="/:domain">לקוח</Link>
        </div>
      }
      <Routing />
    </React.Fragment>
  );
}

const mapStateToProps = (state: any) => ({
  isSignIn: getIsSignIn(state),
  loading: getLoading(state),
  error: getError(state)
})

const mapDispatchToProps = (dispatch: any) => ({
  signInCheck: () => dispatch(signInCheck()),
  checkDomain: (domain: string) => dispatch(setDomain(domain))
})

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(withRouter(App));