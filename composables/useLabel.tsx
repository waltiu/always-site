/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { defaultTag } from "static/constant";
import { uuid, uniqueTags } from "util/index";
import type {
  TagType,
  LabelType,
  useLabelRetrunType,
  SortQueueType,
  OperTypeFunObj
} from "types/label";
import { message } from "antd";

const CACHE_LABELS_KEY = "cache-labels";

const useLabel = (): useLabelRetrunType => {
  const [labels, setLables] = useState<LabelType[]>([]);

  const updateLabels = (newLabels: LabelType[]) => {
    setLables(uniqueTags(newLabels));
    localStorage.setItem(CACHE_LABELS_KEY, JSON.stringify(newLabels));
  };



  const addLabel = (_: any,labelIndex: number) => {
    const newLabels = [...labels];
    newLabels.splice(labelIndex + 1, 0, {
      title: "新增",
      id: `label-${uuid()}`,
      tags: [],
    });
    updateLabels(newLabels);
  };

  const deleteLabel = (_: any,labelIndex: number) => {
    if(labels.length>2){
      const newLabels = [...labels];
      if (labelIndex > 0) {
        newLabels.splice(labelIndex, 1);
      }
      updateLabels(newLabels);
    }else{
      message.warn('请至少保留一个卡片！')
    }

  };

  const editLabel=(data: LabelType,labelIndex:  number)=>{
    const newLabels = [...labels];
    newLabels[labelIndex]={
      ... newLabels[labelIndex],
      ...data
    }
    updateLabels(newLabels)
  }


  const addTag =(data: TagType,labelIndex:  number)=>{
    const newLabels = [...labels];
    newLabels[labelIndex].tags.push({
      ...data,
      id:`tag-${uuid()}`,
    })
    updateLabels(newLabels)
  }

  const deleteTag = (data: any,labelIndex: number,tagIndex: number) => {
    const newLabels = [...labels];
    newLabels[labelIndex].tags.splice(tagIndex,1)
    updateLabels(newLabels)
  };

  const editTag =(data: any,labelIndex: number,tagIndex: number)=>{
    const newLabels = [...labels];
    newLabels[labelIndex].tags[tagIndex]=data
    updateLabels(newLabels)
  }

  const sortTag = (params: SortQueueType) => {
    if (params.length > 0) {
      if (params[0].index === 0) {
        // eslint-disable-next-line no-param-reassign
        params = [params[0]];
      }
      const newLabels = [...labels];
      params.map((item) => {
        newLabels[item.index].tags = item.data;
      });
      updateLabels(newLabels);
    }
  };

  const addChildTag=(data: any,labelIndex: number,tagIndex: number)=>{
    const newLabels = [...labels];
    if(!newLabels[labelIndex].tags[tagIndex].childs){
      newLabels[labelIndex].tags[tagIndex].childs=[]
    }
    // @ts-ignore
    newLabels[labelIndex].tags[tagIndex].childs.push({
      ...data,
      id:`child-tag-${uuid()}`
    })
    updateLabels(newLabels);
  }

  const editChildTag=(data: any,labelIndex: number,tagIndex: number,tagChildIndex: number)=>{
    const newLabels = [...labels];
    if( newLabels[labelIndex].tags[tagIndex].childs){
      // @ts-ignore
      newLabels[labelIndex].tags[tagIndex].childs[tagChildIndex]=data
    }
    updateLabels(newLabels);
  }

  const deleteChildTag=(data: any,labelIndex: number,tagIndex: number,tagChildIndex: number)=>{
    const newLabels = [...labels];
    if( newLabels[labelIndex].tags[tagIndex].childs){
      // @ts-ignore
      newLabels[labelIndex].tags[tagIndex].childs?.splice(tagChildIndex,1)
    }
    updateLabels(newLabels);
  }

  const changeTagToFolder=(data: any,labelIndex: number,tagIndex: number,tagChildIndex: number)=>{
    const newLabels = [...labels];
       // @ts-ignore
    const tag=newLabels[labelIndex].tags[tagIndex]
    addChildTag({
      ...tag,
      childs:[],
    },labelIndex,tagIndex)
    newLabels[labelIndex].tags[tagIndex].isFolder=true
    newLabels[labelIndex].tags[tagIndex].name=`文件夹-${newLabels[labelIndex].tags[tagIndex].name}`
    newLabels[labelIndex].tags[tagIndex].link=""
    updateLabels(newLabels);
  }
  const changeFolderToTag=(data: any,labelIndex: number,tagIndex: number,tagChildIndex: number)=>{
    const newLabels = [...labels];
    // @ts-ignore
    if(newLabels[labelIndex].tags[tagIndex].childs?.length<=1){
      newLabels[labelIndex].tags[tagIndex].isFolder=false
      updateLabels(newLabels);
    }
    // @ts-ignore
    const tag=newLabels[labelIndex].tags[tagIndex].childs[tagChildIndex]
    deleteChildTag(data,labelIndex,tagIndex,tagChildIndex)
    addTag(tag,labelIndex)
  }
  const initTags = () => {
    if (labels.length) {
      return "";
    }
    const cacheLabels = localStorage.getItem(CACHE_LABELS_KEY);
    const newLabels = (cacheLabels ? JSON.parse(cacheLabels) : defaultTag).map(
      (item: LabelType) => {
        return {
          ...item,
          id: `label-${uuid()}`,
          tags: (item.tags || []).map((tag) => {
            return {
              ...tag,
              id: `tag-${uuid()}`,
            };
          }),
        };
      }
    );
    updateLabels(newLabels);
  };
  useEffect(() => {
    initTags();
  });

  const operMethodObject: OperTypeFunObj = {
    addLabel:addLabel,
    deleteLabel:deleteLabel,
    editLabel:editLabel,
    sortLabel:updateLabels,
    addTag:addTag,
    deleteTag:deleteTag,
    editTag:editTag,
    sortTag:sortTag,
    addChildTag:addChildTag,
    editChildTag:editChildTag,
    deleteChildTag:deleteChildTag,
    changeTagToFolder:changeTagToFolder,
    changeFolderToTag:changeFolderToTag,
  };

  return [
    labels,
    (oper,data,labelIndex,tagIndex,tagChildIndex) => {
      try {
        operMethodObject[oper](data,labelIndex,tagIndex,tagChildIndex);     
      } catch (error) {
        console.log(error,'更新出错了')
      } 
    },
  ];
};
export default useLabel;
