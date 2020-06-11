import React, { useState, memo } from "react";
import ServicesStyle from "./services.module.scss";
import ManagerRegistrationStyle from "../manager-registration/manager-registration.module.scss";
import BusinessRegistrationStyle from "../business-registration/business-registration.module.scss";
import * as language from '../../../../../../../assets/language/language'
import Button from "../../../../../../../models/ui/button/button";
import { Service } from "../../../../../../../models/system/service";
import { connect } from "react-redux";
import {
  getLoading,
  getError,
  getServices,
} from "../../../../../../../store/business/service/service.selectors";
import AuthenticationHeadrer from "../../../shared/authentication-header/authentication-headrer";
import Input from "../../../../../../../models/ui/input/input";
import { postService, getAllServices } from "../../../../../../../store/business/service/service.actions";

interface AutoCompleteState {
  showOptions: boolean;
  filteredOptions: string[];
  activeOption: number;
}

interface OwnProps {
  step: (step: "decrement" | "increment") => void;
  onChange: (e: any, name: string, value?: any) => void;
  values: any;
}

interface DispatchProps {
  postService: typeof postService;
  getAllServices: typeof getAllServices;
}

interface StateProps {
  error: string;
  loading: boolean;
  services: Service[];
}

const initService: Service = {
  category: "",
  title: "",
  price: 0,
  duration: 0,
  available: true,
};

// Become true when user click on next in the first time
let nextPage = false;
type Props = DispatchProps & StateProps & OwnProps;
const Services: React.FC<Props> = (props) => {

  const [Service, setService] = useState<Service>(initService); // Hold the cuurent service
  const [AutoComplete, setAutoComplete] = useState<AutoCompleteState>({
    showOptions: false,
    filteredOptions: [],
    activeOption: 0,
  });
  const [EditMode, setEditMode] = useState<boolean>(false);

  // Initial filteredOptions array in options
  const onCategoryChange = (e: any) => {
    const titles: string[] = props.services.map(s => s.category);
    const userInput = e.currentTarget.value;

    const filteredOptions = titles.filter(
      (optionName) =>
        optionName.toLowerCase().indexOf(userInput.toLowerCase()) > -1
    );
    setAutoComplete({
      ...AutoComplete,
      activeOption: 0,
      filteredOptions: filteredOptions.slice(0, 5),
      showOptions: true,
    });
    setService({ ...Service, category: userInput });
  };

  // Invoke when user click on category name in autocomplete
  const onCategoryClick = (title: string) => {
    setService({ ...Service, category: title });
    setAutoComplete({
      ...AutoComplete,
      showOptions: false,
    });
  };


  const AllServices = () => {
    return props.getAllServices.length > 0
      ? props.services.map((service: Service, i: number) => (
        <p onClick={() => editService(service)} key={service._id}>
          {service.title} {service.price} {service.duration}{" "}
        </p>
      ))
      : null;
  };

  // Invoke when user click on existing service
  const editService = (service: Service) => {
    setService(service);
    setEditMode(true);
  };

  // Add new service
  const addNewService = (e: any, service: Service) => {
    if (EditMode) {
      // props.updateService(Service);
      setEditMode(false);
    }
    else {
      props.postService(service);
      if (!props.error) {
        setService(initService);
      }
    }
    nextPage = true;
  };

  // AutoComplete Item
  let optionList;
  if (AutoComplete.showOptions && Service.category) {
    if (AutoComplete.filteredOptions.length) {
      optionList = (
        <div className={ServicesStyle.List}>
          {AutoComplete.filteredOptions.map((optionName, index) => {
            return (
              <p onClick={() => onCategoryClick(optionName)} key={optionName}>
                {optionName + " "}
              </p>
            );
          })}
        </div>
      );
    }
  }


  return (
    <div className={ServicesStyle.Services}>
      <AuthenticationHeadrer title={language.servicesHeaderTitle[1]} subTitle={language.servicesHeaderSubTitle[1]} error={props.error} />


      <div className={ManagerRegistrationStyle.Body}>
        {/* Category Name */}
        <Input label={language.categoryName[1]} name="category" value={Service.category} onChange={onCategoryChange} class="border" />

        {/* AutoComplete */}
        <div className={ServicesStyle.Options}>{optionList}</div>

        {/* Service Name */}
        <Input label={language.serviceName[1]} name="title"
          value={Service.title} onChange={(e) => setService({ ...Service, title: e.target.value })} class="border" />

        {/* Service Price */}
        <Input label={language.price[1]} name="price"
          value={Service.price} onChange={(e) => setService({ ...Service, price: parseInt(e.target.value) })} class="border" />

        {/* Service Duration */}
        <Input label={language.duration[1]} name="duration"
          value={Service.duration} onChange={(e) => setService({ ...Service, duration: parseInt(e.target.value) })} class="border" />
      </div>

      <div className={ServicesStyle.ServicesList}>{AllServices()}</div>

      <div className={ServicesStyle.Button}>
        <Button
          border={true}
          onClick={(e: any) => addNewService(e, Service)}
          color="purple-register"
        >
          {EditMode ? 'עדכן שירות' : 'הוסף שירות'}
        </Button>
      </div>

      <div className={BusinessRegistrationStyle.Buttons}>
        <Button onClick={() => props.step("decrement")} color="orange"> {language.back[1]} </Button>
        <Button onClick={() => {
          console.log(props.getAllServices());

        }} color="purple-register"> סיום </Button>
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  loading: getLoading(state),
  error: getError(state),
  services: getServices(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  postService: (form: Service) => dispatch(postService(form)),
  getAllServices: () => dispatch(getAllServices())

});

export default connect<StateProps, DispatchProps>(mapStateToProps, mapDispatchToProps)(memo(Services,
  (prevProps, nextProps) => {
    console.log('Services');
    if (!nextProps.loading && !nextProps.error && nextPage) {
      nextProps.step('increment');
      return true;
    }
    return false;
  }));
