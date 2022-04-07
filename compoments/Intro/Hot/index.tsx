import classNames from "classnames";
import cardStyles from "styles/card.module.scss";
import {SyncOutlined} from '@ant-design/icons'
import styles from './index.module.scss'

const Hot =()=>{
    return <div className={classNames(cardStyles.card, styles.hot)}>
        <div className={styles.label}>
            <div className={styles.title}>热搜榜</div>
            <div className={styles.refresh}>
            <SyncOutlined />
                <span>刷新</span></div>

        </div>
    </div>
}

export default Hot