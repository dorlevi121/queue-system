import React, { memo, useState } from 'react';
import DomainStyle from "./domain.module.scss";
import * as language from '../../../../../../../assets/language/language'
import Button from '../../../../../../../models/ui/button/button';
import { connect } from 'react-redux';
import { getLoading, getError } from '../../../../../../../store/business/auth/auth.selectors';
import { setDomain } from '../../../../../../../store/business/auth/auth.actions';
import AuthenticationHeadrer from '../../../shared/authentication-header/authentication-headrer';
import Input from '../../../../../../../models/ui/input/input';
import { domain } from '../../../../../../../models/ui/input/utility/input-types.input';
import { inputChanged } from '../../../../../../../models/ui/input/utility/update-Input.input';

interface OwnProps {
    step: (step: 'decrement' | 'increment') => void,
}

interface StateProps {
    loading: boolean;
    error: string
}

interface DispatchProps {
    setDomain: typeof setDomain
}

// Become true when user click on next in the first time
let nextPage = false;

type Props = DispatchProps & StateProps & OwnProps;
const Domain: React.FC<Props> = (props) => {
    const [Form, setForm] = useState<any>({
        domain: {
            ...domain,
            validation: {
                required: true,
                minLen: 2,
                isEnglish: true
            } 
        }
    }); 
    const [error, setError] = useState<string>("");

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

    const formElementsArray = Object.keys(Form).map((key) => {
        return {
            id: key,
            config: Form[key],
        };
    });

    // Checks the information in the server
    const onClickNext = () => {
        //props.step('increment');
        if (!error && !props.error) {
            setError("");
            props.setDomain(Form.domain.value);
            nextPage = true;
        }

    };

    if (!props.loading && !props.error && nextPage && Error.length <= 1) props.step('increment');

    return (
        <React.Fragment>
            <AuthenticationHeadrer title={language.domainHeaderTitle[1]} subTitle={language.domainHeaderSubTitle[1]}
                error={error ? error : props.error} />

            <div className={DomainStyle.Body}>
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
                        class="border"
                    />
                ))}
            </div>

            {
                !props.loading ?
                    <div className={DomainStyle.Button} onClick={onClickNext}>
                        <Button color="purple-register" >{language.next[1]}</Button>
                    </div>
                    :
                    <div style={{ textAlign: 'center' }}>Loading...</div>
            }
        </React.Fragment>
    )
}

const mapStateToProps = (state: any) => ({
    loading: getLoading(state),
    error: getError(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    setDomain: (domain: string) => dispatch(setDomain(domain))
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(Domain);
