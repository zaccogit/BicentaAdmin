import { Intention, UserExpresions } from "@/lib/interface.intentions";
import { contieneLetras, eliminarNoDuplicados } from "@/utils/helpers";
import axios from "axios";
import { cookies } from "next/headers";


export async function POST(request: Request) {
  const token = cookies().get("sesion");
  const idResposne = request.url.split("/")[request.url.split("/").length -1]
  const { intention }: { intention:Intention } = await request.json();
  console.log(idResposne)
  console.log(intention)
  try {

    const PutIntention = await axios.put(process.env.API+'/api/intents/'+intention.id, {...intention,userResponses:intention.userResponses.filter(e => e.id.toString() !== idResposne)}, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        'Content-Type': 'application/json'
      }
    })
  
    const response = await axios.delete(process.env.API+'/api/user-responses/'+idResposne, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        'Content-Type': 'application/json'
      }
    })

    return Response.json(PutIntention.data);
    
  } catch (error) {

    console.log(error)
    
  }

  

  
}