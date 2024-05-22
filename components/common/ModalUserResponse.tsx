'use client'
import React, { useEffect, useRef, useState } from "react";
import { generateUniqueId } from "../../utils/helpers";
import {info} from "../../utils/dataDummy";
import { FaVideo } from "react-icons/fa";
import { AiFillSound } from "react-icons/ai";
import { PiGifFill } from "react-icons/pi";
import Image from "next/image";
import Link from "next/link";
import { Intention, UserResponse } from "@/lib/interface.intentions";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteForever } from "react-icons/md";
import axios from "axios";
import { ToastCall } from "@/utils/GeneralMetods";
import { useRender } from "@/context/render/renderProvider";
import { useStore } from "@/context/storeContext/StoreProvider";

type ModalUserResponse = {
  modal: boolean;
  setModal: (e: boolean) => void;
  headerTitle: string;
  data?: Intention;
};

const ModalUserResponse = ({ modal, setModal, headerTitle,data }:ModalUserResponse) => {
  const [selectedImage, setSelectedImage] = useState<undefined>();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const inputRef = useRef<HTMLDialogElement | null>(null);
  const { setLoader} = useRender()
  const [Data, setData] = useState<UserResponse[]>([])
  const { Intentions, setIntentions } = useStore()

  const deleteExpresionDef = async (e: UserResponse) => {
    setLoader(true)
    try {
      const response = await axios.post("/api/response/"+e.id,{
        intention:data
      });

      setIntentions(
        Intentions.map((objeto) => {
          if (objeto.id === response.data.id) {
            return response.data;
          }
          return objeto;
        })
      );

      setData(
        Data.filter(ele => ele.id.toString() !== e.id.toString())
      )

      /* dataCopy2 && setUserExpresions(dataCopy2.filter(ele => e.id !== ele.id))
      dataCopy2 && setdataCopy2(dataCopy2.filter(ele => e.id !== ele.id)) */

      ToastCall("success", "Eliminado con exito ");
    } catch (error: any) {
      console.log(error, "aqui");
      if (error.status === 400) {
        ToastCall("error", "Usuario o Contraseña invalida");
        return;
      }
      ToastCall("error", error);
    } finally {
      setLoader(false);
    }
  };
  

  const handleSubmit = () => {
    setModal(false);
    setData([])
    inputRef.current && inputRef.current.classList.remove("modal-open");
  };

  useEffect(() => {
    if (modal) {
      setData(data?.userResponses as UserResponse[])
      inputRef.current && inputRef.current.classList.add("modal-open");
    }
    console.log(data?.id, "ESTE");
    /* console.log(modal); */
  }, [modal,data]);

  return (
    <>
      <dialog ref={inputRef} className="fixed inset-0 flex items-center justify-center z-50 modal">
        <div className="modal-overlay"></div>
        <div className="modal-container bg-white mx-auto rounded-lg shadow-lg overflow-y-auto w-11/12 h-[90vh] max-w-5xl relative">
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
            <div className="flex flex-wrap gap-4">
              {Data.map((e) => (
                <div key={e.id} className="card w-64 bg-base-100 shadow-xl relative">
                   <button
                  className=" btn btn-error absolute right-2"
                  onClick={() => deleteExpresionDef(e)}
                >
                  <MdDeleteForever size={24} />
                </button>
                  <figure>
                    {e.multimediaUrl && <Image src={e.multimediaUrl} alt="Shoes" width={1080} height={1080}/>}
                    
                  </figure>
                  <div className="card-body ">
                    <p>{e.valueResponse.slice(0,60)}...</p>
                    <div className="card-actions justify-between items-center">
                      <div className=" flex gap-3 items-center">
                        {e.multimediaVoiceUrl && <AiFillSound size={24} />}
                        {e.multimediaVideoUrl && <FaVideo size={28}/>}
                        {e.saraAnimationUrl && <PiGifFill size={28} />}
                      </div>

                      <Link href={`Response/${data?.id}/${e.id}`} className="btn btn-info font-bold">Editar</Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className=" absolute bottom-2 right-2 tooltip" data-tip="crear respuesta">
            <Link href={`Response/${data?.id}`} className=" btn btn-lg btn-success btn-circle " ><IoMdAdd size={24} /></Link>
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

export default ModalUserResponse;
