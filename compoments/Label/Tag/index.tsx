import { FC } from "react";
import { Popover } from "antd";
import styles from "./index.module.scss";
import Image from "compoments/Image";

type TagPropsType = {
  data: any;
};

const Tag: FC<TagPropsType> = ({ data }) => {
  return (
    <div className={styles.tag}>
      <Image src={data.icon} alt="" width={20} height={20} />
      <div className={styles.name}>
        <a href={data.link} target="_blank" rel="noreferrer">
          {data.name}
        </a>
      </div>
      <div className={styles.oper}>
        <Popover
          placement="topRight"
          title={<div>
              111
          </div>}
          trigger="click"
          getPopupContainer={(trigger) => trigger.parentElement as HTMLElement}
        >
          ...
        </Popover>
      </div>
    </div>
  );
};
export default Tag;
