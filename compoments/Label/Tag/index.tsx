import type { FC } from "react";
import { useState } from "react";
import { Popover, Popconfirm } from "antd";
import folderSvg from "static/images/folder.svg";
import folderOpenSvg from "static/images/folder-open.svg";
import {
  LinkOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  FileZipOutlined,
} from "@ant-design/icons";
import styles from "./index.module.scss";
import Image from "compoments/Image";
import defaultImg from "static/images/site.svg";
import classNames from "classnames";
import { copyText, isChildTag } from "util/index";
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
  const {
    tagIndex,
    tagChildIndex,
    link,
    icon,
    name,
    childs = [],
    isFolder,
  } = data;
  const [isChecked, setIscChecked] = useState(false);
  const [tagModalVisible, setTagModalVisible] = useState(false);
  const [isAddChild, setIsAddChild] = useState(false);
  const [childTagVisible, setChildTagVisible] = useState(false);
  const { index: labelIndex } = currentLabel;
  const deleteTag = () => {
    if (data.hasOwnProperty("tagChildIndex")) {
      operLabel("deleteChildTag", "", labelIndex, tagIndex, tagChildIndex);
    } else {
      operLabel("deleteTag", "", labelIndex, tagIndex);
    }
  };
  const renderContent = () => {
    return (
      <div className={styles["tag-oper"]}>
        {!isFolder && (
          <div className={styles.module}>
            <div className={styles.item} onClick={() => copyText(link)}>
              <LinkOutlined />
              <span>分享链接</span>
            </div>
          </div>
        )}
        <div className={styles.module}>
          <div
            className={styles.item}
            onClick={() => {
              setTagModalVisible(true);
              setIsAddChild(false);
              setChildTagVisible(false);
            }}
          >
            <EditOutlined />
            <span>编辑</span>
          </div>
          <Popconfirm
            title="确认删除该网址么?"
            onConfirm={() => {
              deleteTag();
              setChildTagVisible(false);
            }}
            okText="确认"
            cancelText="取消"
          >
            <div className={styles.item}>
              <DeleteOutlined />
              <span>删除</span>
            </div>
          </Popconfirm>
        </div>

        <div className={styles.module}>
          {!isFolder ? (
            <>
              {isChildTag(data) ? (
                <div
                  className={styles.item}
                  onClick={() => {
                    operLabel(
                      "changeFolderToTag",
                      "",
                      labelIndex,
                      tagIndex,
                      tagChildIndex
                    );
                    setChildTagVisible(false);
                  }}
                >
                  <FileZipOutlined />
                  <span>从文件夹中移除</span>
                </div>
              ) : (
                <div
                  className={styles.item}
                  onClick={() => {
                    operLabel("changeTagToFolder", "", labelIndex, tagIndex);
                    setChildTagVisible(false);
                  }}
                >
                  <FileZipOutlined />
                  <span>To文件夹</span>
                </div>
              )}
            </>
          ) : (
            <>
              <div
                className={styles.item}
                onClick={() => {
                  setTagModalVisible(true);
                  setIsAddChild(true);
                  setChildTagVisible(false);
                }}
              >
                <PlusOutlined />
                <span>添加子网址</span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };
  return (
    <div
      className={classNames(styles.tag, isChecked ? styles["is-checked"] : "")}
    >
      <Image
        src={
          isFolder
            ? childTagVisible
              ? folderOpenSvg
              : folderSvg
            : icon || defaultImg
        }
        alt=""
        width={20}
        height={20}
        className={styles.icon}
      />
      <div className={styles.name}>
        {isFolder ? (
          <Popover
            placement="top"
            trigger="click"
            onVisibleChange={(visible) => {
              setChildTagVisible(visible);
            }}
            content={
              <div>
                {childs.map((item: TagType, idx: number) => (
                  <TagItem
                    {...props}
                    key={item.id}
                    data={{
                      ...item,
                      tagIndex: tagIndex,
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
              title={name}
            >
              {name}
            </div>
          </Popover>
        ) : (
          <a href={link} target="_blank" rel="noreferrer" title={name}>
            {name}
          </a>
        )}
      </div>
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
