import { TagType } from "types/label";

export const queryBaidunewsHotList = async () => {
  const result = await fetch("http://api.5cv.top/getnewsHotList");
  return result;
};
export const uuid = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
