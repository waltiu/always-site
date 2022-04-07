import classNames from 'classnames'
import cardStyles from '../../../styles/card.module.scss'
import styles from './index.module.scss'
const Now =(props:any)=>{
    return (
        <div className={classNames(cardStyles.card,styles.now)}>
            北京时间2022-4-7
        </div>
    )
}

export default Now