import type { FC} from "react";
import { useState } from "react";
import { Popover } from "antd";
import styles from "./index.module.scss";
import Image from "compoments/Image";
import defaultImg from 'static/images/site.svg'
import classNames from "classnames";
type TagPropsType = {
  data: any;
};

const Tag: FC<TagPropsType> = ({ data }) => {
  const [isChecked,setIscChecked]=useState(false)
  const renderContent=()=>{
    return (
      <div>
        <div>
        <div>复制链接</div>
        </div>
        <div>
          <div>编辑</div>
          <div>删除</div>

        </div>

        <div>
          <div>添加子网址</div>
        </div>

      </div>
    )
  }

  return (
    <div className={classNames(styles.tag,isChecked?styles['is-checked']:'' )}>
      <Image src={data.icon||defaultImg} alt="" width={20} height={20} />
      <div className={styles.name}>
        <a href={data.link} target="_blank" rel="noreferrer">
          {data.name}
        </a>
      </div>
        <Popover content={renderContent()}
        placement={"bottom"}
        onVisibleChange={(visible)=>{
          setIscChecked(visible)
        }}
      >
      <div className={styles.oper}>

        ...
        </div>

        </Popover>
    </div>
  );
};
export default Tag;
