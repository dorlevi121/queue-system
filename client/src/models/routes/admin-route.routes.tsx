import React from 'react'
import { Redirect, Route, RouteProps, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { getIsSignIn, getIsAdmin } from '../../store/business/auth/auth.selectors';
import { signInCheck } from '../../store/business/auth/auth.actions';

interface DispatchProps {
    signInCheck: typeof signInCheck
}

interface StateProps {
    isSignIn: boolean,
    isAdmin: boolean
}

// check if user authentocate - pass component else sign in
type Props = DispatchProps & StateProps & RouteProps;
const AdminRoute: React.SFC<Props> = ({ component: Component, ...rest }) => {
    if (!Component) {
        return null;
    }
    console.log(rest.isAdmin);
    
    return (
        <Route
            {...rest}
            render={(props: RouteComponentProps<{}>) =>
                rest.isSignIn && rest.isAdmin ? (
                    <Component {...props} />
                ) : (
                        // <Redirect
                        //     to={{
                        //         pathname: "/signin",
                        //         state: { from: props.location }
                        //     }}
                        // />
                        <div style={{textAlign: 'center'}}>אין לך הרשאות מתאימות</div>
                    )
            }
        />
    );
};
const mapStateToProps = (state: any) => ({
    isSignIn: getIsSignIn(state),
    isAdmin: getIsAdmin(state)
})

const mapDispatchToProps = (dispatch: any) => ({
    signInCheck: () => dispatch(signInCheck())
})

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(AdminRoute);
