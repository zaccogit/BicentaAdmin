import { Intention, UserExpresions } from "@/lib/interface.intentions";
import { contieneLetras, eliminarNoDuplicados } from "@/utils/helpers";
import axios from "axios";
import { cookies } from "next/headers";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export async function GET(req: Request) {
  const token = cookies().get("sesion");

  const response = await axios.get(
    process.env.API + "/api/user-expresions?page=0&size=1000",
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );

  return Response.json(response.data);
}

export async function POST(request: Request) {
  const token = cookies().get("sesion");

  let dataToCreate = []
  let dataCreated = []
  let dataOld = []
  let send = []

  const {
    intention,
    userExpresions,
    userExpresionsNew,
  }: { intention:Intention,userExpresions: UserExpresions; userExpresionsNew: UserExpresions } =
    await request.json();

    dataToCreate = userExpresionsNew.filter(e =>  e.id && contieneLetras(e.id.toString()))
    dataOld = userExpresionsNew.filter(e => e.id && !contieneLetras(e.id.toString()))

    
    if(dataOld.length) dataOld = dataOld.map(e =>({...e,intents: [intention]}))
    
    for (const item of dataToCreate) {

      delete item.id 
      console.log(
        {
          userExpresion:item,
          intentId:item.intents && item.intents[0].id
        }
      ) 
      const responseCreate = await axios.post(
        process.env.API + "/api/user-expresions/addNew",
        {
          userExpresion:item,
          intentId:item.intents && item.intents[0].id
        },
        {
          headers: {
            Authorization: `Bearer ${token?.value}`,
            "Content-Type": "application/json",
          },
        }
      );

      dataCreated.push(responseCreate.data)
      
    }


    const response = await axios.put(process.env.API+'/api/intents/'+intention.id, {...intention,userExpresions:[...dataOld,...dataCreated]}, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        'Content-Type': 'application/json'
      }
    })

  return Response.json(response.data);
}

export async function DELETE(request: Request) {
  const token = cookies().get("sesion");

   console.log(request. url)


   /*  const response = await axios.delete(process.env.API+'/api/intents/'+intention.id, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        'Content-Type': 'application/json'
      }
    })

  return Response.json(response.data); */
}