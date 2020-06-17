import React from 'react'
import { Redirect, Route, RouteProps, RouteComponentProps } from 'react-router-dom';
import { signInCheck } from '../../store/business/auth/auth.actions';
import { connect } from 'react-redux';
import { getIsSignIn } from '../../store/business/auth/auth.selectors';

interface DispatchProps {
    signInCheck: typeof signInCheck
}

interface StateProps {
    isSignIn: boolean,
}

// check if user authentocate - pass component else sign in
type Props = DispatchProps & StateProps & RouteProps;
const PrivateRoute: React.SFC<Props> = ({ component: Component, ...rest }) => {
    if (!Component) {
        return null;
    }
    return (
        <Route
            {...rest}
            render={(props: RouteComponentProps<{}>) =>
                rest.isSignIn ? (
                    <Component {...props} />
                ) : (
                        <Redirect
                            to={{
                                pathname: "/business/login",
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    );
};
const mapStateToProps = (state: any) => ({
    isSignIn: getIsSignIn(state)
})

const mapDispatchToProps = (dispatch: any) => ({
    signInCheck: () => dispatch(signInCheck())
})

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(PrivateRoute);
