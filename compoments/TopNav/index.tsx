import { Input } from 'antd';
import jsonp from 'jsonp'
import styles from './index.module.scss'
import {BaiduSugListType,BaiduSugItemType} from '../../types/baidu'
import { useState } from 'react';
const TopNav = ()=>{
    const [sugList,setSugList]=useState<Array<string>>()
    const querySearch = async (e:any) => {
        await jsonp(
          `https://www.baidu.com/sugrec?prod=pc&wd=${e.target.value}`,
          {},
          (err, data:BaiduSugListType) => {
            const result = (data.g || []).map((item:BaiduSugItemType) => item.q);
            setSugList(result)
          }
        );
      };
      
    return <div className={styles['top-nav']}>
        <div className={styles['search-box']}>
        <Input className={styles.search} placeholder="Borderless" bordered={false} onChange={querySearch} />
        {sugList?.length}
        </div>
    </div>
}

export default TopNav