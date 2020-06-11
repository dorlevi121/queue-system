import React, { useState } from 'react';
import BusinessRegisterStyle from './business-register.module.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getLoading, getError } from '../../../../../store/business/auth/auth.selectors';
import ManagerRegistration from './components/manager-registration/manager-registration';
import BusinessRegistration from './components/business-registration/business-registration';
import Timeline from './components/timeline/timeline';
import Domain from './components/domain/domain';


interface StateProps {
    loading: boolean;
    error: Error
}

interface DispatchProps {
}

type Props = DispatchProps & StateProps;

const BusinessRegister: React.FC<Props> = (props) => {
    const [Step, setStep] = useState<number>(1);

    const step = (step: 'decrement' | 'increment') => {
        if (step === "decrement") {
            setStep(Step - 1);
        }
        else {
            setStep(Step + 1);
        }
    }


    return (
        <div className={BusinessRegisterStyle.Register}>
            <div className={BusinessRegisterStyle.Timeline}>
                <Timeline step={Step} />
            </div>

            <div className={BusinessRegisterStyle.Form}>
                {Step === 1 && <Domain step={step} />}

                {Step === 2 && <ManagerRegistration step={step} />}

                {Step === 3 && <BusinessRegistration step={step} />}
                
                {Step === 4 && <div> ברוכים הבאים לקיו </div>}
                {/* 
                {Step === 4 && <Times step={step} onChange={onChange} values={values} />}

                {Step === 5 && <Services step={step} onChange={onChange} values={values} />} */}
            </div>

        </div>
    )
}

const mapStateToProps = (state: any) => ({
    loading: getLoading(state),
    error: getError(state)
});

const mapDispatchToProps = (dispatch: any) => ({

});

export default compose<any>(connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps))(BusinessRegister);
