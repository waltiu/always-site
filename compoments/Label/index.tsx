import useLabel from "composables/useLabel";
import { useState } from "react";
import Tag from "./Tag";
import { HOT_LABEL, OTHER_LABEL } from "static/constant";
import { TagType, LabelType, SortQueueType } from "types/label";
import LabelTitle from "./Title";
import Image from "../Image";
import styles from "./index.module.scss";
import CardStyle from "styles/card.module.scss";
import hotImg from "static/images/hot.svg";
import classNames from "classnames";
import Handle from "./Handle";
import TagModal from "./Common/TagModal";

import { ReactSortable } from "react-sortablejs";

let sortQueue: SortQueueType = []; // 跨label拖拽进行，将多个list统一更新

const filterDragItem = ".is-hot"; // 最热特殊标记，并禁止操作

const Label = () => {
  const [labels, operLabel] = useLabel();
  const [isOperingId, setIsOperingId] = useState<null | string>(null);

  return (
    <div>
      {labels?.length && (
        <ReactSortable
          group={{ name: "labels", pull: true }}
          animation={200}
          delay={2}
          delayOnTouchOnly={true}
          forceFallback={true}
          list={labels}
          handle=".oper"
          setList={(data) => {
            // 热门禁止拖拽
            if (data[0].title === HOT_LABEL) {
              operLabel(data);
            }
          }}
          filter={filterDragItem}
        >
          {(labels || []).map((label: LabelType, index: number) => {
            const { title = OTHER_LABEL, tags, id } = label;
            const currentLabel={...label,index}
            return (
              <div
                key={id}
                className={classNames(
                  styles["label-box"],
                  CardStyle.card,
                  title === HOT_LABEL ? filterDragItem : "",
                  styles[title === HOT_LABEL ? filterDragItem : ""]
                )}
              >
                {title === HOT_LABEL ? (
                  <>
                    <div className={styles.hot}>
                      <Image src={hotImg} alt="" />
                    </div>
                  </>
                ) : (
                  <>
                    <LabelTitle
                      label={label}
                      labels={labels}
                      operLabel={operLabel}
                    />

                    <div className={classNames(styles.oper, "oper")}>
                      <Handle
                        currentLabel={currentLabel}
                        labels={labels}
                        index={index}
                        isOpen={isOperingId == id}
                        setIsOperingId={() => {
                          setIsOperingId(id === isOperingId ? null : id);
                        }}
                        operLabel={operLabel}
                      />
                    </div>
                  </>
                )}

                <div className={styles.tags}>
                  <ReactSortable
                    group={{ name: "tags", pull: true }}
                    animation={200}
                    delay={2}
                    list={tags || []}
                    forceFallback={true}
                    delayOnTouchOnly={true}
                    onEnd={() => {
                      operLabel(sortQueue, "sortTag");
                    }}
                    onStart={() => {
                      sortQueue = [];
                    }}
                    setList={(data, _, { dragging }) => {
                      if (
                        dragging &&
                        JSON.stringify(dragging.props.list) !==
                          JSON.stringify(data)
                      ) {
                        sortQueue.push({
                          index,
                          data,
                        });
                      }
                    }}
                  >
                    {(tags || []).map((item: TagType, index: number) => (
                      <div key={`${item.id}-${index}`}>
                        <Tag data={item} />
                      </div>
                    ))}
                  </ReactSortable>
                </div>
              </div>
            );
          })}
        </ReactSortable>
      )}
  
    </div>
  );
};
export default Label;
