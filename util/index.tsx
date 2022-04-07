import {TagType} from 'types/label'
export const groupByTagType = (list:any) =>
  list.reduce((tagObj:{
    [type:string]:Array<TagType>
  }, item:TagType) => {
    tagObj[item.type||''] = [...(tagObj[item.type||''] || []),item] as Array<TagType>
    return tagObj 
  }, {})

export const tranferTag =(tagObj: {[index:string]:Array<TagType>})=>{
    return  Object.entries(tagObj)
}

