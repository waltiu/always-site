/* eslint-disable no-unused-vars */
export type TagType={
    name: string,
    link: string,
    icon: string,
    id: string,
    childs?: TagType[],
    tagIndex?: number,
    tagChildIndex?: number,
    isFolder?: boolean
}
export type operType='addLabel'|'deleteLabel'|'editLabel'|'sortLabel'|'addTag'|'deleteTag'|'editTag'|'sortTag'|'addChildTag'|'editChildTag'|'deleteChildTag'|'changeTagToFolder'|'changeFolderToTag'
export type OperTypeFunObj = Record<operType,any>;
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
export type SetLabelMethodType= (type: operType,data: any,labelIndex?: number,tagIndex?: number,tagChildIndex?: number) => void