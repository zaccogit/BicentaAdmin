import { cookies } from "next/headers";
import axios from "axios";

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log(body)
    const host = process.env.API ? process.env.API : "";
    const url = "/api/authenticate";
    const { usernameOREmail, password } = body;
    const response = await axios.post(host+url, { username:usernameOREmail, password, remember: true });
    if (response.data) {
      cookies().set("sesion", response.data.id_token, { httpOnly: true });
      cookies().set("dateSesion", new Date().toISOString(), { httpOnly: true });
    }

    return Response.json({token:response.data.id_token});
  } catch (error: any) {
    console.log(error.response.data,"error");
    if (error.response.status === 401) {
      return Response.json(error.response.data);
    }
    return Response.json(error.response.data);
    
  }
}

export async function DELETE(request: Request) {
  try {
    cookies().delete("sesion");

    return Response.json({message:"listo"});
  } catch (error: any) {
    console.log(error.response.data,"error");
    if (error.response.status === 401) {
      return Response.json(error.response.data);
    }
    return Response.json(error.response.data);
    
  }
}

/* export async function getSesion(req: NextApiRequest, res: NextApiResponse) {
    const sesion = cookies().get("sesion")?.value
    if(!sesion) return null
    return sesion
} */
