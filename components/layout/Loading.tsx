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
      </div>
    </>
  );
}

export default Loading;
