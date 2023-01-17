import React, { useState } from "react";
import { useCallback } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import images from "./imageList";

const slide = () => {
  const timeRef=useRef(null)
  const [curIndex, setCurIndex] = useState(0);

  function prev() {
    const isFirstSlide = curIndex === 0;
    const newIndex = isFirstSlide ? images.length - 1 : curIndex - 1;
    setCurIndex(newIndex);
  }

  const next = useCallback(()=> {
    const isLastSlide = curIndex === images.length - 1;
    const newIndex = isLastSlide ? 0 : curIndex + 1;
    setCurIndex(newIndex);
  },[curIndex,images])

  useEffect(()=>{
    if(timeRef.current){
      clearTimeout(timeRef.current)
    }
    
    timeRef.current = setTimeout(()=>{
      next();
    },3000)

    return ()=> clearTimeout(timeRef.current)

  },[next])

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="slide">
            <img src={images[curIndex].link} className="slide-image" alt="" />
          </div>
          <div className="btn btn-next" onClick={next}>
            Next
          </div>
          <div className="btn btn-prev" onClick={prev}>
            prev
          </div>
        </div>
      </div>
    </>
  );
};

export default slide;
