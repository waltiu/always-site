import { Input } from "antd";
import jsonp from "jsonp";
import styles from "./index.module.scss";
import { BaiduSugListType, BaiduSugItemType } from "types/baidu";
import { useState } from "react";
import classNames from "classnames";
const TopNav = () => {
  const [sugList, setSugList] = useState<Array<string>>();
  const querySearch = async (e: any) => {
    await jsonp(
      `https://www.baidu.com/sugrec?prod=pc&wd=${e.target.value}`,
      {},
      (err, data: BaiduSugListType) => {
        const result = (data.g || []).map((item: BaiduSugItemType) => item.q);
        setSugList(result);
      }
    );
  };

  return (
    <div className={classNames(styles["top-nav"])}>
      <div className={styles["search-box"]}>
        <Input
          className={styles.search}
          placeholder="Borderless"
          bordered={false}
          onChange={querySearch}
        />
      </div>
          <div className={classNames(styles["result-box"])} style={sugList?.length?{maxHeight:'300px'}:{visibility:'hidden'}}>
            {(sugList||[]).map((item) => {
              return (
                <div key={item} className={styles["result-item"]}>
                  {item}
                </div>
              );
            })}
        </div>
     
    </div>
  );
};

export default TopNav;
