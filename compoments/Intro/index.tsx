import Weather from './Weather'
import Clock from './Clock'
import Hot from './Hot'
import styles from './index.module.scss'
const Intro=()=>{
    return (
        <div className={styles.intro}>
            <Weather/>
            <Clock/>
            <Hot/>
        </div>
    )
}


export default Intro