"use client";
import ModalEditText from "@/components/common/ModalEditText";
import Layout from "@/components/layout/Layout";
import { useRender } from "@/context/render/renderProvider";
import { useStore } from "@/context/storeContext/StoreProvider";
import {
  Intention,
  UserResponse,
  channelsType,
} from "@/lib/interface.intentions";
import { ToastCall } from "@/utils/GeneralMetods";
import axios from "axios";
import { Metadata } from "next";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
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

export default function Response() {
  const pathname = usePathname().split("/");
  const router = useRouter();
  const { Intentions, setIntentions, UserResponses, setUserResponses } = useStore();
  const { setLoader } = useRender();
  const [Data, setData] = useState<Intention | undefined>();
  const [DataRes, setDataRes] = useState<UserResponse | undefined>();
  const [modal, setModal] = useState(false);
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
            multimediaVoiceUrl: "",
          });
          break;
        case "Animations":
          setDataRes({
            ...DataRes,
            saraAnimationUrl: "",
          });

          break;
        case "Multimedias":
          setDataRes({
            ...DataRes,
            multimediaUrl: "",
          });
          break;
        case "Video":
          setDataRes({
            ...DataRes,
            multimediaVideoUrl: "",
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
      console.log(reader.result?.toString().split(";")[0].replace("data:", "")); // Aquí puedes manejar la cadena base64 como desees
      if (DataRes) {
        switch (name) {
          case "Voices":
            setDataRes({
              ...DataRes,
              multimediaVoice: base64String,
              multimediaVoiceUrl: reader.result?.toString(),
              multimediaVoiceContentType: reader.result
                ?.toString()
                .split(";")[0].replace("data:", ""),
            });

            console.log({  multimediaVoice: base64String,
              multimediaVoiceUrl: reader.result?.toString(),
              multimediaVoiceContentType: reader.result
                ?.toString()
                .split(";")[0].replace("data:", ""),})
            break;
          case "Animations":
            setDataRes({
              ...DataRes,
              saraAnimation: base64String,
              saraAnimationUrl: reader.result?.toString(),
              saraAnimationContentType: reader.result?.toString().split(";")[0].replace("data:", ""),
            });

            break;
          case "Multimedias":
            setDataRes({
              ...DataRes,
              multimedia: base64String,
              multimediaUrl: reader.result?.toString(),
              multimediaContentType: reader.result?.toString().split(";")[0].replace("data:", ""),
            });
            break;
          case "Video":
            setDataRes({
              ...DataRes,
              multimediaVideo: base64String,
              multimediaVideoUrl: reader.result?.toString(),
              multimediaVideoContentType: reader.result
                ?.toString()
                .split(";")[0].replace("data:", ""),
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

    console.log({
      ...DataRes,
      channelVoices: ChannelVoices,
      channelMultimedias: ChannelMultimedias,
      channelAnimations: ChannelAnimations,
      channelVideos: ChannelVideos,
    })
    try {
      const response = await axios.put("/api/response", {
        intention: Data,
        userResponse: {
          ...DataRes,
          channelVoices: ChannelVoices,
          channelMultimedias: ChannelMultimedias,
          channelAnimations: ChannelAnimations,
          channelVideos: ChannelVideos,
        },
      });

      console.log(response.data, "data")

      setIntentions(
        Intentions.map((objeto) => {
          if (objeto.id === response.data.id) {
            return response.data;
          }
          return objeto;
        })
      );

      router.back();

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
    const tintent = Intentions.find(
      (e) => e.id === Number(pathname[pathname.length - 2])
    );

    console.log(pathname[pathname.length - 2])
    if (tintent) {
      const userResponse1 = tintent.userResponses.find(
        (e) => e.id === Number(pathname[pathname.length - 1])

      );
      const userResponse2 = UserResponses.find(
        (e) => e.id === Number(pathname[pathname.length - 1])

      );
      console.log(tintent);
      if (userResponse1 && userResponse2 ) {
        console.log(userResponse1);
        console.log(userResponse2);
        setDataRes(userResponse1);
        setChannelVoices(userResponse2.channelVoices);
        setChannelMultimedias(userResponse2.channelMultimedias);
        setChannelAnimations(userResponse2.channelAnimations);
        setChannelVideos(userResponse2.channelVideos);
      }

      setData(tintent);
    }
  }, []);

  return (
    <Layout title="Home Layout">
      <main className="p-6 sm:p-10 space-y-6 bg-white">
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
          <div className="mr-6">
            <h1 className="text-4xl font-semibold mb-2">
              {"Actualizar Respuesta"}
            </h1>
            {/* <h2 className="text-gray-600 ml-0.5">{titleDescription}</h2> */}
          </div>
          <div className="flex flex-wrap items-start justify-end -mb-3">
            <button
              className="btn btn-success inline-flex px-5 py-3 text-white rounded-md ml-6 mb-3"
              onClick={onSubmitData}
            >
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="flex-shrink-0 h-6 w-6 text-white -ml-1 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Guardar
            </button>
          </div>

          {/*     <div className="flex flex-wrap items-start justify-end -mb-3">
          <select class="select select-bordered w-full max-w-xs">
            <option disabled selected>
              Tipo de 
            </option>
            <option>Han Solo</option>
            <option>Greedo</option>
          </select>
        </div> */}
        </div>

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
                  <div className=" flex min-h-[45vh] justify-center items-center ">
                    <video width="1080" height="1080" controls>
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
                <div className=" flex min-h-[45vh] justify-center items-center ">
                  <figure>
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
                <div className=" flex min-h-[45vh] justify-center items-center ">
                  <figure>
                    <Image
                      src={DataRes.multimediaUrl}
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
    </Layout>
  );
}
