'use client'
import React, { useContext,useEffect } from "react";
import { useRender } from "@/context/render/renderProvider";

function Loading() {

  const { loader } = useRender();

  useEffect(() => {
    console.log(loader);
  }, [loader])
  

  return (
    <>
      <input type="checkbox" checked={loader} disabled id="my-modal-3" className="modal-toggle" />
      <div className="modal">
      <div className="sk-chase">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
          </div>
     {/*  <div className=" w-[20vw] bg-white rounded-2xl p-10 border-primary border-2 ">
        <Lottie animationData={lotti} loop={true} width={300} height={300}/>
        <p className=" text-center text-xl font-bold animate-pulse w-full "> Tu cerebro se esta entrenando.</p>
      </div> */}
      </div>
    </>
  );
}

export default Loading;
