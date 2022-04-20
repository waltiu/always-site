import { CloseOutlined, MoreOutlined,AppstoreAddOutlined,DeleteRowOutlined,InsertRowBelowOutlined } from "@ant-design/icons";
import classNames from "classnames";
import { SetLabelMethodType } from "types/label";
import styles from "./index.module.scss";
const Handle = ({isOpen,index,title,setIsOperingId,operLabel}:{isOpen:boolean,index:number,title:string,setIsOperingId:()=>void,operLabel:SetLabelMethodType}) => {
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
            <AppstoreAddOutlined />
          </span>
        </div>
      
        <div className={styles.icon} onClick={()=>{
          operLabel(title,'deleteLabel')
        }}>
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
        <span>{isOpen ? <CloseOutlined /> : <MoreOutlined />}</span>
      </div>
    </div>
  );
};
export default Handle;
