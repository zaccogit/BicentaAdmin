"use client";
import { useState, useEffect, useRef } from "react";
import {
  CategoryScale,
  LinearScale,
  Chart as ChartJS,
  Tooltip,
  Legend,
  PointElement,
  BarElement,
  LineElement,
  Title,
} from "chart.js";
import { Line } from "react-chartjs-2";
import axios from "axios";
import moment from "moment"

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export interface Intents {
  id: number
  valueRequest: string
  sourceInfo: string
  valueResponse: string
  sourceChannel: string
  creationDate: string
}
function getDatesOfCurrentWeek() {
  const now = new Date();
  
  // Obtener el primer día de la semana (asumimos que la semana comienza el lunes)
  const dayOfWeek = now.getDay(); // 0 (Domingo) a 6 (Sábado)
  const diffToMonday = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek; // Si es domingo, restamos 6 días, si no, ajustamos para llegar al lunes

  const monday = new Date(now);
  monday.setDate(now.getDate() + diffToMonday);

  // Generar las fechas para los 7 días de la semana
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
      const date = new Date(monday);
      date.setDate(monday.getDate() + i);
      weekDates.push(date.toISOString().split('T')[0]);
  }

  return weekDates;
}

function ChartDashboard() {

  const [Data, setData] = useState<{ [key: string]: Intents[] }>()
  const [NumberList, setNumberList] = useState<string[]>([])
  const [FechaList, setFechaList] = useState<string[]>([])
  // Función para obtener solo la fecha (sin la parte de tiempo) de una cadena ISO
  const obtenerFechaSinTiempo = (isoString: string) => isoString.split("T")[0];

  useEffect(() => {
    (async () => {
      const interationsList = await axios.get("/api/count");
      

      const conteoSourceChannels: { [key: string]: Intents[] } = {};

      // Contar cuántas veces aparece cada 'valueRequest'
      const orderIntentionList = interationsList.data.sort((a:Intents, b:Intents) => new Date(a.creationDate).getTime() - new Date(b.creationDate).getTime())
      orderIntentionList.forEach((objeto: any) => {
        const fecha:string = obtenerFechaSinTiempo(objeto.creationDate)

        if(conteoSourceChannels[fecha]){
          conteoSourceChannels[fecha] = [...conteoSourceChannels[fecha],objeto]
        }else{
          conteoSourceChannels[fecha] = []
        }

      });

      setData(conteoSourceChannels)
      console.log(conteoSourceChannels, "ESTE");

      const semana = getDatesOfCurrentWeek()
      var result: string[] = [];
      var keys = Object.keys(conteoSourceChannels);
      semana.forEach((e,index)=> {
        console.log(keys[index])
        const fecha = keys.find(ele => ele === e)
        if(fecha) result.push(conteoSourceChannels[e].length.toString());
        if(!fecha) result.push("");
      })

      setNumberList(result)
      setFechaList(keys)

    })();
  }, []);

  return (
    <div className=" dataCard revenueCard flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-gray-100 border-2 border-gray-200 border-dashed rounded-md">
      {/* <div className=" loading loading-lg"></div> */}
      <Line
        data={{
          labels: getDatesOfCurrentWeek().map(e => moment(e).format("DD/MM/YYYY")),
          datasets: [
            {
              label: "Interaciones diarias",
              data: NumberList,
              fill: false,
              backgroundColor: "#263593",
              borderColor:"#263593",
              tension: 0.1,
            },
          ],
        }}
      />
    </div>
  );
}

export default ChartDashboard;
