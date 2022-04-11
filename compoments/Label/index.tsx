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
            <div       {...provided.droppableProps}
            ref={provided.innerRef}>
              {(tags || []).map(
                ([type, value]: [string, [TagType]], index: number) => {
                  return (
                    <Draggable key={type} draggableId={type} index={index}>
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
  
                            <div className={styles.tags}>
                              {value?.length &&
                                value.map((item: TagType) => (
                                  <div
                                  key={item.name}
                            
                                  >
                                  <Tag key={item.name} data={item} />
  
                                  </div>
                                ))}
                            </div>
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
