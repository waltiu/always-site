import { CloseOutlined, MoreOutlined,PlusOutlined,DeleteRowOutlined,InsertRowBelowOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { SetLabelMethodType } from "types/label";
import styles from "./index.module.scss";
const Handle = ({isOpen,index,type,setIsOperingType,operLabel}:{isOpen:boolean,index:number,type:string,setIsOperingType:()=>void,operLabel:SetLabelMethodType}) => {
  return (
    <div className={classNames(styles.oper, isOpen ? styles["is-open"] : "")}>
      <div className={styles.detail}>
      <div className={styles.icon} onClick={()=>{
          operLabel(index,'addLabel')
        }}>
          <span>
          <InsertRowBelowOutlined />
          </span>
        </div>
        <div className={styles.icon} >
          <span>
          <PlusOutlined />
          </span>
        </div>
      
        <div className={styles.icon} onClick={()=>{
          operLabel(type,'deleteLabel')
        }}>
          <span>
          <DeleteRowOutlined />
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
export default Handle;
