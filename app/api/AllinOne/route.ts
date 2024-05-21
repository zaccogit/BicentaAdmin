import axios from "axios"
import { cookies } from "next/headers"

export async function POST(
    request: Request
  ) {
  
    const token = cookies().get("sesion")
  
    const {  idTraining,intentionName,
        userExpresion,
        userResponse, } = await request.json()
  
    const obj = {
      "id": null,
      "intenType": "INFO",
      "name": intentionName,
      "description": intentionName,
      "urlRequest": intentionName,
      "enabled": true,
      "creationDate": new Date().toISOString(),
      "languaje": null,
      "userExpresions": [],
      "userResponses": []
    }
  
    const responseIntent = await axios.post(process.env.API+'/api/intents', obj, {
      headers: {
        Authorization: `Bearer ${token?.value}`,
        'Content-Type': 'application/json'
      }
    })

    const intention = responseIntent.data

    const responseCreateuserExpresion= await axios.post(
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

    console.log(responseCreateuserExpresion.data)

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
  
      const response = await axios.put(process.env.API+'/api/intents/'+intention.id, {...intention,userResponses:[...intention.userResponses,responseCreate.data], userExpresion:[responseCreateuserExpresion.data]}, {
        headers: {
          Authorization: `Bearer ${token?.value}`,
          'Content-Type': 'application/json'
        }
      })

      await axios.delete(
        process.env.API + "/api/trainings/"+ idTraining,
        {
          headers: {
            Authorization: `Bearer ${token?.value}`,
            "Content-Type": "application/json",
          },
        }
      );

      return Response.json(response.data);
  
  }
  