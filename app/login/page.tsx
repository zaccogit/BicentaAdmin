import Image from "next/image";
import TextField from "@mui/material/TextField";
import React, { useContext, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ToastCall } from "@/utils/GeneralMetods";
import axios from "axios";
import { useRouter } from 'next/navigation'
import "react-toastify/dist/ReactToastify.css";
import { useRender } from "@/context/render/renderProvider";
import FormLogin from "@/components/login/FormLogin";
import { Metadata } from "next";
import env from "../../utils"
export const metadata: Metadata = {
  title: "Login",
  description: "Inicio de sesión de la app",
};

function Login() {


  return (
    <>
      <div className=" bg-secondary ">
        <div className=" dark:bg-gray-900 h-screen flex items-center ">
          <div className=" flex justify-center rounded-xl w-full h-2/3">
            <main
              aria-label="Main"
              className=" bg-white rounded-xl flex items-start justify-center px-8 py-8 w-1/3 "
            >
              <div className="w-full">
                <div className="relative block bg-primary rounded-lg">
                  <span className="inline-flex items-center justify-center w-full">
                    <Image src={env.IMG_HOME_URL} alt={env.NOMBRE} className="w-64" width={1080} height={1080}></Image>
                  </span>
                </div>
                <FormLogin/>
               
              </div>
            </main>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
