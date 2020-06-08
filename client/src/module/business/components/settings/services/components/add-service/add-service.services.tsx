import React, { useState } from 'react';
import AddServiceStyle from './add-service.module.scss';
import Modal from '../../../../../../../models/ui/modal/modal';
import Input from '../../../../../../../models/ui/input/input';
import Button from '../../../../../../../models/ui/button/button';
import { Service } from '../../../../../../../models/system/service';
import Autocomplete from '../../../../../../../models/ui/autocomplete/autocomplete';
import SwitchButton from '../../../../../../../models/ui/switch-button/switch-button';
import { plainText } from '../../../../../../../models/ui/input/utility/input-types.input';
import * as language from '../../../../../../../assets/language/language';
import { inputChanged } from '../../../../../../../models/ui/input/utility/update-Input.input';

interface OwnProps {
    close: () => void;
    addNewService: (service: Service) => void;
    categories: string[],
    updateService: Service | null
}

const AddService: React.FC<OwnProps> = (props) => {
    const [Error, setError] = useState<string>("");
    const [Available, setAvailable] = useState(props.updateService ? props.updateService.available : true);
    const [Form, setForm] = useState<any>({
        category: {
            ...plainText, label: language.categoryName[1], value: props.updateService ? props.updateService.category : ""
        },
        title: {
            ...plainText, label: language.servicesHeaderTitle[1],
            value: props.updateService ? props.updateService.title : ""
        },
        price: {
            ...plainText, validation: { biggerThenZero: true, minLen: 1 },
            label: language.price[1], value: props.updateService ? props.updateService.price : "",
            elementConfig: {
                type: "number"
            }
        },
        duration: {
            ...plainText, validation: { biggerThenZero: true, minLen: 1 }, label: language.duration[1],
            value: props.updateService ? props.updateService.duration : "",
            elementConfig: {
                type: "number"
            }
        }

    });

    const inputChangedHandler = (e: any, inputIdentifier: any) => {
        if (typeof e === "string") {
            setForm({
                ...Form,
                category: {
                    ...Form.category, value: e
                }
            });
            return;
        }
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


    // Invoke when user click on category name in autocomplete
    const onChangeBySpecificName = (name: string, value: any) => {
        setAvailable(value)
    };

    const addNewService = () => {
        if (Error) return;

        const copyForm = Form;
        copyForm['available'] = Available;
        let ansForm = Object.assign(
            {},
            ...Object.keys(copyForm).map((k) => {
                if (k === 'links') {
                    return ({ [k]: copyForm[k] })
                }
                return ({ [k]: copyForm[k].value })
            }))
        props.addNewService(ansForm)
    }

    const Footer = () => (
        <div className={AddServiceStyle.Button}>
            <Button onClick={() => addNewService()} color="purple">הוסף שירות</Button>
        </div>
    )

    const formElementsArray = Object.keys(Form).map((key) => {
        return {
            id: key,
            config: Form[key],
        };
    });

    console.log(Error);


    return (
        <Modal title="הוספת שירות" close={props.close} footer={<Footer />}>
            <div className={AddServiceStyle.Body}>

                {formElementsArray.map((formElement) => (
                    <React.Fragment key={formElement.id}>
                        <Input
                            label={formElement.config.label}
                            style={{ width: '300px' }}
                            class="line"
                            elementType={formElement.config.elementType}
                            elementConfig={formElement.config.elementConfig}
                            value={formElement.config.value}
                            invalid={!formElement.config.valid}
                            shouldValidate={formElement.config.validation}
                            touched={formElement.config.touched}
                            changed={(e) => inputChangedHandler(e, formElement.id)}
                        />
                        {
                            formElement.id === "category" &&
                            <Autocomplete wordsList={props.categories} word={Form.category.value} onCategoryClick={inputChangedHandler} />
                        }
                    </React.Fragment>
                ))}

                <div className={AddServiceStyle.Available}>
                    <p style={Available ? { color: '#7467ef' } : { color: 'rgba(52, 49, 76, 1)' }}>
                        {Available ? "זמין" : "לא זמין"}
                    </p>
                    <SwitchButton state={Available} onChange={onChangeBySpecificName} />
                </div>
            </div>
        </Modal>
    )
}

export default AddService;