import Now from './Now'
import Clock from './Clock'
import styles from './index.module.scss'
const Intro=()=>{
    return (
        <div className={styles.intro}>
            <Now/>
            <Clock/>
        </div>
    )
}


export default Intro