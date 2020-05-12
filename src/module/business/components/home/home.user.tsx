import React, { Component } from "react";
import homeStyle from "./home.module.scss";
import ChartHome from "./components/chart/chart-home.home";
import TextBox from "../../../../models/ui/text-box/text-box";
import { FaDollarSign } from "react-icons/fa";
import { TiGroup } from "react-icons/ti";
import { BsPersonPlusFill } from "react-icons/bs";
import { MdQueryBuilder } from "react-icons/md";

const prop = {
  info: [
    { title: "כותרת", content: "מידע מידע מידע" },
    { title: "כותרת", content: "מידע מידע מידע" },
    { title: "כותרת", content: "מידע מידע מידע" },
    { title: "כותרת", content: "מידע מידע מידע" },
  ],
  title: ":מספר הלקוחות בשנה האחרונה",
};
const home = () => {
  return (
    <div className={homeStyle.Home}>
      <div className={homeStyle.Chart}>
        <p>{prop.title}</p>
        <div className={homeStyle.Graph}>
          <ChartHome />
        </div>
        <div className={homeStyle.TextBox}>
          {/* Numbers of costumers from the begining month */}
          {prop.info.map((inf) => (
            <TextBox height="100px" width="350px">
              <div className={homeStyle.Icon}>
                <TiGroup size="2rem" />
              </div>

              <div className={homeStyle.Text}>
                <div className={homeStyle.Title}>{inf.title}</div>
                <div className={homeStyle.Content}>{inf.content}</div>
              </div>
            </TextBox>
          ))}
        </div>
      </div>
    </div>
  );
};

export default home;
