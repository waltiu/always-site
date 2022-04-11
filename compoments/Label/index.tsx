import useTag from "composables/useTag";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Tag from "./Tag";
import { sourceTypes, IS_HOT } from "static/constant";
import { TagType } from "types/label";
import Image from "../Image";
import styles from "./index.module.scss";
import CardStyle from "styles/card.module.scss";
import hotImg from "static/images/hot.svg";
import classNames from "classnames";
const Label = () => {
  const [tags, operTag] = useTag();
  return (
    <div>
      <DragDropContext
        onDragEnd={(value) => {
          console.log(value, "value");
        }}
      >
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div       
            {...provided.droppableProps}
            ref={provided.innerRef}
            >
              {(tags || []).map(
                ([type, value]: [string, [TagType]], index: number) => {
                  return (
                    <Draggable key={type} draggableId={type||'default'} index={index} isDragDisabled={type === IS_HOT }>
                      {(provided) => {
                        return (
                          <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                            key={type}
                            className={classNames(
                              styles["label-box"],
                              CardStyle.card,
                              styles[type === IS_HOT ? "is-hot" : ""]
                            )}
                          >
                            {type === IS_HOT ? (
                              <>
                                <div className={styles.hot}>
                                  <Image src={hotImg} alt="" />
                                </div>
                              </>
                            ) : (
                              <>
                                <div className={styles.title}>
                                  {sourceTypes[type as keyof typeof sourceTypes]
                                    ?.title || "其他"}
                                </div>
                                <div className={styles.oper}>11 </div>
                              </>
                            )}

                            <Droppable droppableId={type} >
                              {(provided)=>{
                                return (
                                  <div className={styles.tags}
                                  {...provided.droppableProps}
                                  ref={provided.innerRef}
                                  >
                                  {value?.length &&
                                    value.map((item: TagType,index:number) => (
                                      <div
                                      key={item.name}
                                
                                      >
                                         <Draggable draggableId={item.name} index={index} isDragDisabled={true}>
                                           {
                                             (provided)=>{
                                               console.log(provided,'provied')
                                               return (
                                                <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                >
                                                <Tag key={item.name} data={item} />
                                                </div>
                                               )
                                             }
                                           }
                                         </Draggable>
      
                                      </div>
                                    ))}
                                </div>
                                )
                              }}
                            </Droppable>
                          </div>
                        )
                      }}
                    </Draggable>
                  );
                }
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
export default Label;
