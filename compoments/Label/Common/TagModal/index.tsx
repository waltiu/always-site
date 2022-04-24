import { Modal, Input, Button, message } from "antd";
import type { FC } from "react";
import { useState } from "react";
import { uuid, validateIsSite } from "util/index";
import type { TagType, LabelType, SetLabelMethodType } from "types/label";
import Image from "compoments/Image";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

type TagModalProps = {
  currentLabel: LabelType;
  labels: LabelType[];
  title?: string;
  record?: TagType | null;
  visible: boolean;
  isAddChild?: boolean;
  isChildTag?: boolean;
  onCancel: () => void;
  operLabel: SetLabelMethodType;
};
const initialSites = {
  id: uuid(),
  name: "",
  link: "",
  icon: "",
};

const TagModal: FC<TagModalProps> = ({
  visible,
  record,
  title,
  labels,
  isAddChild,
  isChildTag,
  currentLabel,
  onCancel,
  operLabel,
}) => {
  const { index: labelIndex } = currentLabel;
  const [site, setNewSite] = useState<TagType>(
    isAddChild ? initialSites : record || initialSites
  );
  const changeAddress = (url: string) => {
    site.link = url;
    setNewSite(site);
  };
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const changeIcon = () => {};

  const changeName = (name: string) => {
    site.name = name;
    setNewSite(site);
  };

  const addTag = (continuer: boolean) => {
    const tagIndex =record?.tagIndex as number;
    const tagChildIndex =record?.hasOwnProperty('tagChildIndex')?record?.tagChildIndex:null
    if (validateIsSite(site)) {
      const newLabels = [...labels];
      if (isAddChild) {
        if (!newLabels[labelIndex as number].tags[tagIndex]!.childs) {
          newLabels[labelIndex as number].tags[tagIndex]!.childs = [];
          // @ts-ignore
          newLabels[labelIndex as number].tags[tagIndex].childs.push(site);
        } else {
          // @ts-ignore
          newLabels[labelIndex as number].tags[tagIndex].childs.push(site);
        }
      } else if (record) {
        console.log(tagChildIndex,tagIndex,'0000')
        if (tagChildIndex) {
          // @ts-ignore
          newLabels[labelIndex as number].tags[tagIndex].childs[tagChildIndex] =
            site;
        } else {
          newLabels[labelIndex as number].tags[tagIndex] = site;
        }
      } else {
        if (isChildTag) {
          // @ts-ignore
          newLabels[labelIndex as number].tags[tagIndex].childs.push(site);
        } else {
          newLabels[labelIndex as number].tags.push(site);
        }
      }
      operLabel(newLabels);
      if (continuer) {
        setNewSite(
          JSON.parse(
            JSON.stringify({
              ...initialSites,
              id: uuid(),
            })
          )
        );
      } else {
        message.success("操作成功!");
        onCancel();
      }
    } else {
      message.error("请输入合法的url和名称！");
    }
  };
  return (
    <div>
      <Modal
        title={title || (record ? "修改网址" : "添加网址")}
        visible={visible}
        footer={null}
        destroyOnClose={true}
        onCancel={onCancel}
        className={styles["tag-modal"]}
      >
        <>
          <div key={site.id}>
            <div className={styles.name}>
              <div className={styles.icon}>
                {site.icon ? (
                  <Image
                    src={site.icon || "./"}
                    alt=""
                    width="16"
                    height="16"
                  />
                ) : (
                  <UploadOutlined />
                )}
              </div>
              <Input
                defaultValue={site.name}
                className={styles.input}
                placeholder="网站名称"
                onChange={(e) => {
                  changeName(e.target.value);
                }}
              />
            </div>
            <Input
              defaultValue={site.link}
              className={styles.input}
              placeholder="网站地址，如：http://www.baidu.com"
              onChange={(e) => {
                changeAddress(e.target.value);
              }}
            />
          </div>
          <div className={styles.oper}>
            {(!record || isAddChild) && (
              <Button
                onClick={() => {
                  addTag(true);
                }}
              >
                保存后继续添加
              </Button>
            )}
            <Button
              type="primary"
              onClick={() => {
                addTag(false);
              }}
            >
              保存
            </Button>
          </div>
        </>
      </Modal>
    </div>
  );
};

export default TagModal;
