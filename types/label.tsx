export type TagType={
    name: string,
    link: string,
    icon:string,
    id:string
}
export type operType='add'|'delete'|'heat'|'unHeat'|'sortLabel'|'sortTag'

export  type LabelType={
  type:string,
  id:string,
  tags:TagType[]
}



export type useLabelRetrunType = [
 tags:Array<LabelType> ,
 method: (tag:any,oper:operType) => void,
];