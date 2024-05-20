"use client";
import React, { useEffect, useRef, useState } from "react";
import { generateUniqueId } from "../../../utils/helpers";
import { info } from "../../../utils/dataDummy";
import { FaSave, FaVideo } from "react-icons/fa";
import { AiFillSound } from "react-icons/ai";
import { PiGifFill } from "react-icons/pi";
import Image from "next/image";
import Link from "next/link";
import { Intention, Training } from "@/lib/interface.intentions";
import { IoMdAdd, IoMdAddCircle } from "react-icons/io";
import { useStore } from "@/context/storeContext/StoreProvider";
import axios from "axios";
import { ToastCall } from "@/utils/GeneralMetods";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepButton from "@mui/material/StepButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ModalTrainingStep2 from "./ModalTrainingStep2";

const steps = ["Elegir Estimulo", "Crear intención", "Crear Respuesta"];

type ModalTraining = {
  modal: boolean;
  setModal: (e: boolean) => void;
  headerTitle: string;
  data?: Training;
};

const ModalTraining = ({
  modal,
  setModal,
  headerTitle,
  data,
}: ModalTraining) => {
  const [Intention, setIntention] = useState<Intention>();
  const [loadin, setloadin] = useState(false);
  const [name, setName] = useState("");
  const inputRef = useRef<HTMLDialogElement | null>(null);
  const { Intentions, setIntentions, Trainings, setTrainings } = useStore();
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});

  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const allStepsCompleted = () => {
    return completedSteps() === totalSteps();
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() && !allStepsCompleted()
        ? // It's the last step, but not all steps have been completed,
          // find the first step that has been completed
          steps.findIndex((step, i) => !(i in completed))
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step: number) => () => {
    if(activeStep === 1 && step === 2){
      if(!name){
        ToastCall("warning", "Elige un nombre para la Intenración");
        return
      }
    }
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    handleNext();
  };

  const infoExpresion = {
    value: data?.value,
    priority: "LOW",
    intents: [],
  };

  const handleSubmit = () => {
    setModal(false);
    setIntention(undefined);
    inputRef.current && inputRef.current.classList.remove("modal-open");
  };

  const Select = (e: Intention) => {
    if (e.id === Intention?.id) {
      setIntention(undefined);
      return;
    }

    setIntention(e);
  };

  const onSubmitData = async () => {
    setloadin(true);
    try {
      const response = await axios.post("/api/training", {
        intention: Intention,
        userExpresion: infoExpresion,
        idTraining: data?.id,
      });

      /* setIntentions(
        Intentions.map((objeto) => {
          if (objeto.id === response.data.intent.id) {
            return response.data;
          }
          return objeto;
        })
      ); */

      handleSubmit();

      setTrainings(Trainings.filter((objeto) => objeto.id !== data?.id));

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

  useEffect(() => {
    if (modal) {
      inputRef.current && inputRef.current.classList.add("modal-open");
    }
    console.log(data?.id, "ESTE");
    /* console.log(modal); */
  }, [modal, data]);

  return (
    <>
      <dialog
        ref={inputRef}
        className="fixed inset-0 flex items-center justify-center z-50 modal"
      >
        <div className="modal-overlay"></div>
        <div className="modal-container bg-white mx-auto rounded-lg shadow-lg overflow-y-auto w-11/12 h-[90vh] max-w-5xl relative">
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
          {activeStep ? (
            <Stepper
              nonLinear
              activeStep={activeStep}
              className="h-[10vh] px-5"
            >
              {steps.map((label, index) => (
                <Step key={label} completed={completed[index]}>
                  <StepButton color="inherit" onClick={handleStep(index)}>
                    {label}
                  </StepButton>
                </Step>
              ))}
            </Stepper>
          ) : (
            <div className="h-[5vh]"></div>
          )}

          {!activeStep ? (
            <div className="modal-content px-6 space-y-4">
              <div className="flex flex-1 flex-wrap gap-4  justify-center">
                {Intentions.map((e) => (
                  <div
                    key={e.id}
                    onClick={() => Select(e)}
                    className={
                      Intention?.id === e.id
                        ? " border-4 border-blue-500 card w-64 bg-base-100 shadow-xl hover:bg-base-200 active:bg-base-300 cursor-pointer transition-all"
                        : " border card w-64 bg-base-100 shadow-xl hover:bg-base-200 active:bg-base-300 cursor-pointer transition-all"
                    }
                  >
                    <div className="card-body font-bold ">
                      <p>
                        {" "}
                        {e.name.length > 60
                          ? e.name.slice(0, 60) + "..."
                          : e.name}
                      </p>
                    </div>
                  </div>
                ))}
                <div
                  onClick={handleStep(1)}
                  className={
                    " border card w-64 bg-blue-100 shadow-xl hover:bg-blue-200 active:bg-blue-300 cursor-pointer transition-all"
                  }
                >
                  <div className="card-body font-bold flex flex-row justify-center items-center gap-2  ">
                    <IoMdAddCircle size={48} />
                    <p> Crear Intencion Nueva</p>
                  </div>
                </div>
              </div>
              <div className=" h-[10vh]"></div>
              <div
                className=" absolute bottom-2 left-2  tooltip"
                data-tip={
                  data && data?.value.length > 60
                    ? data?.value.slice(0, 60) + "..."
                    : data?.value
                }
              >
                <span className="font-bold">
                  {" "}
                  El Estimulo seleccionado para entrenar es:
                </span>
                <p>
                  {data && data?.value.length > 60
                    ? data?.value.slice(0, 60) + "..."
                    : data?.value}
                </p>
              </div>
              <div
                className="absolute bottom-2 right-2 tooltip"
                data-tip="crear estimulo"
              >
                <button
                  className={
                    loadin
                      ? " btn btn-lg btn-success btn-circle loading"
                      : " btn btn-lg btn-success btn-circle "
                  }
                  onClick={onSubmitData}
                >
                  <FaSave size={24} />
                </button>
              </div>
            </div>
          ) : null}

          {activeStep === 1 ? (
            <div className="modal-content px-6 space-y-4">
              <div className=" h-[10vh]"></div>
              <div className=" flex justify-center ">
                <h2 className=" text-2xl">Nombre de la Intención que quieres crear</h2>
              </div>
              <div className=" flex justify-center">

              <div className="flex flex-col w-1/3">
              {/* <label className="font-semibold pr-2">Nombre</label> */}
              <input
                className="input input-bordered w-full input-primary"
                type="text"
                placeholder="Saludo"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
              </div>
            </div>
          ) : null}

          {activeStep === 2 ? (
            <ModalTrainingStep2 />
          ) : null}

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

export default ModalTraining;
