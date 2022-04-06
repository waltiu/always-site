export type TagType={
    name: string,
    link: string,
    icon:string,
    heat?:number,
    type:'community'|'lib'|'frame'|any
}
interface  SocureType{
    'community':"社区",
    'lib':'库',
    'frame':'框架'
}