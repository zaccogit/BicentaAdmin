import React from "react";
import DataConsult from "./DataConsult";
import axios from "axios";
import { cookies } from "next/headers";
import { LuBrain } from "react-icons/lu";
import ChartDashboard from "./ChartDashboard";
import env from "../../utils/index"

const Dashboard = async () => {
  const token = cookies().get("sesion");

  const interations = axios.get(process.env.API + "/api/interations/count", {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });
  const interationsList = axios.get(
    process.env.API + "/api/interations?page=0&size=1000000",
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );
  const user_responses = axios.get(
    process.env.API + "/api/user-responses/count",
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );
  const user_expresions = axios.get(
    process.env.API + "/api/user-expresions/count",
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );
  const trainings = axios.get(process.env.API + "/api/trainings/count", {
    headers: {
      Authorization: `Bearer ${token?.value}`,
    },
  });

  const response = await Promise.all([
    interations,
    user_responses,
    user_expresions,
    trainings,
    interationsList,
  ]);

  const info = {
    interations: response[0].data,
    user_responses: response[1].data,
    user_expresions: response[2].data,
    trainings: response[3].data,
  };

  const objetos = response[4].data

  // Inicializar un objeto para contar la frecuencia de cada 'valueRequest'
  const conteoValueRequests: { [key: string]: number } = {};
  const conteoSourceChannels: { [key: string]: number }= {};

  // Contar cuántas veces aparece cada 'valueRequest'
  objetos.forEach((objeto: any) => {
    conteoValueRequests[objeto.valueRequest] = (conteoValueRequests[objeto.valueRequest] || 0) + 1;
      conteoSourceChannels[objeto.sourceChannel] = (conteoSourceChannels[objeto.sourceChannel] || 0) + 1;
  });

  var result: { value: string; count: number }[] = [];
  var keys = Object.keys(conteoValueRequests);
  keys.forEach(function (key) {
    result.push({
      value: key,
      count: conteoValueRequests[key],
    });
  });
  var result2: { value: string; count: number }[] = [];
  var keys2 = Object.keys(conteoSourceChannels);
  keys2.forEach(function (key) {
    result2.push({
      value: key,
      count: conteoSourceChannels[key],
    });
  });

  console.log({
    interations: response[0].data,
    user_responses: response[1].data,
    user_expresions: response[2].data,
    trainings: response[3].data,
  });

  return (
    <>
      <DataConsult />
      <main className="p-6 sm:p-10 space-y-6">
        <div className="flex flex-col space-y-6 md:space-y-0 md:flex-row justify-between">
          <div className="mr-6">
            <h1 className="text-4xl font-semibold mb-2">Dashboard</h1>
            <h2 className="text-gray-600 ml-0.5">Admin {env.NOMBRE}</h2>
          </div>
        </div>
        <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-purple-600 bg-purple-100 rounded-full mr-6">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <div>
              <span className="block text-2xl font-bold">
                {info.interations}
              </span>
              <span className="block text-gray-500">Interacciones totales</span>
            </div>
          </div>
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-green-600 bg-green-100 rounded-full mr-6">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <div>
              <span className="block text-2xl font-bold">
                {info.user_expresions}
              </span>
              <span className="block text-gray-500">Estimulos totales</span>
            </div>
          </div>
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-red-600 bg-red-100 rounded-full mr-6">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                />
              </svg>
            </div>
            <div>
              <span className="inline-block text-2xl font-bold">
                {info.user_responses}
              </span>
              <span className="block text-gray-500">Respuestas Totales</span>
            </div>
          </div>
          <div className="flex items-center p-8 bg-white shadow rounded-lg">
            <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-blue-600 bg-blue-100 rounded-full mr-6">
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <LuBrain size={24} />
              </svg>
            </div>
            <div>
              <span className="block text-2xl font-bold">{info.trainings}</span>
              <span className="block text-gray-500">
                Entrenamientos pendientes
              </span>
            </div>
          </div>
        </section>
        <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-2 xl:grid-flow-col gap-6">
          <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
            <div className="p-4 flex-grow">
            <ChartDashboard/>
            </div>
          </div>

          <div className="row-span-3 bg-white shadow rounded-lg">
            <div className="flex items-center justify-between px-6 py-5 font-semibold bg-primary rounded-t-lg text-white border-b border-gray-100">
              <span>Preguntas mas frecuentes</span>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: "25rem" }}>
              <ul className="p-6 space-y-6">
                {result.map((e, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-gray-600">{e.value}</span>
                    <span className="ml-auto font-semibold">{e.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="row-span-3 bg-white shadow rounded-lg">
            <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100 bg-primary rounded-t-lg text-white">
              <span>Origen mas frecuente</span>
            </div>
            <div className="overflow-y-auto" style={{ maxHeight: "25rem" }}>
              <ul className="p-6 space-y-6">
                {result2.map((e, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-gray-600">{e.value}</span>
                    <span className="ml-auto font-semibold">{e.count}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
        </section>
      </main>
    </>
  );
};

export default Dashboard;
