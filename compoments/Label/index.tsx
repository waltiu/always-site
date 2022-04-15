import useLabel from "composables/useLabel";
import Tag from "./Tag";
import { HOT_LABEL, OTHER_LABEL } from "static/constant";
import { TagType, LabelType,SortQueueType } from "types/label";
import LabelTitle from "./Title";
import Image from "../Image";
import styles from "./index.module.scss";
import CardStyle from "styles/card.module.scss";
import hotImg from "static/images/hot.svg";
import classNames from "classnames";
import LabelOperCard from "./OperCard";
import { ReactSortable } from "react-sortablejs";


let sortQueue:SortQueueType=[]  // 跨label拖拽进行，将多个list统一更新

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
            // 热门禁止拖拽
            if(data[0].type===HOT_LABEL){
             operLabel(data);    
            }
          }}
          filter=".is-hot"
        >
          {(labels || []).map((label: LabelType, index: number) => {
            const { type = OTHER_LABEL, tags } = label;
            return (
              <div
                key={type}
                className={classNames(
                  styles["label-box"],
                  CardStyle.card,
                  type === HOT_LABEL ? "is-hot" : "",
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
                  <LabelTitle label={label} labels={labels} operLabel={operLabel}/>
                
                    <div className={styles.oper}>
                    <LabelOperCard/>
                  </div>
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
                      <div key={`${item.name}-${index}`} >
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
