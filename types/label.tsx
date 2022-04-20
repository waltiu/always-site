export type TagType={
    name: string,
    link: string,
    icon:string,
    id:string
}
export type operType='add'|'delete'|'heat'|'sortTag'|'addLabel'|'deleteLabel'

export  type LabelType={
  type:string,
  id:string,
  tags:TagType[]
}
export type SortQueueType={
 index:number,
 data:TagType[]
}[]


export type useLabelRetrunType = [
 tags:Array<LabelType> ,
 method:SetLabelMethodType
];
export type SetLabelMethodType= (tag:any,oper?:operType) => void