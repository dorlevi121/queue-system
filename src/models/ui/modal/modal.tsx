import React from "react";
import modalStyle from "./modal.module.scss";

interface OwnProps {
  close?: () => void;
  onClickButton?: () => void;
  title?: string;
  footer?: JSX.Element;
  children: React.ReactNode
}

const Modal: React.FC<OwnProps> = props => {
  return (
    <div className={modalStyle.ModalBackground} onClick={props.close} >
      <div className={modalStyle.Modal} onClick={(e: any) => { e.stopPropagation(); }}>
        <div className={modalStyle.Header}>
          <h1>{props.title}</h1>
          <span onClick={props.close}>&times;</span>
        </div>
        <div className={modalStyle.Content}>
          {props.children}
        </div>
        <div className={modalStyle.Footer}>
          {props.footer}
        </div>
      </div>
    </div>
  );
};

export default Modal;