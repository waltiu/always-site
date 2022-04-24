import {
  AppstoreAddOutlined,
  DeleteRowOutlined,
  InsertRowBelowOutlined,
} from "@ant-design/icons";
import classNames from "classnames";
import TagModal from "../Common/TagModal";
import type { LabelType, SetLabelMethodType } from "types/label";
import { useState } from "react";
import styles from "./index.module.scss";

const Handle = ({
  isOpen,
  index,
  currentLabel,
  labels,
  setIsOperingId,
  operLabel,
}: {
  isOpen: boolean;
  index: number;
  labels: LabelType[],
  currentLabel: LabelType,
  setIsOperingId: () => void;
  operLabel: SetLabelMethodType;
}) => {
  const [tagModalVisible, setTagModalVisible] = useState<boolean>(false);
  return (
    <div className={classNames(styles.oper, isOpen ? styles["is-open"] : "")}>
      <div className={styles.detail}>
        <div
          className={styles.icon}
          onClick={() => {
            operLabel("addLabel",'',index);
          }}
        >
          <span>
            <InsertRowBelowOutlined />
          </span>
        </div>
        <div className={styles.icon} onClick={()=>{
          setTagModalVisible(true)
        }}>
          <span>
            <AppstoreAddOutlined />
          </span>
        </div>

        <div
          className={styles.icon}
          onClick={() => {
            operLabel("deleteLabel","",index);
          }}
        >
          <span>
            <DeleteRowOutlined />
          </span>
        </div>
      </div>
      <div
        className={styles["oper-icon"]}
        onClick={() => {
          setIsOperingId();
        }}
      >
        <span />
        <span />
        <span />
      </div>
      {tagModalVisible && (
        <TagModal
          currentLabel={currentLabel}
          labels={labels}
          visible={Boolean(tagModalVisible)}
          operLabel={operLabel}
          onCancel={() => {
            setTagModalVisible(false);
          }}
        />
      )}
    </div>
  );
};
export default Handle;
