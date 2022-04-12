import useTag from "composables/useTag";
import Tag from "./Tag";
import { sourceTypes, IS_HOT } from "static/constant";
import { TagType } from "types/label";
import Image from "../Image";
import styles from "./index.module.scss";
import CardStyle from "styles/card.module.scss";
import hotImg from "static/images/hot.svg";
import classNames from "classnames";
import { ReactSortable } from "react-sortablejs";
const Label = () => {
  const [tags, operTag] = useTag();
  return (
    <div>
      {tags?.length && (
        <ReactSortable
          // here they are!
          group="label"
          animation={200}
          delayOnTouchStart={true}
          delay={2}
          list={tags}
          setList={(data) => {
            console.log(data);
          }}
        >
          {(tags || []).map(
            ([type, value]: [string, [TagType]], index: number) => {
              return (
                <div
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
                        {sourceTypes[type as keyof typeof sourceTypes]?.title ||
                          "其他"}
                      </div>
                      <div className={styles.oper}>11 </div>
                    </>
                  )}

                  <div className={styles.tags}>
                    <ReactSortable
                      group="tag"
                      animation={200}
                      delayOnTouchStart={true}
                      delay={2}
                      list={value}
                      setList={(data) => {
                        console.log(data);
                      }}
                    >
                      {value.map((item: TagType, index: number) => (
                        <div key={item.name}>
                          <Tag key={item.name} data={item} />
                        </div>
                      ))}
                    </ReactSortable>
                  </div>
                </div>
              );
            }
          )}
        </ReactSortable>
      )}
    </div>
  );
};
export default Label;
