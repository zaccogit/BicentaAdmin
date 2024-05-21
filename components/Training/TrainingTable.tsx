"use client";
import Table from "rc-table";
import React, { useEffect, useState } from "react";
import Pagination from "react-js-pagination";
import { getIntentions, getResponses, getTraining } from "@/lib/httpRequest";
import { Intentions, Training } from "@/lib/interface.intentions";
import { useRender } from "@/context/render/renderProvider";
import { FaChrome, FaTelegram, FaWhatsappSquare } from "react-icons/fa";
import { AiFillInstagram } from "react-icons/ai";
import { ToastCall } from "@/utils/GeneralMetods";
import axios from "axios";
import ModalSure from "../common/ModalSure";
import { useStore } from "@/context/storeContext/StoreProvider";
import ModalTraining from "../common/ModalTrainig/ModalTraining";

const TrainingTable = () => {
  const [modal, setModal] = useState(false);
  const [modalSure, setModalSure] = useState(false);
  const [Training, setTraining] = useState<Training>();
  const { Trainings, setTrainings, setIntentions } = useStore();
  const { setLoader } = useRender();

  //Pagination
  const itemsPerPage = 10;
  const [activePage, setActivePage] = useState(1);
  const handlePageChange = (pageNumber: any) => {
    setActivePage(pageNumber);
  };

  const totalPages = Math.ceil(Trainings.length / itemsPerPage);
  const startIndex = (activePage - 1) * itemsPerPage;
  const currentItems = Trainings.slice(startIndex, startIndex + itemsPerPage);

  const onDelete = async () => {
    if (!Training) return;

    setLoader(true);
    try {
      await axios.delete("/api/training/" + Training.id);

      setTrainings(Trainings.filter((objeto) => objeto.id !== Training.id));

      ToastCall("success", "Estimulos eliminado con exito ");
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

  const columns = [
    {
      title: "Interacción",
      dataIndex: "value",
      key: "value",
      width: 400,
      className: "p-2 border-r-2 border-b-2 text-center w-full",
      rowClassName: "bg-black-ripon",
    },
    {
      title: "Origen",
      dataIndex: "sourceChannel",
      key: "sourceChannel",
      width: 400,
      className: "p-2 border-r-2 border-b-2",
      render: (e: "WHATSAPP" | "TELEGRAM" | "WEB" | "INSTAGRAM") =>
        badgeBrands(e),
    },
    /* {
          title: 'Total Product',
          dataIndex: 'productCount',
          key: 'productCount',
          width: 400,
          className:"p-2 border-r-2 border-b-2"
        }, */
    {
      title: "Operations",
      dataIndex: "",
      key: "operations",
      className: "p-2 border-r-2 border-b-2",
      render: (data: any) => (
        <div className="join">
          <button
            className="btn join-item btn-success font-bold"
            onClick={() => {
              setTraining(data);
              setTimeout(() => {
                setModal(true);
              }, 100);
            }}
          >
            Entrenar
          </button>
          <button
            className="btn join-item btn-error font-bold"
            onClick={() => {
              setTraining(data);
              setTimeout(() => {
                setModalSure(true);
              }, 100);
            }}
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    (async () => {
      setLoader(true);
      try {
        const req = (await getTraining()) as Training[];
        const req2 = (await getIntentions()) as Intentions;
        setIntentions(req2);
        console.log(req);
        setTrainings(req);
      } catch (error) {
      } finally {
        setLoader(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Table
        columns={columns}
        data={currentItems}
        rowKey={(data) => data.id}
        className="rounded-lg border border-gray-100 py-3 shadow-sm rc-table-custom"
      />
      <Pagination
        activePage={activePage}
        itemsCountPerPage={itemsPerPage}
        totalItemsCount={Trainings.length}
        pageRangeDisplayed={totalPages}
        onChange={handlePageChange}
        nextPageText={"Sig"}
        prevPageText={"Prev"}
        innerClass="js-ul"
        itemClass="js-li"
        linkClass="page-link"
      />
      <ModalTraining
        modal={modal}
        setModal={setModal}
        headerTitle={"¿A que intencion deseas agregarle este estimulo?"}
        data={Training}
      />
      <ModalSure
        modal={modalSure}
        setModal={setModalSure}
        onSubmit={() => onDelete()}
      />
    </>
  );
};

const badgeBrands = (e: "WHATSAPP" | "TELEGRAM" | "WEB" | "INSTAGRAM") => {
  if (e === "WHATSAPP") {
    return (
      <div className=" px-2 gap-2 h-10 rounded-full flex justify-center items-center bg-green-600">
        {" "}
        <FaWhatsappSquare size={32} /> {e}
      </div>
    );
  }
  if (e === "INSTAGRAM") {
    return (
      <div className=" px-2 gap-2 h-10 rounded-full flex justify-center items-center bg-purple-600">
        {" "}
        <AiFillInstagram size={36} /> {e}
      </div>
    );
  }
  if (e === "WEB") {
    return (
      <div className=" px-2 gap-2 h-10 rounded-full flex justify-center items-center bg-red-600">
        {" "}
        <FaChrome size={32} /> {e}
      </div>
    );
  }
  if (e === "TELEGRAM") {
    return (
      <div className=" px-2 gap-2 h-10 rounded-full flex justify-center items-center bg-sky-600 ">
        {" "}
        <FaTelegram size={28} /> {e}{" "}
      </div>
    );
  }
};

export default TrainingTable;
