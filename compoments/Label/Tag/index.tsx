import { type } from "os"
import { FC } from "react"

type TagPropsType={
    data:any
}

const Tag:FC<TagPropsType> =({data})=>{
    return <div>
        {data.name}
    </div>
}
export default Tag