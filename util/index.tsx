import type { LabelType,TagType } from "types/label";
import { message } from "antd";
const urlReg=/^((https|http)?:\/\/)[^\s]+/;

export const queryBaidunewsHotList = async () => {
  const result = await fetch("http://api.5cv.top/getnewsHotList");
  return result;
};
export const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

export const uniqueKey=(arr: any[],key: string)=> {
  const map = new Map()
  arr.forEach((item)=>{
    if (!map.has(item[key])){
      map.set(item[key],item)
    }
  })
  return Array.from(map.values())
}

export const uniqueTags=(data: LabelType[])=>{
  
    return data.map((item: LabelType)=>{
      return {
        ...item,
        tags:uniqueKey(item.tags,'id').filter((tag: TagType)=>tag.link||tag.isFolder)
      }
    })
}



export const copyText = (text: string) => {
  if (text) {
    const oInput = document.createElement('input');
    oInput.value = text;
    document.body.appendChild(oInput);
    oInput.select(); // 选择对象
    document.execCommand('Copy'); // 执行浏览器复制命令
    message.success(`已复制链接,快分享给你的朋友吧!`);
    oInput.className = 'oInput';
    oInput.style.display = 'none';
    document.body.removeChild(oInput);
  } 
};


export const validateIsSite =(tag: TagType,isFolder: boolean)=>{
  return (isFolder?true:urlReg.test(tag.link))&&tag.name
}


export const isChildTag=(data: TagType)=>{
  return data.hasOwnProperty("tagChildIndex")
}