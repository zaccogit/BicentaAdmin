import React, { useEffect, useRef, useState } from "react";
import { generateUniqueId } from "../../utils/helpers";
import axios from "axios";
import { ToastCall } from "@/utils/GeneralMetods";
import { useStore } from "@/context/storeContext/StoreProvider";

const Modal = ({ modal, setModal, headerTitle }:any) => {
  const [selectedImage, setSelectedImage] = useState();
  const [name, setName] = useState("");
  const [loadin, setloadin] = useState(false)
  const [category, setCategory] = useState("");
  const { Intentions, setIntentions } = useStore()
  const inputRef = useRef<HTMLDialogElement | null>(null);

  const onSubmitData = async () => {
    setloadin(true)
    try {
      const response = await axios.post("/api/intention", {
        name
      },{});
      console.log(response.data);
      
      setIntentions([...Intentions,response.data])
     
      ToastCall("success", "Intencion creada con exito ");
      handleSubmit()
    } catch (error: any) {
      console.log(error,"aqui");
      if (error.status === 400) {
        ToastCall("error", "Usuario o Contraseña invalida");
        return;
      }
      ToastCall("error", error);
    }finally{
      setloadin(false)
    }
  };

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
            <p className="text-lg font-bold text-center text-white">{headerTitle}</p>
            <button
              className="close-button absolute top-2 right-2 w-10 h-10 bg-error rounded-2xl"
              onClick={() => handleSubmit()}
            >
              <span className="text-white font-bold">X </span>
            </button>
          </div>

          <div className="modal-content px-6 py-4 space-y-4">
            <div className="flex justify-between items-center ">
              <label className="font-semibold pr-2">Nombre</label>
              <input
                className="input input-bordered w-full input-primary"
                type="text"
                placeholder="Saludo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className=" flex justify-center">
              <button className={loadin ?"btn btn-lg btn-primary font-bold loading" : "btn btn-lg btn-primary  font-bold"}  disabled={!name} onClick={onSubmitData}>
                Crear
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

export default Modal;
