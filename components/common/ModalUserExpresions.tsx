"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { contieneLetras, eliminarObjetosDuplicados, generateUniqueId } from "../../utils/helpers";
import {
  Intention,
  UserExpresion,
  UserExpresions,
} from "@/lib/interface.intentions";
import axios from "axios";
import { ToastCall } from "@/utils/GeneralMetods";
import { useStore } from "@/context/storeContext/StoreProvider";
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";

type ModalUserExpresion = {
  modal: boolean;
  setModal: (e: boolean) => void;
  headerTitle: string;
  data?: Intention;
};

const ModalUserExpresions = ({
  modal,
  setModal,
  headerTitle,
  data,
}: ModalUserExpresion) => {
  const [selectedImage, setSelectedImage] = useState();
  const [name, setName] = useState("");
  const [loadin, setloadin] = useState(false);
  const [loadinAdd, setloadinAdd] = useState(false);
  const inputRef = useRef<HTMLDialogElement | null>(null);
  const [dataCopy, setdataCopy] = useState<UserExpresions | undefined>();
  const [dataCopy2, setdataCopy2] = useState<UserExpresions | undefined>();
  const { Intentions, setIntentions, UserExpresions, setUserExpresions } = useStore();

  const validate = useMemo(
    () => JSON.stringify(dataCopy)===JSON.stringify(data?.userExpresions),
    [dataCopy, data]
  );

  const deleteExpresion = (e: UserExpresion) => {
    if(dataCopy2)
      
    if(e.id && !contieneLetras(e.id?.toString())){
      setdataCopy2([e,...dataCopy2]);
    }
    const expresion = dataCopy?.findIndex((ele) => ele.id === e.id) as number;

    if (expresion != -1 && dataCopy) {
      const info = [...dataCopy];
      info.splice(expresion, 1);
      setdataCopy(info);
    }
  };
  const deleteExpresionDef = async (e: UserExpresion) => {
    try {
      const response = await axios.delete("/api/expresion/"+e.id);

      dataCopy2 && setUserExpresions(dataCopy2.filter(ele => e.id !== ele.id))
      dataCopy2 && setdataCopy2(dataCopy2.filter(ele => e.id !== ele.id))

      ToastCall("success", "Eliminado guardados con exito ");
    } catch (error: any) {
      console.log(error, "aqui");
      if (error.status === 400) {
        ToastCall("error", "Usuario o Contraseña invalida");
        return;
      }
      ToastCall("error", error);
    } finally {
      setloadin(false);
    }
  };
  
  const addExpresion = async () => {
    setloadinAdd(true);
    try {
      if (!name) {
        return;
      }

      const response = await axios.post("/api/expresion/validate", {
        name,
      });

      if (response.data.length) {
        console.log(response);
        ToastCall(
          "warning",
          "La palabra " + '"' + name + '"' + "  ya esta usada. /n"
          +(response.data.intents.length && "La Interacción es" + response.data[0].intents.name )
        );
        return;
      }

      if (dataCopy) {
        const obj = {
          id: generateUniqueId(),
          value: name.trim(),
          priority: "LOW",
          intents: data ? [data] : [],
        };
        setdataCopy([...dataCopy, obj]);
        setName("");
      }
    } catch (error) {
    } finally {
      setloadinAdd(false);
    }
  };

  const addExpresionOld = async (e:UserExpresion) => {
    try {
      if (dataCopy) {
        setdataCopy([...dataCopy, e]);
        setdataCopy2(dataCopy2?.filter(ele => ele.id !== e.id))
      }
    } catch (error) {
    }
  };

  const onSubmitData = async () => {
    setloadin(true);
    try {
      const response = await axios.post("/api/expresion", {
        intention: data,
        userExpresions: data?.userExpresions,
        userExpresionsNew: dataCopy,
      });

      setIntentions(
        Intentions.map((objeto) => {
          if (objeto.id === response.data.id) {
            return response.data;
          }
          return objeto;
        })
      );
      setdataCopy(response.data?.userExpresions);

      dataCopy2 && setUserExpresions(eliminarObjetosDuplicados(dataCopy2))

      ToastCall("success", "Estimulos guardados con exito ");
    } catch (error: any) {
      console.log(error, "aqui");
      if (error.status === 400) {
        ToastCall("error", "Usuario o Contraseña invalida");
        return;
      }
      ToastCall("error", error);
    } finally {
      setloadin(false);
    }
  };

  const handleSubmit = () => {
    setModal(false);
    setName("");
    inputRef.current && inputRef.current.classList.remove("modal-open");
  };

  useEffect(() => {
    if (modal) {
      inputRef.current && inputRef.current.classList.add("modal-open");
      setdataCopy(data?.userExpresions);
      setdataCopy2(UserExpresions)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modal, data]);

  return (
    <>
      <dialog
        ref={inputRef}
        className="fixed inset-0 flex items-center justify-center z-50 modal"
      >
        <div className="modal-overlay"></div>
        <div className="modal-container bg-white mx-auto rounded-lg shadow-lg overflow-y-auto w-[60vw] h-[70vh]">
          <div className="modal-header bg-primary relative py-2 h-14">
            <p className="text-lg font-bold text-center text-white">
              {headerTitle}
            </p>
            <button
              className="close-button absolute top-2 right-2 w-10 h-10 bg-error rounded-2xl"
              onClick={() => handleSubmit()}
            >
              <span className="text-white font-bold">X </span>
            </button>
          </div>

          <div className="modal-content flex flex-row px-6 py-4 space-y-4 h-[calc(100%-3.5rem)]">
            <div className=" flex w-1/3 border-r-2">
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Acción</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dataCopy2 &&
                      dataCopy2.map((e) => (
                        <tr key={e.id}>
                          <td>{e.value}</td>
                          <td>
                            <div className="join">
                              <button className="btn btn-xs btn-success join-item" onClick={() => addExpresionOld(e)}><IoMdAdd /></button>
                              <button className="btn btn-error btn-xs join-item" onClick={() => deleteExpresionDef(e)}><MdDelete /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className=" relative flex flex-col w-2/3 pl-10 gap-2">
              <div className="join flex  justify-between items-center gap-1 ">
                <label className="font-semibold pr-2">Estimulos</label>
                <input
                  className="input input-bordered w-full input-primary"
                  type="text"
                  placeholder='"Hola", "¿Qué tal?", "Epa"'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <button
                  className={
                    loadinAdd ? " btn btn-success loading" : " btn btn-success "
                  }
                  onClick={addExpresion}
                >
                  <span className=" font-semibold text-xl ">+</span>
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {dataCopy &&
                  dataCopy.map((e) => (
                    <div
                      key={e.id}
                      className=" flex border border-primary p-2 gap-2 rounded-xl"
                    >
                      <button
                        className=" btn btn-sm btn-error"
                        onClick={() => deleteExpresion(e)}
                      >
                        x
                      </button>
                      <span>{e.value}</span>
                    </div>
                  ))}
              </div>
              <div className="flex justify-center absolute bottom-2 right-2">
                <button
                  className={
                    loadin
                      ? "btn btn-lg btn-primary font-bold loading"
                      : "btn btn-lg btn-primary  font-bold"
                  }
                  onClick={onSubmitData}
                  disabled={validate}
                >
                  Guardar
                </button>
              </div>
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

export default ModalUserExpresions;
