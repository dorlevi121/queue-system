import React, { memo, useState } from "react";
import { connect } from "react-redux";
import * as language from "../../../../../../../assets/language/language";
import ManagerRegistrationStyle from "./manager-registration.module.scss";
import BusinessRegistrationStyle from "../business-registration/business-registration.module.scss";
import Button from "../../../../../../../models/ui/button/button";
import { registerEmployee } from "../../../../../../../store/business/auth/auth.actions";
import { getLoading, getError } from "../../../../../../../store/business/auth/auth.selectors";
import AuthenticationHeadrer from "../../../shared/authentication-header/authentication-headrer";
import Input from "../../../../../../../models/ui/input/input";
import PhoneValidation from './components/phone-validation/phone-validation'
import { plainText, phone, email, password } from "../../../../../../../models/ui/input/utility/input-types.input";
import { inputChanged } from "../../../../../../../models/ui/input/utility/update-Input.input";

interface OwnProps {
  step: (step: "decrement" | "increment") => void;
}

interface StateProps {
  loading: boolean;
  error: string;
}

interface DispatchProps {
  registerEmployee: typeof registerEmployee;
}
// Become true when user click on next in the first time
let nextPage = false;

type Props = DispatchProps & StateProps & OwnProps;
const ManagerRegistration: React.FC<Props> = (props) => {

  const [Error, setError] = useState<string>("");
  const [Form, setForm] = useState<any>({
    firstName: {
      ...plainText, elementConfig: {
        type: "text",
        placeholder: language.firstName[1],
      },
      label: language.firstName[1],
    },
    lastName: {
      ...plainText, elementConfig: {
        type: "text",
        placeholder: language.lastName[1],
      },
      label: language.lastName[1],
    },
    phone: {
      ...phone, 
    }
    , email: {
      ...email,
    },
    password: {
      ...password
    },
    validPassword: {
      ...password, label: language.confirmPassword[1]
    }
  });

  const [CheckPhoneValidation, setCheckPhoneValidation] = useState<boolean>(false);

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
    else if (ans.updatedForm.password.value !== ans.updatedForm.validPassword.value) {
      setError(language.confirmPasswordError[1]);
    }
  };

  const verificationPhone = (verificationCode: string) => {
    console.log('verificationPhone', verificationCode);
    if (verificationCode === "123") {
      props.step('increment');
    }
  }


  // Checks the information in front of the server
  const onClickNext = () => {
    if(Error) return;
    let ansForm = Object.assign({},
      ...Object.keys(Form).map((k) => ({ [k]: Form[k].value }))
    );
    // props.step('increment');
    props.registerEmployee(ansForm);
    nextPage = true;
  };

  if (!props.loading && nextPage && Error.length <= 1 && !props.error && !CheckPhoneValidation) {
    setCheckPhoneValidation(true);
  }


  const formElementsArray = Object.keys(Form).map((key) => {
    return {
      id: key,
      config: Form[key],
    };
  });


  return (
    <div className={ManagerRegistrationStyle.Manager}>
      <AuthenticationHeadrer
        title={language.managerHeaderTitle[1]}
        subTitle={language.managerHeaderSubTitle[1]}
        error={Error ? Error : props.error}
      />
      {
        CheckPhoneValidation ?
          <PhoneValidation email={Form['email']} onChangePhone={inputChangedHandler} verificationPhone={verificationPhone} />
          :
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
                  changed={(e) => inputChangedHandler(e, formElement.id)}
                />
              ))}
            </div>

            {!props.loading ?
              <div className={BusinessRegistrationStyle.Buttons}>
                <Button onClick={() => props.step("decrement")} color="orange">
                  {language.back[1]}
                </Button>
                <Button onClick={onClickNext} color="purple-register">
                  {language.next[1]}
                </Button>
              </div>
              :
              <div>Loading...</div>
            }
          </React.Fragment>
      }
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  loading: getLoading(state),
  error: getError(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  registerEmployee: (form: any) => dispatch(registerEmployee(form)),
});


export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(ManagerRegistration)