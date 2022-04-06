import useTag from '../../composables/useTag'
import Tag from './Tag'
import {sourceTypes} from '../../static/constant'
import {TagType} from '../../types/label'
import styles from './index.module.scss'
const Label=()=>{
    const [tags,operTag]=useTag()
    console.log(tags,'tags',operTag)
    return (
        <div>
            {
                (tags||[]).map(([type,value]:[string,[TagType]])=>{
                    return <div key={type}>

                        <div>{sourceTypes[type as keyof typeof sourceTypes ]?.title||'其他'}</div>
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