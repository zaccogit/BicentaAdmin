import { Intention, UserExpresions, UserResponse } from "@/lib/interface.intentions";
import { contieneLetras, eliminarNoDuplicados } from "@/utils/helpers";
import axios from "axios";
import { cookies } from "next/headers";

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
export async function GET(req: Request) {
  const token = cookies().get("sesion");
  console.log(process.env.API + "/api/user-responses?page=0&size=1000")
  const response = await axios.get(    
    process.env.API + "/api/user-responses?page=0&size=1000",
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

  const {
    intention,
    userResponse,
  }: { intention:Intention,userResponse: UserResponse } =
    await request.json();
    console.log(userResponse,"aqui")
    
    const responseCreate = await axios.post(
      process.env.API + "/api/user-responses",
      {
        ...userResponse,
        intents:[intention]
      },
      {
        headers: {
          Authorization: `Bearer ${token?.value}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(responseCreate.data)

    const response = await axios.put(process.env.API+'/api/intents/'+intention.id, {...intention,userResponses:[...intention.userResponses,responseCreate.data]}, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        'Content-Type': 'application/json'
      }
    })

  return Response.json(response.data);
}
export async function PUT(request: Request) {
  const token = cookies().get("sesion");

  const {
    intention,
    userResponse,
  }: { intention:Intention,userResponse: UserResponse } =
    await request.json();
    
    const responseCreate = await axios.put(
      process.env.API + "/api/user-responses/"+userResponse.id,
        userResponse,
      {
        headers: {
          Authorization: `Bearer ${token?.value}`,
          "Content-Type": "application/json",
        },
      }
    );
    console.log(responseCreate.data)

    const response = await axios.put(process.env.API+'/api/intents/'+intention.id, {...intention,userResponses:[...intention.userResponses,responseCreate.data]}, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        'Content-Type': 'application/json'
      }
    })

    console.log(response.data)

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