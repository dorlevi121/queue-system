import React, { useState } from "react";
import BusinessLoginStyle from "../busniess-login/business-login.module.scss";
import BusinessRegisterStyle from "../business-register/business-register.module.scss";
import ManagerRegistrationStyle from "../business-register/components/manager-registration/manager-registration.module.scss";
import { connect } from "react-redux";
import { getLoading, getError } from "../../../../../store/business/auth/auth.selectors";
import Button from "../../../../../models/ui/button/button";
import { resetPasswordEmployee } from "../../../../../store/business/auth/auth.actions";
import AuthenticationHeadrer from "../shared/authentication-header/authentication-headrer";
import * as language from "../../../../../assets/language/language";
import Input from "../../../../../models/ui/input/input";
import { phone } from "../../../../../models/ui/input/utility/input-types.input";
import { inputChanged } from "../../../../../models/ui/input/utility/update-Input.input";

interface StateProps {
  loading: boolean;
  error: string;
}

interface DispatchProps {
  resetPasswordEmployee: typeof resetPasswordEmployee;
}

type Props = DispatchProps & StateProps;
const ResetEmployeePassword: React.FC<Props> = (props) => {
  const [Form, setForm] = useState<any>({
    phone
  });
  const [Error, setError] = useState<string>("");

  const inputChangedHandler = (e: any, inputIdentifier: any) => {
    const ans = inputChanged(Form, e, inputIdentifier);
    if (!ans) return;

    setForm(ans.updatedForm);
    setError("")

    if (!ans.formIsValid) {
      const index = Object.keys(ans.updatedForm).
        filter(it => ans.updatedForm[it].error && ans.updatedForm[it].touched).pop();
      !index ? setError("") : setError(ans.updatedForm[index].error)
    }

  };

  const onClickNext = () => {
    if (Error || props.error) return;
    let ansForm = Object.assign(
      {},
      ...Object.keys(Form).map((k) => ({ [k]: Form[k].value }))
    );
    props.resetPasswordEmployee(ansForm.phone);
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
          title={language.restPasswordTitle[1]}
          subTitle={language.restPasswordSubTitle[1]}
          error={Error ? Error : props.error}
        />

        {props.loading && <div>Loading...</div>}

        {!props.loading && (
          <React.Fragment>
            {props.error}
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
                  changed={(event) =>
                    inputChangedHandler(event, formElement.id)
                  }
                />
              ))}
            </div>

            <div onClick={onClickNext} className={BusinessLoginStyle.Button}>
              <Button color="purple-register">שלח קוד איפוס</Button>
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  loading: getLoading(state),
  error: getError(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  resetPasswordEmployee: (phone: string) => dispatch(resetPasswordEmployee(phone)),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(ResetEmployeePassword);
