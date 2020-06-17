import React, { useEffect } from 'react';
//import MainUser from './module/business/core/main-user.user';
import Routing from './models/routes/app.routing';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import MainUser from './module/business/core/main-user.user';
import { signInCheck } from './store/business/auth/auth.actions';
import { getIsSignIn, getLoading } from './store/business/auth/auth.selectors';
import Loading from './models/ui/loading/loading';

interface StateProps {
  isSignIn: boolean;
  loading: boolean
}

interface DispatchProps {
  signInCheck: typeof signInCheck
}

type Props = DispatchProps & StateProps;
const App: React.FC<Props> = (props) => {

  useEffect(() => {
    props.signInCheck();
  }, []);

  if (props.loading) return <Loading />
  return (
    <BrowserRouter>
      {
        props.isSignIn && 
        <MainUser />
      }
      <Routing />
    </BrowserRouter>
  );
}

const mapStateToProps = (state: any) => ({
  isSignIn: getIsSignIn(state),
  loading: getLoading(state)
})

const mapDispatchToProps = (dispatch: any) => ({
  signInCheck: () => dispatch(signInCheck())
})

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(App);