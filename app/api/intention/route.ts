import { Intention } from "@/lib/interface.intentions";
import axios from "axios";
import { cookies } from "next/headers";


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export async function GET(
  req: Request
) {
  const token = cookies().get("sesion")

  const response = await axios.get(process.env.API+ '/api/intents?page=0&size=1000', {
    headers: {
      Authorization: `Bearer ${token?.value}`
    }
  })
  
  return Response.json(response.data)
}



export async function POST(
  request: Request
) {

  const token = cookies().get("sesion")

  const { name } = await request.json()

  const obj = {
    "id": null,
    "intenType": "INFO",
    "name": name,
    "description": name,
    "urlRequest": name,
    "enabled": true,
    "creationDate": new Date().toISOString(),
    "languaje": null,
    "userExpresions": [],
    "userResponses": []
  }

  const response = await axios.post(process.env.API+'/api/intents', obj, {
    headers: {
      Authorization: `Bearer ${token?.value}`,
      'Content-Type': 'application/json'
    }
  })

  return Response.json(response.data)
}
