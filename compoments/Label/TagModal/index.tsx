import { Modal, Tabs, Input, Button, Select } from "antd";
import { FC, useState } from "react";
import { uuid } from "util/index";
import { TagType, LabelType } from "types/label";
import Image from "compoments/Image";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";
import { HOT_LABEL, OTHER_LABEL } from "static/constant";

const { Option } = Select;

const { TabPane } = Tabs;
type TagModalProps = {
  labels: LabelType[];
  visible: boolean;
  tagModalVisibleId:string|boolean
  onCancel: () => void;
};
const initialSites = [
  {
    id: uuid(),
    name: "",
    link: "",
    icon: "",
  },
];
const TagModal: FC<TagModalProps> = ({ visible,tagModalVisibleId, labels, onCancel }) => {
  const selectLabels = labels.filter((item) => item.title !== HOT_LABEL);
  const [newSites, setNewSites] = useState<TagType[]>(initialSites);
  const [labelType, setLabelType] = useState(tagModalVisibleId);
  const add = () => {
    setNewSites(
      newSites.concat({
        id: uuid(),
        name: "",
        link: "",
        icon: "",
      })
    );
  };
  const remove = (targetKey: string) => {
    const sites = [...newSites];
    const index = newSites.findIndex((item) => item.id === targetKey);
    sites.splice(index, 1);
    setNewSites(sites);
  };
  const tagMethods = {
    add: add,
    remove: remove,
  };

  const changeAddress = (url: string, index: number) => {
    const sites = [...newSites];
    sites[index].link = url;
    setNewSites(sites);
  };
  const changeIcon = () => {};

  const changeName = (name: string, index: number) => {
    const sites = [...newSites];
    sites[index].name = name;
    setNewSites(sites);
  };

  return (
    <div>
      <Modal
        title="添加网址"
        visible={visible}
        footer={null}
        destroyOnClose={true}
        onCancel={onCancel}
      >
        <>
          <Tabs
            type="editable-card"
            onChange={() => {}}
            onEdit={(targetKey, action) => {
              tagMethods[action](targetKey as string);
            }}
          >
            {newSites.map((site, index) => (
              <TabPane tab={site.name || `新增${index + 1}`} key={site.id}>
                <div>
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
                      value={site.name}
                      className={styles.input}
                      placeholder="网站名称"
                      onChange={(e) => {
                        changeName(e.target.value, index);
                      }}
                    />
                  </div>
                  <Input
                    value={site.link}
                    className={styles.input}
                    placeholder="网站地址，如：http://www.baidu.com"
                    onChange={(e) => {
                      changeAddress(e.target.value, index);
                    }}
                  />
                  <div>
                    <Select
                      value={labelType}
                      onChange={(value) => {
                        setLabelType(value);
                      }}
                      className={styles.select}
                    >
                      {selectLabels.map((item) => {
                        return (
                          <Option value={item.id} key={item.id}>
                            {item.title || OTHER_LABEL}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                </div>
              </TabPane>
            ))}
          </Tabs>
          <div className={styles.oper}>
            <Button type="primary">保存</Button>
          </div>
        </>
      </Modal>
    </div>
  );
};

export default TagModal;
