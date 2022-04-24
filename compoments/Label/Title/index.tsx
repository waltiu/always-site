import type { LabelType, SetLabelMethodType } from "types/label";
import { OTHER_LABEL } from "static/constant";
import styles from "./index.module.scss";
import type { FocusEvent} from "react";
import { useState, useRef } from "react";
import type { InputRef } from "antd";
import { Input } from "antd";
const LabelTitle = ({
  label,
  labels,
  operLabel,
}: {
  label: LabelType;
  labels: LabelType[];
  operLabel: SetLabelMethodType;
}) => {

  const { id,title } = label;

  const [isInput, setIsInput] = useState(false);
  const inputRef = useRef<InputRef>(null);

  const changeLabelName = (name: string) => {
    const currentLabelIndex = labels.findIndex((item) => item.id === id);
    if (currentLabelIndex > 0) {
      operLabel('editLabel',{
        title:name
      },currentLabelIndex);
      setIsInput(false);
    }
  };

  return (
    <>
      <div className={styles.title}>
        {isInput ? (
          <Input
            bordered={false}
            ref={inputRef}
            defaultValue={title}
            onBlur={(e: FocusEvent<HTMLInputElement, Element>) => {
              changeLabelName(e.target.value);
            }}
            onPressEnter={() => {
              inputRef.current?.blur();
            }}
          />
        ) : (
          <span
            onDoubleClick={() => {
              setIsInput(true);
              setTimeout(() => {
                inputRef.current?.focus();
              }, 0);
            }}
          >
            {title || OTHER_LABEL}
          </span>
        )}
      </div>
    </>
  );
};

export default LabelTitle;
