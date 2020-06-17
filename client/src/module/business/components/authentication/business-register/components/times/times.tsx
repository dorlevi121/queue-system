import React, { useState, useEffect, memo } from "react";
import BusinessRegistrationStyle from "../business-registration/business-registration.module.scss";
import * as language from "../../../../../../../assets/language/language";
import TimesStyle from "./times.module.scss";
import { cloneDeep } from "lodash";
import Button from "../../../../../../../models/ui/button/button";
import {
  getLoading,
  getError,
} from "../../../../../../../store/business/details/details.selectors";
import { connect } from "react-redux";
import { postBuisnessHours } from "../../../../../../../store/business/details/details.actions";
import AuthenticationHeadrer from "../../../shared/authentication-header/authentication-headrer";
import Checkbox from "../../../../../../../models/ui/checkbox/checkbox";
import { BusinesHours } from "../../../../../../../models/system/busines-hours";

interface OwnProps {
  step: (step: "decrement" | "increment") => void;
  onChange: (e: any, name: string, value?: any) => void;
  values: any;
}

interface StateProps {
  loading: boolean;
  error: Error;
}

interface DispatchProps {
  postBuisnessHours: typeof postBuisnessHours;
}

// Become true when user click on next in the first time
let nextPage = false;
const FullHebDays = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"];
const FullEngDays = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];
const mobileHebDays = ["א'", "ב'", "ג'", "ד'", "ה'", "ו'", "ש'"];
const hours = [
  "06:00",
  "07:00",
  "08:00",
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
  "20:00",
  "21:00",
  "22:00",
  "23:00",
  "24:00",
];

type Props = DispatchProps & StateProps & OwnProps;
const Times: React.FC<Props> = (props) => {
  const [CurDay, setCurDay] = useState<number>(0);
  const [IsMobile, setIsMobile] = useState<any>(false);
  const [Error, setError] = useState("");

  // Component did mount
  useEffect(() => {
    const resize = () => {
      // Check if the device witdh <= 600px
      let currentHideNav = window.innerWidth <= 600;
      if (currentHideNav !== IsMobile) {
        setIsMobile(currentHideNav);
      }
    };
    resize();
  }, [IsMobile]);

  let hebDays: string[] = IsMobile ? mobileHebDays : FullHebDays;

  // Invoke when user click on day checkbox
  const onClickDay = (e: any, i: number) => {
    const times = cloneDeep(props.values.workTimes);
    if (times[FullEngDays[i]]) {
      delete times[FullEngDays[i]];
    } else {
      times[FullEngDays[i]] = { start: "06:00", end: "24:00" };
      if (Object.keys(props.values.workTimes).length < 2) setCurDay(i);
    }
    props.onChange(e, "workTimes", times);
  };

  // Invoke when user choose day to pick hours
  const changeDay = (e: any) => {
    setCurDay(e.target.value);
  };

  // Invoke when user pick hour
  const changeHour = (e: any, value: "start" | "end") => {
    const times = cloneDeep(props.values.workTimes);
    times[FullEngDays[CurDay]][value] = e.target.value;
    props.onChange(e, "workTimes", times);
  };

  // Checks the information in front of the server
  const onClickNext = () => {
    props.step('increment');
    if (Object.keys(props.values.workTimes).length === 0) {
      setError("לא הוזנו ימים");
      return;
    }
    setError("");
    let schdule: BusinesHours = {};
    for (const [key, value] of Object.entries(props.values.workTimes)) {
      schdule[key] = [];
      schdule[key].push(props.values.workTimes[key]);
    }
    //props.postBuisnessHours(schdule);
    nextPage = true;
  };

  return (
    <div className={TimesStyle.Times}>
      <AuthenticationHeadrer
        title={language.timesHeaderTitle[1]}
        subTitle={language.timesHeaderSubTitle[1]}
        error={Error}
      />

      <div className={TimesStyle.Body}>
        {/* Days */}
        <p className={TimesStyle.Title}>סמן את ימי העבודה שלך</p>
        <div className={TimesStyle.Days}>
          {hebDays.map((day: string, i: number) => {
            return (
              <React.Fragment key={i * 26}>
                <Checkbox
                  id={"day" + i}
                  onClick={(e) => onClickDay(e, i)}
                  value={i}
                  defaultChecked={props.values[FullEngDays[i]]}
                  label={" " + day}
                />
              </React.Fragment>
            );
          })}
        </div>
        {/* Check list days */}
        {Object.keys(props.values.workTimes).length !== 0 && (
          <div className={TimesStyle.Hours}>
            <p className={TimesStyle.Title}> סמן שעות עבודה </p>
            <span>בחר יום</span>
            <select onChange={changeDay}>
              {hebDays.map((day: string, i: number) => {
                if (props.values.workTimes[FullEngDays[i]]) {
                  return (
                    <option key={i * 21} value={i}>
                      {day}
                    </option>
                  );
                }
              })}
            </select>

            <br />
            {/* Start Hours */}
            <div className={TimesStyle.Hour}>
              <select
                onChange={(e) => changeHour(e, "start")}
                value={
                  props.values.workTimes[FullEngDays[CurDay]]
                    ? props.values.workTimes[FullEngDays[CurDay]].start
                    : ""
                }
              >
                {hours.map((hour: string) => {
                  return (
                    <option key={parseInt(hour) * 2} value={hour}>
                      {hour}
                    </option>
                  );
                })}
              </select>
              {/* End Hours */}
              <select
                onChange={(e) => changeHour(e, "end")}
                value={
                  props.values.workTimes[FullEngDays[CurDay]]
                    ? props.values.workTimes[FullEngDays[CurDay]].end
                    : ""
                }
              >
                {hours.map((hour: string) => {
                  if (
                    parseInt(
                      props.values.workTimes[FullEngDays[CurDay]].start
                    ) > parseInt(hour)
                  )
                    return;
                  return (
                    <option key={parseInt(hour) * 6} value={hour}>
                      {hour}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        )}
      </div>

      {!props.loading ? (
        <div
          className={BusinessRegistrationStyle.Buttons}
          style={{ marginTop: "30px" }}
        >
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
  postBuisnessHours: (form: BusinesHours) =>
    dispatch(postBuisnessHours(form)),
});

export default connect<StateProps, DispatchProps>(
  mapStateToProps,
  mapDispatchToProps
)(
  memo(Times, (prevProps, nextProps) => {
    if (!nextProps.loading && nextPage && Error.length <= 1) {
      nextProps.step("increment");
      return true;
    }
    return false;
  })
);
