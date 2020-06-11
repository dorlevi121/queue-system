import React, { memo, useState } from "react";
import BusinessRegistrationStyle from "./business-registration.module.scss";
import ManagerRegistrationStyle from "../manager-registration/manager-registration.module.scss";
import * as language from "../../../../../../../assets/language/language";
import Button from "../../../../../../../models/ui/button/button";
import { getError, getLoading } from "../../../../../../../store/business/details/details.selectors";
import { connect } from "react-redux";
import AuthenticationHeadrer from "../../../shared/authentication-header/authentication-headrer";
import Input from "../../../../../../../models/ui/input/input";
import { BusinessDetails } from "../../../../../../../models/system/business-details";
import SocialMediaLinks from "./components/social-media-links/social-media-links";
import { postDetails } from "../../../../../../../store/business/details/details.actions";
import { phone, plainText, email } from "../../../../../../../models/ui/input/utility/input-types.input";
import { inputChanged } from "../../../../../../../models/ui/input/utility/update-Input.input";


interface OwnProps {
  step: (step: "decrement" | "increment") => void;
}

interface StateProps {
  loading: boolean;
  error: string;
}

interface DispatchProps {
  postDetails: typeof postDetails;
}

// Become true when user click on next in the first time
let nextPage = false;

type Props = DispatchProps & StateProps & OwnProps;
const BusinessRegistration: React.FC<Props> = (props) => {
  const [Error, setError] = useState<string>("");
  const [Form, setForm] = useState<any>({
    name: {
      ...plainText, elementConfig: {
        type: "text",
        placeholder: language.businessName[1],
      },
      value: "",
      label: language.businessName[1],
    },
    address: {
      ...plainText, elementConfig: {
        type: "text",
        placeholder: language.address[1],
      },
      value: "", label: language.address[1],
      validation: {
        required: false,
        minLen: 10,
      }
    },
    phone
    , email,
    about: {
      ...plainText, label: "אודות", elementType: 'textArea',
      validation: {
        required: false,
        minLen: 20,
      }
    }
  });
  const [Links, setLinks] = useState({
    website: "",
    facebook: "",
    instagram: ""
  })

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

  const changeLinks = (e: any, name: string) => {
    setLinks({
      ...Links, [name]: e.target.value
    });
  };

  // Checks the information in front of the server
  const onClickNext = () => {
    if (Error) return;

    const copyForm = Form;
    copyForm['links'] = Links;
    let ansForm = Object.assign(
      {},

      ...Object.keys(copyForm).map((k) => {
        if (k === 'links') {
          return ({ [k]: copyForm[k] })
        }
        return ({ [k]: copyForm[k].value })
      }
      ));
    nextPage = true;
    props.postDetails(ansForm);
    // props.setNewPasswordEmployee(Form, token);

  };

  if (!props.loading && nextPage && Error.length <= 1 && !props.error) {
    props.step("increment")
  }

  const formElementsArray = Object.keys(Form).map((key) => {
    return {
      id: key,
      config: Form[key],
    };
  });


  return (
    <div className={BusinessRegistrationStyle.Business}>
      <AuthenticationHeadrer
        title={language.businessHeaderTitle[1]}
        subTitle={language.businessHeaderSubTitle[1]}
        error={Error ? Error : props.error}
      />

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
        {/* Links */}
        <SocialMediaLinks onChange={changeLinks} values={Links} style={{ marginTop: '-18px', width: '230px' }} />
      </div>

      {!props.loading ? (
        <div className={BusinessRegistrationStyle.Buttons}>
          <Button onClick={() => props.step("decrement")} color="orange">
            {language.back[1]}
          </Button>
          <Button onClick={onClickNext} color="purple-register">
            {language.next[1]}
          </Button>
        </div>
      ) : (
          <div>Loading...</div>
        )}
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  loading: getLoading(state),
  error: getError(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  postDetails: (form: BusinessDetails) => dispatch(postDetails(form)),
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(BusinessRegistration);