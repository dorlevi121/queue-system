import React, { useState } from "react";
import BusinessLoginStyle from "./business-login.module.scss";
import BusinessRegisterStyle from "../business-register/business-register.module.scss";
import ManagerRegistrationStyle from "../business-register/components/manager-registration/manager-registration.module.scss";
import { connect } from "react-redux";
import { getLoading, getError } from "../../../../../store/business/auth/auth.selectors";
import Button from "../../../../../models/ui/button/button";
import { loginEmployee } from "../../../../../store/business/auth/auth.actions";
import { Link } from "react-router-dom";
import AuthenticationHeadrer from "../shared/authentication-header/authentication-headrer";
import * as language from "../../../../../assets/language/language";
import Input from "../../../../../models/ui/input/input";

import { password, phone } from "../../../../../models/ui/input/utility/input-types.input";
import { inputChanged } from "../../../../../models/ui/input/utility/update-Input.input";

interface FormState {
  phone: string;
  password: string;
}

interface StateProps {
  loading: boolean;
  error: string;
}

interface DispatchProps {
  loginEmployee: typeof loginEmployee;
}

type Props = DispatchProps & StateProps;
const BusinessLogin: React.FC<Props> = (props) => {
  const [Form, setForm] = useState<any>({
    phone,
    password: {
      ...password, validation: { required: true, minLen: 0 }
    },

  });

  const [error, setError] = useState<string>("");

  const onClickNext = () => {
    let ansForm = Object.assign(
      {},
      ...Object.keys(Form).map((k) => ({ [k]: Form[k].value }))
    );
    props.loginEmployee(ansForm);
  };


  const inputChangedHandler = (e: any, inputIdentifier: any) => {
    const ans = inputChanged(Form, e, inputIdentifier);
    if (!ans) return;

    setForm(ans.updatedForm);
    setError("")
    console.log(ans.formIsValid);
    
    if (!ans.formIsValid) {
      const index = Object.keys(ans.updatedForm).
        filter(it => ans.updatedForm[it].error && ans.updatedForm[it].touched).pop();
      !index ? setError("") : setError(ans.updatedForm[index].error)
    }

  };

  const formElementsArray = Object.keys(Form).map((key) => {
    return {
      id: key,
      config: Form[key],
    };
  });


  return (
    <div className={BusinessRegisterStyle.Register}>
      <div
        className={BusinessRegisterStyle.Form + " " + BusinessLoginStyle.Form}
      >
        <AuthenticationHeadrer
          title={language.loginTitle[1]}
          subTitle={language.loginSubTitle[1]}
          error={error ? error : props.error}
        />

        <React.Fragment>
          <div className={ManagerRegistrationStyle.Body}>
            {formElementsArray.map((formElement) => (
              <Input
                key={formElement.id}
                label={formElement.config.label}
                style={formElement.config.style}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => inputChangedHandler(event, formElement.id)}
              />
            ))}

          </div>
          {!props.loading ? (
            <React.Fragment>
              <div className={BusinessLoginStyle.Button}>
                <Button color="purple-register" onClick={() => onClickNext()}>התחבר</Button>
                <Link to="/business/resetpassword">איפוס סיסמא</Link>
              </div>
            </React.Fragment>
          ) : (
              <div>Loading...</div>
            )}
        </React.Fragment>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  loading: getLoading(state),
  error: getError(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  loginEmployee: (form: FormState) => dispatch(loginEmployee(form)),
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(BusinessLogin);
