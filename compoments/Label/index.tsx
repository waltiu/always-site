import useLabel from "composables/useLabel";
import Tag from "./Tag";
import { HOT_LABEL, OTHER_LABEL } from "static/constant";
import { TagType, LabelType,sortQueueType } from "types/label";
import Image from "../Image";
import styles from "./index.module.scss";
import CardStyle from "styles/card.module.scss";
import hotImg from "static/images/hot.svg";
import classNames from "classnames";
import { ReactSortable } from "react-sortablejs";


let sortQueue:sortQueueType=[]  // 跨label拖拽进行，将多个list统一更新

const Label = () => {
  const [labels, operLabel] = useLabel();
  return (
    <div>
      {labels?.length && (
        <ReactSortable
          group={{name: 'labels', pull: true}}
          animation={200}
          delay={2}
          delayOnTouchOnly={true}
          forceFallback={true}
          list={labels}
          setList={(data) => {
            operLabel(data, "sortLabel");
          }}
        >
          {(labels || []).map((label: LabelType, index: number) => {
            const { type = "其他", tags } = label;
            return (
              <div
                key={type}
                className={classNames(
                  styles["label-box"],
                  CardStyle.card,
                  styles[type === HOT_LABEL ? "is-hot" : ""]
                )}
              >
                {type === HOT_LABEL ? (
                  <>
                    <div className={styles.hot}>
                      <Image src={hotImg} alt="" />
                    </div>
                  </>
                ) : (
                  <>
                    <div className={styles.title}>{type || OTHER_LABEL}</div>
                  </>
                )}

                <div className={styles.tags}>
                  <ReactSortable
                    group={{name: 'tags', pull: true}}
                    animation={200}
                    delay={2}
                    list={tags||[]}
                    forceFallback={true}
                    delayOnTouchOnly={true}
                    onEnd={()=>{
                      operLabel(sortQueue,'sortTag')
                    }}
                    onStart={()=>{
                      sortQueue=[]
                    }}
                    setList={(data,_,{dragging}) => {
                      if(dragging&&JSON.stringify(dragging.props.list)!==JSON.stringify(data)){
                        sortQueue.push({
                          index,
                          data
                        })
                      }
                    }}
                  >
                    {(tags||[]).map((item: TagType, index: number) => (
                      <div key={item.name}>
                        <Tag key={item.name} data={item} />
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
