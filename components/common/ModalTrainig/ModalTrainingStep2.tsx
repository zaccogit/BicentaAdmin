"use client";
import ModalEditText from "@/components/common/ModalEditText";
import { useRender } from "@/context/render/renderProvider";
import { useStore } from "@/context/storeContext/StoreProvider";
import {
  Intention,
  UserExpresion,
  UserResponse,
  channelsType,
} from "@/lib/interface.intentions";
import { ToastCall } from "@/utils/GeneralMetods";
import axios from "axios";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { ChangeEvent, useEffect, useState } from "react";
import { AiFillInstagram, AiFillSound } from "react-icons/ai";
import {
  FaChrome,
  FaImage,
  FaTelegram,
  FaVideo,
  FaWhatsappSquare,
} from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { PiGifFill } from "react-icons/pi";

const initData = {
  valueResponse: "",
  priority: "LOW",
  multimedia: null,
  multimediaContentType: null,
  multimediaVoice: null,
  multimediaVoiceContentType: null,
  saraAnimation: null,
  saraAnimationContentType: null,
  isEndConversation: false,
  responseType: "QUERY",
  url: null,
  multimediaUrl: null,
  multimediaVoiceUrl: null,
  saraAnimationUrl: null,
  multimediaType: "VISUAL",
  showMultimedia: true,
  multimediaVideo: null,
  multimediaVideoContentType: null,
  multimediaVideoUrl: null,
  multimediaVideoPath: null,
  intents: [],
  channelMultimedias: [],
  channelVoices: [],
  channelAnimations: [],
  channelVideos: [],
};

const channels: channelsType[] = [
  {
    id: 1,
    description: "WhatsApp",
  },
  {
    id: 2,
    description: "Telegram ",
  },
  {
    id: 3,
    description: "Web",
  },
  {
    id: 4,
    description: "Instagram",
  },
];

type ListChannel =
  | "ChannelVoices"
  | "ChannelMultimedias"
  | "ChannelAnimations"
  | "ChannelVideos";
type typeMultimedia = "Voices" | "Animations" | "Multimedias" | "Video";

import React from "react";

