import classNames from 'classnames'
import cardStyles from '../../../styles/card.module.scss'
import styles from './index.module.scss'
const Now =(props:any)=>{
    return (
        <div className={classNames(cardStyles.card,styles.now)}>
            {props.test}
        </div>
    )
}

export default Now