import { useEffect, useState } from "react";
import { defaultTag } from "static/constant";
import { uuid, uniqueTags } from "util/index";
import type {
  TagType,
  LabelType,
  useLabelRetrunType,
  SortQueueType,
} from "types/label";
import { message } from "antd";

const CACHE_LABELS_KEY = "cache-labels";

const useLabel = (): useLabelRetrunType => {
  const [labels, setLables] = useState<LabelType[]>([]);

  const updateLabels = (newLabels: LabelType[]) => {
    setLables(uniqueTags(newLabels));
    localStorage.setItem(CACHE_LABELS_KEY, JSON.stringify(newLabels));
  };

  const deleteTag = (tag: TagType) => {};

  const changeTag = (tag: TagType) => {};

  const heatTag = (tag: TagType) => {};

  const unHeatTag = (tag: TagType) => {};

  const addLabel = (index: number) => {
    const newLabels = [...labels];
    newLabels.splice(index + 1, 0, {
      title: "新增",
      id: `label-${uuid()}`,
      tags: [],
    });
    updateLabels(newLabels);
  };

  const deleteLabel = (title: string) => {
    if(labels.length>2){
      const labelIndex = labels.findIndex((item) => item.title === title);
      const newLabels = [...labels];
      if (labelIndex > 0) {
        newLabels.splice(labelIndex, 1);
      }
      updateLabels(newLabels);
    }else{
      message.warn('请至少保留一个卡片！')
    }

  };

  const sortTag = (params: SortQueueType) => {
    if (params.length > 0) {
      if (params[0].index === 0) {
        params = [params[0]];
      }
      const newLabels = [...labels];
      params.map((item) => {
        newLabels[item.index].tags = item.data;
      });
      updateLabels(newLabels);
    }
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

  const operMethodObject = {
    deleteTag: deleteTag,
    heatTag: heatTag,
    sortTag: sortTag,
    addLabel: addLabel,
    deleteLabel: deleteLabel,
  };

  return [
    labels,
    (data, oper) => {
      if (oper && operMethodObject[oper as keyof typeof operMethodObject]) {
        // @ts-ignore
        operMethodObject[oper as keyof typeof operMethodObject](data);
      } else {
        updateLabels(data);
      }
    },
  ];
};
export default useLabel;
