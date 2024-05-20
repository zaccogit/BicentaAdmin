import React, { useEffect, useRef, useState } from "react";
import { generateUniqueId } from "../../utils/helpers";
import axios from "axios";
import { ToastCall } from "@/utils/GeneralMetods";
import { useStore } from "@/context/storeContext/StoreProvider";

type ModalSure = {
  modal: boolean;
  setModal: (e: boolean) => void;
  onSubmit: () => void;
};

const ModalSure = ({ modal, setModal,onSubmit }:ModalSure) => {
  const inputRef = useRef<HTMLDialogElement | null>(null);


  const onClickSubmit = () => {
    handleSubmit()
    onSubmit()
  }

  const handleSubmit = () => {
    setModal(false);
    inputRef.current && inputRef.current.classList.remove("modal-open");
  };

  useEffect(() => {
    if (modal) {
      inputRef.current && inputRef.current.classList.add("modal-open");
    }
    /* console.log(dataIntent.id, "ESTE");
    console.log(modal); */
  }, [modal]);

  return (
    <>
      <dialog ref={inputRef} className="fixed inset-0 flex items-center justify-center z-50 modal">
        <div className="modal-overlay"></div>
        <div className="modal-container bg-white mx-auto rounded-lg shadow-lg overflow-y-auto w-[600px]">
          <div className="modal-header bg-primary relative py-2 h-14">
            <p className="text-lg font-bold text-center text-white">¿Esta seguro?</p>
            <button
              className="close-button absolute top-2 right-2 w-10 h-10 bg-error rounded-2xl"
              onClick={() => handleSubmit()}
            >
              <span className="text-white font-bold">X </span>
            </button>
          </div>

          <div className="modal-content px-6 py-4 space-y-4">
            <h3 className="font-bold text-lg">¿Seguro quiere proseguir?</h3>
            <p className="py-4">Es probable que los cambios sean irreversibles</p>
            <div className=" flex justify-end gap-2">
              <button className={"btn btn-lg btn-primary font-bold"}  onClick={handleSubmit}>
                Cancelar
              </button>
              <button className={"btn btn-lg btn-success font-bold " }  onClick={onClickSubmit}>
                Seguro
              </button>
            </div>
          </div>
        </div>
        <style jsx>{`
          .modal-overlay {
            background-color: rgba(0, 0, 0, 0.7);
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 40;
          }

          .modal-container {
            max-width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            margin: 2rem auto;
            z-index: 50;
          }

          .modal-content {
            max-height: calc(100vh - 4rem);
          }
        `}</style>
      </dialog>
    </>
  );
};

export default ModalSure;
