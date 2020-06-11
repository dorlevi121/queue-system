import React, { useState, useEffect } from 'react';
import BusinessSettingsStyle from './business-settings.module.scss';
import SettingsHeader from '../../shared/header/settings-header.shared';
import Breadcrumbs from '../../../../../models/ui/breadcrumbs/breadcrumbs';
import { BusinessDetails } from '../../../../../models/system/business-details';
import Input from '../../../../../models/ui/input/input';
import SocialMediaLinks from '../../authentication/business-register/components/business-registration/components/social-media-links/social-media-links';
import { postingImg } from '../../../../../assets/images/export-images'
import Button from '../../../../../models/ui/button/button';
import { ArrowNext } from '../../../../../assets/icons/icons'
import { plainText, phone, email, domain } from '../../../../../models/ui/input/utility/input-types.input';
import * as language from '../../../../../assets/language/language';
import { inputChanged } from '../../../../../models/ui/input/utility/update-Input.input';
import { connect } from 'react-redux';
import { getLoading, getError, getBusinessDetails } from '../../../../../store/business/details/details.selectors';
import { postDetails } from '../../../../../store/business/details/details.actions';

interface StateProps {
    loading: boolean;
    error: string;
    details: BusinessDetails
}

interface DispatchProps {
    postDetails: typeof postDetails;
}

type Props = DispatchProps & StateProps;
const BusinessSettings: React.FC<Props> = (props) => {

    const [Form, setForm] = useState<any>({
        name: {
            ...plainText, elementConfig: {
                type: "text",
                placeholder: language.businessName[1],
            },
            value: props.details.name,
            label: language.businessName[1],
        },
        address: {
            ...plainText, elementConfig: {
                type: "text",
                placeholder: language.address[1],
            },
            value: props.details.address, label: language.address[1],
            validation: {
                required: true,
                minLen: 10,
            }
        },
        phone: {
            ...phone, value: props.details.phone
        }
        , email: {
            ...email, value: props.details.email
        },
        domain: {
            ...domain, value: props.details.domain ? props.details.domain : localStorage.getItem("domain")
            , editable: false
        },
        logo: {
            ...plainText, value: props.details.logo, label: "לוגו"
        },
        about: {
            ...plainText, label: "אודות", elementType: 'textArea',
            validation: {
                required: true,
                minLen: 20,
            },
            value: props.details.about
        },
    });
    const [Links, setLinks] = useState(props.details.links);
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


    const changeLinks = (e: any, name: string) => {
        console.log(name);

        setLinks({
            ...Links, [name]: e.target.value
        })
    };

    const updateDetails = () => {
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
            }));
        props.postDetails(ansForm);
    }

    const formElementsArray = Object.keys(Form).map((key, i) => {
        if (key !== 'links') {
            return {
                id: key,
                config: Form[key],
            };
        }
    }).filter(s => s !== undefined)

    return (
        <React.Fragment>
            <SettingsHeader title="הגדרות עסק" sunTitle="כאן תוכל לערוך את הגדרות העסק שלך" />

            <div className={BusinessSettingsStyle.BusinessSettings}>
                <Breadcrumbs title="הגדרות עסק" />
                {Error && <p className={BusinessSettingsStyle.Error}>{Error}</p>}

                <div className={BusinessSettingsStyle.Body}>
                    <div className={BusinessSettingsStyle.Details}>
                        {formElementsArray.map((formElement) => (
                            <Input
                                key={formElement?.id}
                                label={formElement?.config.label}
                                style={{ width: '300px' }}
                                elementType={formElement?.config.elementType}
                                elementConfig={formElement?.config.elementConfig}
                                value={formElement?.config.value}
                                invalid={!formElement?.config.valid}
                                shouldValidate={formElement?.config.validation}
                                touched={formElement?.config.touched}
                                changed={(e) => inputChangedHandler(e, formElement?.id)}
                            />
                        ))}

                        <SocialMediaLinks onChange={changeLinks} values={Links} iconColor="#7467ef" style={{ width: '300px' }} />

                    </div>

                    <div className={BusinessSettingsStyle.Photo}>
                        <img src={postingImg} alt="" />
                    </div>
                </div>

                <div className={BusinessSettingsStyle.Button}>
                    <Button onClick={() => updateDetails()} color="purple">שמירה שינויים <ArrowNext /></Button>
                </div>

            </div>
        </React.Fragment>
    )
}

const mapStateToProps = (state: any) => ({
    loading: getLoading(state),
    error: getError(state),
    details: getBusinessDetails(state)
});

const mapDispatchToProps = (dispatch: any) => ({
    postDetails: (details: BusinessDetails) => dispatch(postDetails(details))
});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(BusinessSettings);