export type TagType={
    name: string,
    link: string,
    icon: string,
    id: string,
    index?: number
}
export type operType='addTag'|'delete'|'heat'|'sortTag'|'addLabel'|'deleteLabel'

export  type LabelType={
  title: string,
  id: string,
  tags: TagType[],
  index?: number
}
export type SortQueueType={
 index: number,
 data: TagType[]
}[]


export type useLabelRetrunType = [
 tags:LabelType[] ,
 method:SetLabelMethodType
];
export type SetLabelMethodType= (tag: any,oper?: operType) => void