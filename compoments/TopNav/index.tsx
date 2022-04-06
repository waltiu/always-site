import { Input } from 'antd';
import styles from './index.module.scss'
console.log(styles,'styles')
const TopNav = ()=>{
    return <div className={styles['top-nav']}>
        <div className={styles['search-box']}>
        <Input className={styles.search} placeholder="Borderless" bordered={false} />
        </div>
    </div>
}

export default TopNav