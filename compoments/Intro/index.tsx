import Weather from './Weather'
import Clock from './Clock'
import styles from './index.module.scss'
const Intro=()=>{
    return (
        <div className={styles.intro}>
            <Weather/>
            <Clock/>
        </div>
    )
}


export default Intro