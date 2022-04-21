// components/Image.js
import NextImage from "next/image";
import { useState } from "react";
import defaultImg from 'static/images/site.svg'

const customLoader = ({ src }) => {
  return src
}

export default function Image(props) {
  const [src,setSrc]=useState(props.src)
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