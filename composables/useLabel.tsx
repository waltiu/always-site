import { useEffect, useState } from "react";
import { defaultTag } from "static/constant";
import { uuid } from "util/index";
import { TagType,LabelType,useLabelRetrunType,sortQueueType } from "types/label";


const useLabel = (): useLabelRetrunType => {
  const [labels, setLables] = useState<Array<LabelType>>([]);
  const addTag = (tag:TagType) => {

  };
  const deleteTag = (tag:TagType) => {};

  const changeTag = (tag:TagType) => {};

  const heatTag = (tag:TagType) => {};

  const unHeatTag = (tag:TagType) => {};

  const addLabel=(data:sortQueueType)=>{
    console.log()
  }

  const sortLabel =(data:Array<LabelType>)=>{
    setLables(data)
  }
  const sortTag =(params:sortQueueType)=>{
    const newLabels=[...labels]
    params.map(item=>{
      newLabels[item.index].tags=item.data
    })
 setLables(newLabels)
  }

  const initTags = () => {
    if(labels.length){
      return ''
    }
      const newLabels=defaultTag.map(item=>{
        return {
          ...item,
          id:`label-${uuid()}`,
          tags:(item.tags||[]).map(tag=>{
            return {
              ...tag,
              id:`tag-${uuid()}`,
            }
          })
        }
      })
      setLables(newLabels)
  };
  useEffect(() => {
    initTags();
  });

  return [labels,(data,oper)=>{
    if(oper==='add'){
      addTag(data)
    }
    if(oper==='delete'){
      deleteTag(data)
    }
    if(oper==='heat'){
      heatTag(data)
    }
    if(oper==='unHeat'){
      unHeatTag(data)
    }
    if(oper==='sortLabel'){
      sortLabel(data)
    }
    if(oper==='sortTag'){
      sortTag(data)
    }
  }];
};
export default useLabel;