function ModalTrainingStep2({name,userExpe,handleSubmit, idTraining}:{name:string,userExpe:UserExpresion,handleSubmit:() => void,idTraining:string | number}) {
  const { Intentions, setIntentions } = useStore();
  const { setLoader } = useRender();
  const [modal, setModal] = useState(false);
  const [Data, setData] = useState<Intention | undefined>();
  const [DataRes, setDataRes] = useState<UserResponse>(initData);
  const [ChannelVoices, setChannelVoices] = useState<channelsType[] | null>([]);
  const [ChannelMultimedias, setChannelMultimedias] = useState<
    channelsType[] | null
  >([]);
  const [ChannelAnimations, setChannelAnimations] = useState<
    channelsType[] | null
  >([]);
  const [ChannelVideos, setChannelVideos] = useState<channelsType[] | null>([]);

  const deleteArchivo = (name: typeMultimedia) => {
    if (DataRes) {
      switch (name) {
        case "Voices":
          setDataRes({
            ...DataRes,
            multimediaVoice: "",
            multimediaVoiceUrl: "",
            multimediaVoiceContentType: "",
          });
          break;
        case "Animations":
          setDataRes({
            ...DataRes,
            saraAnimation: "",
            saraAnimationUrl: "",
            saraAnimationContentType: "",
          });

          break;
        case "Multimedias":
          setDataRes({
            ...DataRes,
            multimedia: "",
            multimediaUrl: "",
            multimediaContentType: "",
            multimediaType: "",
          });
          break;
        case "Video":
          setDataRes({
            ...DataRes,
            multimediaVideo: "",
            multimediaVideoUrl: "",
            multimediaVideoContentType: "",
            multimediaVideoPath: "",
          });
          break;

        default:
          break;
      }
    }
  };

  const addArchivo = (
    event: ChangeEvent<HTMLInputElement>,
    name: typeMultimedia
  ) => {
    const file = event.target.files?.[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result?.toString().split(",")[1];
      const base64ContentType = reader.result
        ?.toString()
        .split(",")[0] as string;

      const start = base64ContentType.indexOf("data:") + "data:".length; // Obtiene la posición donde comienza el contenido deseado
      const end = base64ContentType.indexOf(";base64"); // Obtiene la posición donde termina el contenido deseado

      // Extrae el contenido deseado utilizando substring
      const content = base64ContentType.substring(start, end);
      if (DataRes) {
        switch (name) {
          case "Voices":
            setDataRes({
              ...DataRes,
              multimediaVoice: base64String,
              multimediaVoiceUrl: reader.result?.toString(),
              multimediaVoiceContentType: content,
            });
            break;
          case "Animations":
            setDataRes({
              ...DataRes,
              saraAnimation: base64String,
              saraAnimationUrl: reader.result?.toString(),
              saraAnimationContentType: content,
            });

            break;
          case "Multimedias":
            setDataRes({
              ...DataRes,
              multimedia: base64String,
              multimediaUrl: reader.result?.toString(),
              multimediaContentType: content,
            });
            break;
          case "Video":
            setDataRes({
              ...DataRes,
              multimediaVideo: base64String,
              multimediaVideoUrl: reader.result?.toString(),
              multimediaVideoContentType: content,
              multimediaVideoPath: reader.result?.toString(),
            });
            break;

          default:
            break;
        }
      }
    };

    reader.readAsDataURL(file);
  };

  const onCheck = (event: boolean, e: channelsType, name: ListChannel) => {
    if (event) {
      switch (name) {
        case "ChannelVoices":
          if (ChannelVoices) {
            setChannelVoices([...ChannelVoices, e]);
          } else {
            setChannelVoices([e]);
          }
          break;
        case "ChannelAnimations":
          if (ChannelAnimations) {
            setChannelAnimations([...ChannelAnimations, e]);
          } else {
            setChannelAnimations([e]);
          }
          break;
        case "ChannelMultimedias":
          if (ChannelMultimedias) {
            setChannelMultimedias([...ChannelMultimedias, e]);
          } else {
            setChannelMultimedias([e]);
          }
          break;
        case "ChannelVideos":
          if (ChannelVideos) {
            setChannelVideos([...ChannelVideos, e]);
          } else {
            setChannelVideos([e]);
          }
          break;

        default:
          break;
      }
      return;
    }

    switch (name) {
      case "ChannelVoices":
        if (ChannelVoices) {
          setChannelVoices(ChannelVoices.filter((ele) => ele.id !== e.id));
        }
        break;
      case "ChannelAnimations":
        if (ChannelAnimations) {
          setChannelAnimations(
            ChannelAnimations.filter((ele) => ele.id !== e.id)
          );
        }
        break;
      case "ChannelMultimedias":
        if (ChannelMultimedias) {
          setChannelMultimedias(
            ChannelMultimedias.filter((ele) => ele.id !== e.id)
          );
        }
        break;
      case "ChannelVideos":
        if (ChannelVideos) {
          setChannelVideos(ChannelVideos.filter((ele) => ele.id !== e.id));
        }
        break;

      default:
        break;
    }
  };

  const onSubmitData = async () => {
    setLoader(true);
    try {
      console.log(Data);
      const response = await axios.post("/api/AllinOne", {
        intentionName: name,
        userExpresion:userExpe,
        userResponse: {
          ...DataRes,
          channelVoices: ChannelVoices,
          channelMultimedias: ChannelMultimedias,
          channelAnimations: ChannelAnimations,
          channelVideos: ChannelVideos,
        },
        idTraining
      });

      console.log(response);

      setIntentions(
        Intentions.map((objeto) => {
          if (objeto.id === response.data.id) {
            return response.data;
          }
          return objeto;
        })
      );

      handleSubmit()


      ToastCall("success", "Estimulos guardados con exito ");
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


  useEffect(() => {
    console.log(Data);
  }, [Data]);
  return (
    <div className="modal-content px-6">
      <div className=" h-[10vh]"></div>
      <main className="">
      <div className=" flex  w-full gap-2 border-b-2">
          <div className=" flex flex-col w-full border-r-2 p-2">
            <label className=" font-bold text-lg"> Respuesta </label>
            <p>
            {DataRes?.valueResponse.split('&')[0]}
            </p>
            <div className=" flex justify-end">

            <button className=" btn btn-success" onClick={() => setModal(true)}> Editar</button>
            </div>
          </div>
          <div className=" relative flex flex-col w-full">
            {DataRes?.multimediaVoiceUrl ? (
              <div
                className=" absolute top-2 right-2 tooltip z-10"
                data-tip="limpiar archivo"
              >
                <button
                  className=" btn btn-error "
                  onClick={() => deleteArchivo("Voices")}
                >
                  <MdDeleteForever size={24} />
                </button>
              </div>
            ) : null}

            <label className=" font-bold text-lg flex gap-1 items-center">
              {" "}
              Audio{" "}
              <span>
                <AiFillSound size={24} />
              </span>{" "}
            </label>
            {DataRes?.multimediaVoiceUrl ? (
               <>
               <div className=" flex min-h-[15vh] justify-center items-center ">
               <audio controls>
                    <source
                      src={DataRes?.multimediaVoiceUrl}
                      type="audio/mp3"
                    />
                  </audio>
               </div>
               <div className=" flex flex-row gap-2  justify-around">
                  <div>
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        <AiFillInstagram size={36} />
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={
                          ChannelVoices
                            ? ChannelVoices.some(
                                (objeto) =>
                                  objeto.description === channels[3].description
                              )
                            : false
                        }
                        onChange={(e) =>
                          onCheck(
                            e.target.checked,
                            channels[3],
                            "ChannelVoices"
                          )
                        }
                        className="checkbox"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        <FaWhatsappSquare size={32} />
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={
                          ChannelVoices
                            ? ChannelVoices.some(
                                (objeto) =>
                                  objeto.description === channels[0].description
                              )
                            : false
                        }
                        onChange={(e) =>
                          onCheck(
                            e.target.checked,
                            channels[0],
                            "ChannelVoices"
                          )
                        }
                        className="checkbox"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        <FaTelegram size={32} />
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={
                          ChannelVoices
                            ? ChannelVoices.some(
                                (objeto) =>
                                  objeto.description === channels[1].description
                              )
                            : false
                        }
                        onChange={(e) =>
                          onCheck(
                            e.target.checked,
                            channels[1],
                            "ChannelVoices"
                          )
                        }
                        className="checkbox"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        <FaChrome size={32} />
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={
                          ChannelVoices
                            ? ChannelVoices.some(
                                (objeto) =>
                                  objeto.description === channels[2].description
                              )
                            : false
                        }
                        onChange={(e) =>
                          onCheck(
                            e.target.checked,
                            channels[2],
                            "ChannelVoices"
                          )
                        }
                        className="checkbox"
                      />
                    </label>
                  </div>
                </div>
             </>
            ) : (
              <div className=" flex h-full justify-center items-center ">
                <input
                  type="file"
                  accept="audio/mp3"
                  className="file-input w-full max-w-xs"
                  onChange={(e) => addArchivo(e, "Voices")}
                />
              </div>
            )}

            {/*  <div
              className="tooltip absolute right-0 flex flex-col justify-center items-center tooltip-left tooltip-primary"
              data-tip="Si cargas este multimedia solo se usara en estas plataformas"
            >
              <AiFillInstagram size={36} />
              <FaWhatsappSquare size={32} />
              <FaTelegram size={32} />
              <FaChrome size={32} />
            </div> */}
          </div>
        </div>
        <div className=" flex w-full gap-2">
          <div className=" relative flex flex-col w-full border-r-2">
            {DataRes?.multimediaVideoUrl ? (
              <div
                className=" absolute top-2 right-2 tooltip z-10"
                data-tip="limpiar archivo"
              >
                <button
                  className=" btn btn-error "
                  onClick={() => deleteArchivo("Video")}
                >
                  <MdDeleteForever size={24} />
                </button>
              </div>
            ) : null}
            <label className=" font-bold text-lg flex gap-1 items-center">
              {" "}
              Video{" "}
              <span>
                <FaVideo size={28} />
              </span>{" "}
            </label>

              {DataRes?.multimediaVideoUrl ? (
                <>
                  <div className=" flex min-h-[30vh] justify-center items-center ">
                    <video width="540" height="540" className=" w-[65%]" controls>
                      <source
                        src={DataRes?.multimediaVideoUrl}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                  <div className=" flex flex-row gap-2  justify-around">
                  <div>
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        <AiFillInstagram size={36} />
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={
                          ChannelVideos
                            ? ChannelVideos.some(
                                (objeto) =>
                                  objeto.description === channels[3].description
                              )
                            : false
                        }
                        onChange={(e) =>
                          onCheck(
                            e.target.checked,
                            channels[3],
                            "ChannelVideos"
                          )
                        }
                        className="checkbox"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        <FaWhatsappSquare size={32} />
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={
                          ChannelVideos
                            ? ChannelVideos.some(
                                (objeto) =>
                                  objeto.description === channels[0].description
                              )
                            : false
                        }
                        onChange={(e) =>
                          onCheck(
                            e.target.checked,
                            channels[0],
                            "ChannelVideos"
                          )
                        }
                        className="checkbox"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        <FaTelegram size={32} />
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={
                          ChannelVideos
                            ? ChannelVideos.some(
                                (objeto) =>
                                  objeto.description === channels[1].description
                              )
                            : false
                        }
                        onChange={(e) =>
                          onCheck(
                            e.target.checked,
                            channels[1],
                            "ChannelVideos"
                          )
                        }
                        className="checkbox"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        <FaChrome size={32} />
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={
                          ChannelVideos
                            ? ChannelVideos.some(
                                (objeto) =>
                                  objeto.description === channels[2].description
                              )
                            : false
                        }
                        onChange={(e) =>
                          onCheck(
                            e.target.checked,
                            channels[2],
                            "ChannelVideos"
                          )
                        }
                        className="checkbox"
                      />
                    </label>
                  </div>
                </div>
                </>
              ) : (
                <div className=" flex min-h-[45vh] justify-center items-center ">
                <input
                  type="file"
                  accept="video/*"
                  className="file-input w-full max-w-xs"
                  onChange={(e) => addArchivo(e, "Video")}
                />
            </div>
              )}
          </div>
          <div className=" relative flex flex-col w-full border-r-2">
            {DataRes?.saraAnimationUrl ? (
              <div
                className=" absolute top-2 right-2 tooltip z-10"
                data-tip="limpiar archivo"
              >
                <button
                  className=" btn btn-error "
                  onClick={() => deleteArchivo("Animations")}
                >
                  <MdDeleteForever size={24} />
                </button>
              </div>
            ) : null}
            <label className=" font-bold text-lg flex gap-1 items-center">
              {" "}
              Animación{" "}
              <span>
                <PiGifFill size={28} />
              </span>{" "}
            </label>
            {DataRes?.saraAnimationUrl ? (
              <>
                <div className=" flex min-h-[30vh] justify-center items-center ">
                  <figure className=" w-[65%]">
                    <Image
                      src={DataRes.saraAnimationUrl}
                      alt="Shoes"
                      width={1080}
                      height={1080}
                    />
                  </figure>
                </div>
                <div className=" flex flex-row gap-2  justify-around">
                  <div>
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        <AiFillInstagram size={36} />
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={
                          ChannelAnimations
                            ? ChannelAnimations.some(
                                (objeto) =>
                                  objeto.description === channels[3].description
                              )
                            : false
                        }
                        onChange={(e) =>
                          onCheck(
                            e.target.checked,
                            channels[3],
                            "ChannelAnimations"
                          )
                        }
                        className="checkbox"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        <FaWhatsappSquare size={32} />
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={
                          ChannelAnimations
                            ? ChannelAnimations.some(
                                (objeto) =>
                                  objeto.description === channels[0].description
                              )
                            : false
                        }
                        onChange={(e) =>
                          onCheck(
                            e.target.checked,
                            channels[0],
                            "ChannelAnimations"
                          )
                        }
                        className="checkbox"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        <FaTelegram size={32} />
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={
                          ChannelAnimations
                            ? ChannelAnimations.some(
                                (objeto) =>
                                  objeto.description === channels[1].description
                              )
                            : false
                        }
                        onChange={(e) =>
                          onCheck(
                            e.target.checked,
                            channels[1],
                            "ChannelAnimations"
                          )
                        }
                        className="checkbox"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        <FaChrome size={32} />
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={
                          ChannelAnimations
                            ? ChannelAnimations.some(
                                (objeto) =>
                                  objeto.description === channels[2].description
                              )
                            : false
                        }
                        onChange={(e) =>
                          onCheck(
                            e.target.checked,
                            channels[2],
                            "ChannelAnimations"
                          )
                        }
                        className="checkbox"
                      />
                    </label>
                  </div>
                </div>
              </>
            ) : (
              <div className=" flex min-h-[45vh] justify-center items-center ">
                <input
                  type="file"
                  accept="image/gif"
                  className="file-input w-full max-w-xs"
                  onChange={(e) => addArchivo(e, "Animations")}
                />
              </div>
            )}
          </div>

          <div className=" relative flex flex-col w-full">
            {DataRes?.multimediaUrl ? (
              <div
                className=" absolute top-2 right-2 tooltip z-10"
                data-tip="limpiar archivo"
              >
                <button
                  className=" btn btn-error "
                  onClick={() => deleteArchivo("Multimedias")}
                >
                  <MdDeleteForever size={24} />
                </button>
              </div>
            ) : null}
            <label className=" font-bold text-lg flex gap-1 items-center">
              {" "}
              Imagen{" "}
              <span>
                <FaImage size={28} />
              </span>{" "}
            </label>
            {DataRes?.multimediaUrl ? (
              <>
                <div className=" flex min-h-[30vh] justify-center items-center ">
                  <figure className=" w-[65%]">
                    <Image
                      src={DataRes.multimediaUrl}
                      alt="Shoes"
                      width={540}
                      height={540}
                    />
                  </figure>
                </div>
                <div className=" flex flex-row gap-2  justify-around">
                  <div>
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        <AiFillInstagram size={36} />
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={
                          ChannelMultimedias
                            ? ChannelMultimedias.some(
                                (objeto) =>
                                  objeto.description === channels[3].description
                              )
                            : false
                        }
                        onChange={(e) =>
                          onCheck(
                            e.target.checked,
                            channels[3],
                            "ChannelMultimedias"
                          )
                        }
                        className="checkbox"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        <FaWhatsappSquare size={32} />
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={
                          ChannelMultimedias
                            ? ChannelMultimedias.some(
                                (objeto) =>
                                  objeto.description === channels[0].description
                              )
                            : false
                        }
                        onChange={(e) =>
                          onCheck(
                            e.target.checked,
                            channels[0],
                            "ChannelMultimedias"
                          )
                        }
                        className="checkbox"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        <FaTelegram size={32} />
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={
                          ChannelMultimedias
                            ? ChannelMultimedias.some(
                                (objeto) =>
                                  objeto.description === channels[1].description
                              )
                            : false
                        }
                        onChange={(e) =>
                          onCheck(
                            e.target.checked,
                            channels[1],
                            "ChannelMultimedias"
                          )
                        }
                        className="checkbox"
                      />
                    </label>
                  </div>
                  <div>
                    <label className="label cursor-pointer">
                      <span className="label-text">
                        <FaChrome size={32} />
                      </span>
                      <input
                        type="checkbox"
                        defaultChecked={
                          ChannelMultimedias
                            ? ChannelMultimedias.some(
                                (objeto) =>
                                  objeto.description === channels[2].description
                              )
                            : false
                        }
                        onChange={(e) =>
                          onCheck(
                            e.target.checked,
                            channels[2],
                            "ChannelMultimedias"
                          )
                        }
                        className="checkbox"
                      />
                    </label>
                  </div>
                </div>
              </>
            ) : (
              <div className=" flex min-h-[45vh] justify-center items-center ">
                <input
                  type="file"
                  accept="image/png"
                  className="file-input w-full max-w-xs"
                  onChange={(e) => addArchivo(e, "Multimedias")}
                />
              </div>
            )}
          </div>
        </div>
        
        <ModalEditText modal={modal} setModal={setModal} data={DataRes} setData={setDataRes}/>
      </main>

      <div className=" flex justify-end py-2">

      <div
                className="tooltip"
                data-tip="Siguiente"
              >
                <button
                  className={
                     " btn btn-lg btn-info  "
                  }
                  onClick={onSubmitData}
                >
                  Guardar
                </button>
              </div>
      </div>
    </div>
  );
}

export default ModalTrainingStep2;
