import useTag from '../../composables/useTag'
import Tag from './Tag'
import {sourceTypes} from '../../static/constant'
import styles from './index.module.scss'
const Label=()=>{
    const [tags,setTags]=useTag(null)
    console.log(tags,'tags')
    return (
        <div>
            {
                (tags||[]).map(([label,value])=>{
                    return <div key={label}>

                        <div>{label}</div>
                        <div>{
                            value.length&&value.map(item=><Tag key={item} data={item}/>)
                            }</div>
                    </div>
                })
            }
        </div>
    )
}
export default Label