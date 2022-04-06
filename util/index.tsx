import {TagType} from '../types/label'
export const groupByTagType = (list:any) =>
  list.reduce((tagObj:any, item:TagType) => {
    tagObj[item.type] = [...(tagObj[item.type] || []),item]
    return tagObj
  }, {})

export const tranferTag =(tagObj:any)=>{
    return  Object.entries(tagObj)
}