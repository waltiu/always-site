import type { FC } from "react";
import { useState } from "react";
import { message, Popover, Popconfirm } from "antd";
import {
  LinkOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  FolderOutlined,
  FolderOpenOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";
import Image from "compoments/Image";
import defaultImg from "static/images/site.svg";
import classNames from "classnames";
import { copyText } from "util/index";
import type { TagType, LabelType, SetLabelMethodType } from "types/label";
import TagModal from "../Common/TagModal";
import TagItem from "../Tag";
type TagPropsType = {
  data: TagType;
  currentLabel: LabelType;
  labels: LabelType[];
  operLabel: SetLabelMethodType;
};

const Tag: FC<TagPropsType> = (props) => {
  const { data, currentLabel, labels, operLabel } = props;
  const [isChecked, setIscChecked] = useState(false);
  const [tagModalVisible, setTagModalVisible] = useState(false);
  const [isAddChild, setIsAddChild] = useState(false);
  const [childTagVisible, setChildTagVisible] = useState(false);
  const { index: labelIndex } = currentLabel;
  const deleteTag = () => {
    const newLabels = [...labels];
    const tagIndex = Number(data.tagIndex);
    newLabels[labelIndex as number].tags.splice(tagIndex, 1);
    operLabel(newLabels);
    message.success("已删除!");
  };
  const renderContent = () => {
    return (
      <div className={styles["tag-oper"]}>
        <div className={styles.module}>
          <div className={styles.item} onClick={() => copyText(data.link)}>
            <LinkOutlined />
            <span>复制链接</span>
          </div>
        </div>
        <div className={styles.module}>
          <div
            className={styles.item}
            onClick={() => {
              setTagModalVisible(true);
              setIsAddChild(false);
            }}
          >
            <EditOutlined />
            <span>编辑</span>
          </div>
          <Popconfirm
            title="确认删除该网址么?"
            onConfirm={() => deleteTag()}
            okText="确认"
            cancelText="取消"
          >
            <div className={styles.item}>
              <DeleteOutlined />
              <span>删除</span>
            </div>
          </Popconfirm>
        </div>

        {!data.hasOwnProperty("tagChildIndex") && (
          <div
            className={styles.module}
            onClick={() => {
              setTagModalVisible(true);
              setIsAddChild(true);
            }}
          >
            <div className={styles.item}>
              <PlusOutlined />
              <span>添加子网址</span>
            </div>
          </div>
        )}
      </div>
    );
  };
  return (
    <div
      className={classNames(styles.tag, isChecked ? styles["is-checked"] : "")}
    >
      <Image
        src={
          (data.childs ? (
            childTagVisible ? (
              <FolderOpenOutlined />
            ) : (
              <FolderOutlined />
            )
          ) : (
            ""
          )) ||
          data.icon ||
          defaultImg
        }
        alt=""
        width={20}
        height={20}
      />
      <div className={styles.name}>
        <a href={data.link} target="_blank" rel="noreferrer">
          {data.name}
        </a>
      </div>
      {data.childs && (
        <Popover
          placement="top"
          trigger="click"
          onVisibleChange={(visible) => {
            setChildTagVisible(visible);
          }}
          content={
            <div>
              {data.childs.map((item: TagType, idx: number) => (
                <TagItem
                  {...props}
                  key={item.id}
                  data={{
                    ...item,
                    tagIndex: data.tagIndex,
                    tagChildIndex: idx,
                  }}
                />
              ))}
            </div>
          }
        >
          <div
            className={styles["tag-more"]}
            onClick={() => {
              setChildTagVisible(!childTagVisible);
            }}
          >
            {childTagVisible ? <FolderOpenOutlined /> : <FolderOutlined />}
          </div>
        </Popover>
      )}
      <Popover
        overlayClassName={styles["tag-popover"]}
        content={renderContent()}
        placement={"bottom"}
        onVisibleChange={(visible) => {
          setIscChecked(visible);
        }}
      >
        <div className={styles.oper}>...</div>
      </Popover>
      {tagModalVisible && (
        <TagModal
          currentLabel={currentLabel}
          visible={tagModalVisible}
          onCancel={() => {
            setTagModalVisible(false);
          }}
          title={isAddChild ? "添加子网址" : ""}
          isAddChild={isAddChild}
          labels={labels}
          operLabel={operLabel}
          record={data}
        />
      )}
    </div>
  );
};
export default Tag;
