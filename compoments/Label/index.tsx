import useTag from '../../composables/useTag'
import Tag from './Tag'
import {sourceTypes} from '../../static/constant'
import {TagType} from '../../types/label'
import styles from './index.module.scss'
const Label=()=>{
    const [tags,setTags]=useTag()
    console.log(tags,'tags')
    return (
        <div>
            {
                (tags||[]).map(([label,value]:[string,[TagType]])=>{
                    return <div key={label}>

                        <div>{label}</div>
                        <div>{
                            value?.length&&value.map((item:TagType)=><Tag key={item.name} data={item}/>)
                            }</div>
                    </div>
                })
            }
        </div>
    )
}
export default Label