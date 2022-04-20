import { useEffect, useState } from "react";
import { defaultTag } from "static/constant";
import { uuid, uniqueTags } from "util/index";
import {
  TagType,
  LabelType,
  useLabelRetrunType,
  SortQueueType,
} from "types/label";

const CACHE_LABELS_KEY = "cache-labels";

const useLabel = (): useLabelRetrunType => {
  const [labels, setLables] = useState<Array<LabelType>>([]);

  const updateLabels = (newLabels: Array<LabelType>) => {
    setLables(uniqueTags(newLabels));
    localStorage.setItem(CACHE_LABELS_KEY, JSON.stringify(newLabels));
  };

  const addTag = (tag: TagType) => {};
  const deleteTag = (tag: TagType) => {};

  const changeTag = (tag: TagType) => {};

  const heatTag = (tag: TagType) => {};

  const unHeatTag = (tag: TagType) => {};

  const addLabel = (data: SortQueueType) => {
    console.log();
  };


  const sortTag = (params: SortQueueType) => {
    if (params[0].index === 0) {
      params = [params[0]];
    }
    const newLabels = [...labels];
    params.map((item) => {
      newLabels[item.index].tags = item.data;
    });
    updateLabels(newLabels);
  };

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

   const operMethodObject={
    addTag:addTag,
    deleteTag:deleteTag,
    heatTag:heatTag,
    sortTag:sortTag,
    addLabel:()=>{},
    deleteLabel:()=>{}
  }

  return [
    labels,
    (data, oper   ) => {
      if(oper&&operMethodObject[oper]){
        operMethodObject[oper](data)
      }else{
        updateLabels(data)
      }
    },
  ];
};
export default useLabel;
