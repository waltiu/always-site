import { useEffect, useState } from "react";
import { defaultTag } from "../static/constant";
import { groupByTagType, tranferTag } from "../util";
import { TagType } from "../types/label";

 type operType='add'|'delete'|'heat'|'unHeat'

type UseTagRetrunType = [
  tags: Array<[string,[TagType]]>|null,
  method: (tag:TagType,oper:operType) => void,
];
const useTag = (): UseTagRetrunType => {
  const [tags, setTags] = useState(null);
  const addTag = () => {
    // const newTagIndex=newTags.findIndex(item=>JSON.stringify(item)===JSON.stringify(item))
    // if(newTagIndex){
    //     newTags[newTagIndex].heat=(newTags[newTagIndex].heat||0)+1
    // }else if(newTag){
    //     newTags.push(newTag)
    // }
    // newTags=[...newTags]
    // let tagList=[]
  };
  const deleteTag = () => {};

  const changeTag = () => {};

  const heatTag = () => {};

  const unHeatTag = () => {};

  const initTags = () => {
    if (!tags) {
      let newTags = [...defaultTag];
      const favoreateTop10 = newTags
        .sort((a: TagType, b: TagType) => {
          return (b.heat || 0) - (a!.heat || 0);
        })
        .slice(0, 10) ;

      let tagList = [["hot", favoreateTop10 ]];
      const result = tranferTag(groupByTagType(newTags));
      tagList = tagList.concat(result as []);
      setTags(tagList as any);
    }
  };
  useEffect(() => {
    initTags();
  });

  return [tags,(tag,oper)=>{
    if(oper==='add'){
      addTag()
    }
    if(oper==='delete'){
      addTag()
    }
    if(oper==='heat'){
      addTag()
    }
    if(oper==='unHeat'){
      addTag()
    }
  }];
};
export default useTag;
