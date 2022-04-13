import useLabel from "composables/useLabel";
import Tag from "./Tag";
import { HOT_LABEL, OTHER_LABEL } from "static/constant";
import { TagType, LabelType } from "types/label";
import Image from "../Image";
import styles from "./index.module.scss";
import CardStyle from "styles/card.module.scss";
import hotImg from "static/images/hot.svg";
import labelDaragImg from "static/images/label-drag.svg";
import classNames from "classnames";
import { ReactSortable } from "react-sortablejs";
const Label = () => {
  const [labels, operLabel] = useLabel();
  return (
    <div>
      {labels?.length && (
        <ReactSortable
          group="label"
          animation={200}
          delay={2}
          delayOnTouchOnly={true}
          handle=".label-drag"
          list={labels}
          setList={(data) => {
            operLabel(data, "sortLabel");
          }}
          filter=".is-hot"
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
                    <div
                      className={classNames(styles["label-drag"], "label-drag")}
                    >
                      <Image src={labelDaragImg} alt="" />
                    </div>
                  </>
                )}

                <div className={styles.tags}>
                  <ReactSortable
                    group="tag"
                    animation={200}
                    delay={2}
                    list={tags}
                    delayOnTouchOnly={true}
                    setList={(data) => {
                      operLabel(
                        {
                          type,
                          data,
                        },
                        "sortTag"
                      );
                    }}
                  >
                    {tags.map((item: TagType, index: number) => (
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
