import { LabelType,SetLabelMethodType } from "types/label";
import { OTHER_LABEL } from "static/constant";
import styles from "./index.module.scss";
import { useState,FocusEvent,KeyboardEvent, useRef } from "react";
import { Input,InputRef } from "antd";
const LabelTitle = ({ label,labels,operLabel }: {
    label:LabelType,
    labels:LabelType[]
    operLabel:SetLabelMethodType
}) => {
  const { type } = label;
  const [isInput,setIsInput]=useState(false)
  const inputRef=useRef<InputRef>(null)
  const changeLabelName=(name:string)=>{
    const currentLabelIndex=labels.findIndex(item=>item.type===type)
    if(currentLabelIndex>0){
        const newLabels=[...labels]
        newLabels[currentLabelIndex].type=name
        operLabel(newLabels)
        setIsInput(false)
    }
  }
  return (
    <>
      <div className={styles.title}>
          {isInput?<Input bordered={false} ref={inputRef}  defaultValue={type} onBlur={(e:FocusEvent<HTMLInputElement, Element>)=>{
            changeLabelName(e.target.value)
          }}
          onPressEnter={()=>{
                inputRef.current?.blur();
          }}
          />
          :  <span  onDoubleClick={()=>{
          setIsInput(true)
      }} >
          {type || OTHER_LABEL}
          </span>}
        
      </div>
    </>
  );
};
export default LabelTitle;
