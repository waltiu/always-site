import { UnorderedListOutlined } from '@ant-design/icons'
import styles from './index.module.scss'
const LabelOperCard= ()=>{
    return (
        <div className={styles.oper}>
            <UnorderedListOutlined  className={styles['oper-icon']}/>
        </div>
    )
}
export default LabelOperCard