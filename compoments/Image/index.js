// components/Image.js
import NextImage from "next/image";
import { useEffect, useState } from "react";
import defaultImg from 'static/images/site.svg'

const customLoader = ({ src }) => {
  return src
}

export default function Image(props) {
  const [src,setSrc]=useState(props.src)
  useEffect(()=>{
    setSrc(props.src)
  },[props.src])
  return (
    <NextImage
      {...props}
      src={src}
      onError={()=>{
        setSrc(defaultImg)
      }}
      loader={customLoader}
    />
  );
}