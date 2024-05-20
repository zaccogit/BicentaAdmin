import fs  from 'fs';
import {
  Intention,
  UserExpresion,
  UserExpresions,
  UserResponse,
} from "@/lib/interface.intentions";
import { contieneLetras, eliminarNoDuplicados } from "@/utils/helpers";
import axios from "axios";
import { cookies } from "next/headers";
import path from 'path';
import resultado from "@/public/resultado.json"

function validarString(texto: string) {

  const data = resultado as {[key:string]:string[]}

  const palabras = texto.split(" ");
  for (let palabra of palabras) {

    if(!data[palabra.charAt(0).toLowerCase()]) return false

    if (data[palabra.charAt(0).toLowerCase()].includes(palabra) ) {

      return true; 

    }

    /* for (const diccionarioW of data[palabra.charAt(0).toLowerCase()]) {

      if(palabra[palabra.length - 1] === "s") palabra = palabra.slice(0,palabra.length - 1)
      
      if (diccionarioW === palabra ) {

        return true; 

      }
    } */

  }
  return false;
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export async function GET(req: Request) {
  const token = cookies().get("sesion");
  const response = await axios.get(
    process.env.API + "/api/trainings?page=0&size=1000",
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );

 /*  for (const training of response.data) {
    if (validarString(training.value)) {
      data.push(training)
    }
  } */

  return Response.json(response.data);
}

export async function POST(request: Request) {
  const token = cookies().get("sesion");

  const {
    intention,
    userExpresion,
    idTraining
  }: { intention: Intention; userExpresion: UserExpresion, idTraining: string | number } =
    await request.json();

  const responseCreate = await axios.post(
    process.env.API + "/api/user-expresions/addNew",
    {
      userExpresion:userExpresion,
      intentId:intention.id
    },
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "application/json",
      },
    }
  );

  const response = await axios.put(process.env.API+'/api/intents/'+intention.id, {...intention,userExpresions:[...intention.userExpresions,responseCreate.data]}, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
      'Content-Type': 'application/json'
    }
  }) 

  console.log( {
    userExpresion:responseCreate.data,
    intent:response.data
  });

  await axios.delete(
    process.env.API + "/api/trainings/"+ idTraining,
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        "Content-Type": "application/json",
      },
    }
  );

  return Response.json({
    userExpresion:responseCreate.data,
    intent:response.data
  });

}