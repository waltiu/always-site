import { useEffect, useState } from "react";
import { defaultTag } from "../static/constant";
import { groupByTagType, tranferTag } from "../util";
import { TagType } from "../types/label";

 type operType='add'|'delete'|'heat'|'unHeat'

 type TagsType=Array<[string,[TagType]]>|null

type UseTagRetrunType = [
  tags: TagsType,
  method: (tag:TagType,oper:operType) => void,
];
const useTag = (): UseTagRetrunType => {
  const [tags, setTags] = useState<TagsType>(null);
  const addTag = (tag:TagType) => {
    // const newTagIndex=newTags.findIndex(item=>JSON.stringify(item)===JSON.stringify(item))
    // if(newTagIndex){
    //     newTags[newTagIndex].heat=(newTags[newTagIndex].heat||0)+1
    // }else if(newTag){
    //     newTags.push(newTag)
    // }
    // newTags=[...newTags]
    // let tagList=[]
  };
  const deleteTag = (tag:TagType) => {};

  const changeTag = (tag:TagType) => {};

  const heatTag = (tag:TagType) => {};

  const unHeatTag = (tag:TagType) => {};

  const initTags = () => {
    if (!tags) {
      let newTags = [...defaultTag];
      const favoreateTop10 = newTags
        .sort((a: any, b: any) => {
          return (b.heat || 0) - (a!.heat || 0);
        })
        .slice(0, 10) ;

      let tagList = [["hot", favoreateTop10 ]];
      const result = tranferTag(groupByTagType(newTags));
      tagList = tagList.concat(result );
      setTags(tagList as any );
    }
  };
  useEffect(() => {
    initTags();
  });

  return [tags,(tag,oper)=>{
    if(oper==='add'){
      addTag(tag)
    }
    if(oper==='delete'){
      deleteTag(tag)
    }
    if(oper==='heat'){
      heatTag(tag)
    }
    if(oper==='unHeat'){
      unHeatTag(tag)
    }
  }];
};
export default useTag;
