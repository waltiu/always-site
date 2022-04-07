import classNames from 'classNames'
import cardStyles from '../../../styles/card.module.scss'
import styles from './index.module.scss'
const Now =(props:any)=>{
console.log(props)
    return (
        <div className={classNames(cardStyles.card,styles.now)}>
            11
        </div>
    )
}

Now.getInitialProps = async () => {
    const res = await fetch('https://api.github.com/repos/vercel/next.js')
    const json = await res.json()
    return  {
        props: { a:json }, // will be passed to the page component as props
    }
  }
export default Now