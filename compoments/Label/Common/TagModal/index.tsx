import { Modal, Input, Button, message } from "antd";
import { FC, useState } from "react";
import { uuid,validateIsSite } from "util/index";
import { TagType, LabelType, SetLabelMethodType } from "types/label";
import Image from "compoments/Image";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./index.module.scss";

type TagModalProps = {
  currentLabel: LabelType;
  labels: LabelType[];
  title?: string;
  record?: TagType;
  visible: boolean;
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
  currentLabel,
  onCancel,
  operLabel,
}) => {
  const { index:labelIndex } = currentLabel;
  const [site, setNewSite] = useState<TagType>(initialSites);
  const changeAddress = (url: string) => {
    site.link = url;
    setNewSite(site);
  };
  const changeIcon = () => {};

  const changeName = (name: string) => {
    site.name = name;
    setNewSite(site);
  };

  const addTag=(continuer:boolean)=>{
    if(validateIsSite(site)){
      const newLabels=[...labels]
      newLabels[labelIndex as number ].tags.push(site)
      console.log(newLabels,'newlabels')
      operLabel(newLabels)
      if(continuer){
        setNewSite(JSON.parse(JSON.stringify({
          ...initialSites,
          id:uuid()
        })))
      }else{
        onCancel()
      }
    }else{
      message.error('请输入合法的url和名称！')
    }

  }
  console.log(site,'site')
  return (
    <div>
      <Modal
        title={title || record ? "修改网址" : "添加网址"}
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
            <Button onClick={()=>{addTag(true)}}>保存后继续添加</Button>
            <Button type="primary" onClick={()=>{addTag(false)}}>保存</Button>
          </div>
        </>
      </Modal>
    </div>
  );
};

export default TagModal;
