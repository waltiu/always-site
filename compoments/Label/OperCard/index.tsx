import { UnorderedListOutlined } from '@ant-design/icons'
import classNames from 'classnames'
import { useState } from 'react'
import styles from './index.module.scss'
const LabelOperCard= ()=>{
    const [isOpen,setIsOpen]=useState(false)
    return (
        <div className={classNames(styles.oper,isOpen?styles['is-open']:"")}>
            <div className={styles['oper-icon']}  onClick={()=>{
                console.log(11)
                setIsOpen(!isOpen)
            }}>
                    <span>
                        +
                    </span>
            </div>
      
                <div className={styles.detail}>
                <div className={styles.icon}>+</div>
                <div className={styles.icon}>-</div>
                <div  className={styles.icon}>N</div>
            </div>
      
        </div>
    )
}
export default LabelOperCard