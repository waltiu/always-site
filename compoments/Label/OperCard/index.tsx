import { CloseOutlined, MoreOutlined,PlusOutlined,EditOutlined,MinusOutlined } from "@ant-design/icons";
import classNames from "classnames";
import styles from "./index.module.scss";
const LabelOperCard = ({isOpen,setIsOperingType}:{isOpen:boolean,setIsOperingType:()=>void}) => {
  return (
    <div className={classNames(styles.oper, isOpen ? styles["is-open"] : "")}>
      <div className={styles.detail}>
        <div className={styles.icon}>
          <span>
          <PlusOutlined />
          </span>
        </div>
        <div className={styles.icon}>
          <span>
          <EditOutlined />
          </span>
        </div>
        <div className={styles.icon}>
          <span>
          <MinusOutlined />
          </span>
        </div>
      </div>
      <div
        className={styles["oper-icon"]}
        onClick={() => {
          setIsOperingType();
        }}
      >
        <span>{isOpen ? <CloseOutlined /> : <MoreOutlined />}</span>
      </div>
    </div>
  );
};
export default LabelOperCard;
