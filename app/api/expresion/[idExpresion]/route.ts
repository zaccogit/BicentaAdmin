import axios from "axios";
import { cookies } from "next/headers";


export async function DELETE(request: Request) {
  const token = cookies().get("sesion");
  const data = request.url.split("/")

    const response = await axios.delete(process.env.API+'/api/user-expresions/'+data[data.length -1], {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        'Content-Type': 'application/json'
      }
    })

  return Response.json(response.data);
}