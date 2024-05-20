import React, { useEffect, useRef, useState } from "react";
import { generateUniqueId } from "../../utils/helpers";
import axios from "axios";
import { ToastCall } from "@/utils/GeneralMetods";
import { useStore } from "@/context/storeContext/StoreProvider";
import { MdDelete } from "react-icons/md";
import { UserResponse } from "@/lib/interface.intentions";

type ModalEditText = {
  modal: boolean;
  setModal: (e: boolean) => void;
  data?:UserResponse
  setData:(e:UserResponse) => void
};

const ModalEditText = ({ modal, setModal, data , setData}:ModalEditText) => {
  const [selectedImage, setSelectedImage] = useState();
  const [name, setName] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [Botones, setBotones] = useState<string[]>([]);
  const [loadin, setloadin] = useState(false)
  const [category, setCategory] = useState("");
  const { Intentions, setIntentions } = useStore()
  const inputRef = useRef<HTMLDialogElement | null>(null);

  /* const onSubmitData = async () => {
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
  }; */

  const handleSubmit = () => {
    setModal(false);
    inputRef.current && inputRef.current.classList.remove("modal-open");
  };

  const addButton = () => {

    setBotones([...Botones,buttonText])
    setButtonText('')

  }
  const deleteButton = (index:number) => {
    const buttonDelete = [...Botones]
    buttonDelete.splice(index, 1)
    setBotones(buttonDelete)
  }

  const cambiar = () => {
    if(data){

      setData({...data,valueResponse:[name,...Botones].join("&")})
      handleSubmit()
    }
  }

  useEffect(() => {
    if (modal) {
      inputRef.current && inputRef.current.classList.add("modal-open");
    }
    if(data){

      const nameCopy = data?.valueResponse.split('&')[0]
      const dataCopy = data?.valueResponse.split('&')
      dataCopy.shift()
      console.log(data, "ESTE");
      setName(nameCopy)
      setBotones(dataCopy)
    }

  }, [modal]);

  return (
    <>
      <dialog ref={inputRef} className="fixed inset-0 flex items-center justify-center z-50 modal">
        <div className="modal-overlay"></div>
        <div className="modal-container bg-white mx-auto rounded-lg shadow-lg overflow-y-auto w-[600px]">
          <div className="modal-header bg-primary relative py-2 h-14">
            <p className="text-lg font-bold text-center text-white">Editar texto respuesta</p>
            <button
              className="close-button absolute top-2 right-2 w-10 h-10 bg-error rounded-2xl"
              onClick={() => handleSubmit()}
            >
              <span className="text-white font-bold">X </span>
            </button>
          </div>

          <div className="modal-content px-6 py-4 space-y-4">
            <textarea
              className="textarea textarea-primary w-full"
              rows={4}
              value={name}
              placeholder="Hola, soy tu asistente virtual, ¿ En qué puedo ayudarte?"
              onChange={(e) => {
                  setName(e.target.value);
              }}
            ></textarea>
            <ul className=" flex gap-2 flex-col">
              {
                Botones.map((e, index) => <li key={index} className=" flex gap-2">
                  <div className=" bg-gray-400 p-2 w-fit rounded-lg text-center">
                  {e}
                  </div>
                  <button className=" btn btn-error" onClick={() => deleteButton(index)}><MdDelete /></button>
                </li>)
              }

            </ul>
            <div className=" flex justify-between">
              <div className=" flex gap-2">
              <input
                className="input input-bordered w-full input-primary"
                type="text"
                placeholder="Saludo"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
              />
              <button className={"btn btn-primary  font-bold"}  disabled={!buttonText} onClick={addButton} >
                Crear boton
              </button>
              </div>
              <button className={loadin ?"btn btn-success font-bold loading" : "btn  btn-success  font-bold"}  disabled={!name} onClick={cambiar}>
                Guardar
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

export default ModalEditText;
