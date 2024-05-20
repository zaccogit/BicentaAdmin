import { Intention } from "@/lib/interface.intentions";
import axios from "axios";
import { cookies } from "next/headers";

export async function POST(
  request: Request
) {

  const token = cookies().get("sesion")

  const { name } = await request.json()

  const response = await axios.get(process.env.API+'/api/user-expresions?value.equals='+encodeURIComponent(name)+'&page=0&size=20', {
    headers: {
      Authorization: `Bearer ${token?.value}`,
      'Content-Type': 'application/json'
    }
  })

  return Response.json(response.data)
}
