import { useEffect, useState } from "react";
import { defaultTag } from "../static/constant";
import { groupByTagType, tranferTag } from "../util";
import { TagType } from "../types/label";
type UseTagRetrunType = [
  tags: Array<[string,[TagType]]>|null,
  addTag: () => void,
  deleteTag: () => void,
  heatTag: () => void,
  unHeatTag: () => void
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

  return [tags, addTag, deleteTag, heatTag, unHeatTag];
};
export default useTag;
