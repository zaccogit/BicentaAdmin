import axios from "axios";
import { useRouter } from 'next/navigation'
import { Intentions,  Training,  UserExpresions, UserResponses } from "./interface.intentions";

export const getExpresion = async () => {
  try {
    const response = await axios.get("/api/expresion");
    console.log(response.data);     
    return response.data as UserExpresions
  } catch (error: any) {
    console.log(error,"aqui");
  }
};
export const getIntentions = async () => {
  try {
    const response = await axios.get("/api/intention");
    console.log(response.data);     
    return response.data as Intentions
  } catch (error: any) {
    console.log(error,"aqui");
  }
};
export const getResponses= async () => {
  try {
    const response = await axios.get("/api/response");
    console.log(response.data);     
    return response.data as UserResponses
  } catch (error: any) {
    console.log(error,"aqui");
  }
};
export const getTraining= async () => {
  try {
    const response = await axios.get("/api/training");
    console.log(response.data);     
    return response.data as Training[]
  } catch (error: any) {
    console.log(error,"aqui");
  }
};

export const createIntentions = async (name:string) => {
  try {
    const response = await axios.post("/api/intention", {
      name
    });
    console.log(response.data);     
    return response.data as Intentions
  } catch (error: any) {
    console.log(error,"aqui");
  }
};



export const LogOut = async () => {
    try {
      const response = await axios.delete("/api/auth");
      console.log(response.data);     
      return response
    } catch (error: any) {
      console.log(error,"aqui");
    }
};