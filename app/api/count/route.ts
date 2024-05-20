import { Intention } from "@/lib/interface.intentions";
import axios from "axios";
import { cookies } from "next/headers";


// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export async function GET(
  req: Request
) {
  const token = cookies().get("sesion")

  const date = new Date()

  date.setMonth(date.getMonth() - 1)

  const response = await axios.get(
    process.env.API + "/api/interations?creationDate.greaterThan="+encodeURIComponent(date.toISOString())+"&page=0&size=10000",
    {
      headers: {
        Authorization: `Bearer ${token?.value}`,
      },
    }
  );

  console.log(response)

  
  return Response.json(response.data)
}

