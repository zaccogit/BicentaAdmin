"use client";
import { useRender } from "@/context/render/renderProvider";
import { ToastCall } from "@/utils/GeneralMetods";
import { TextField } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";

type Form = "Login" | "Register";

export default function FormLogin() {
  const router = useRouter();
  const { setLoader } = useRender();
  const [TypeForm, setTypeForm] = useState<Form>("Login");
  const [loadin, setloadin] = useState(false);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitData = handleSubmit(async (data) => {
    setLoader(true);
    try {
      /* const authData: Sesion = await PB.collection("users").authWithPassword(data.email, data.password); */
      const response = await axios.post(
        "/api/auth",
        {
          usernameOREmail: data.email,
          password: data.password,
        },
        {}
      );
      console.log(response.data);

      if (response.data.status === 401) {
        ToastCall("error", "Usuario o Contraseña invalida");
        return;
      }
      ToastCall("success", "Bienvenido ");
      router.push("/dashboard");
    } catch (error: any) {
      console.log(error, "aqui");
      if (error.status === 400) {
        ToastCall("error", "Usuario o Contraseña invalida");
        return;
      }
      ToastCall("error", error);
    } finally {
      setLoader(false);
    }
  });

  return (
    <form className="mt-8 flex flex-col  gap-6" onSubmit={onSubmitData}>
      <div className="col-span-5">
        <Controller
          name="email"
          key={"email"}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              id="email-input"
              label="Nombre de usuario"
              variant="outlined"
              className="w-full"
              type={"text"}
              inputProps={{
                className:
                  "border-transparent focus:border-transparent focus:ring-0 ",
                maxLength: "30",
              }}
              {...field}
              error={errors.email ? true : false}
              helperText={errors.email && "Este campo es requerido"}
            />
          )}
        />
      </div>

      <div className="col-span-5">
        <Controller
          name="password"
          key={"password"}
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              id="password-input"
              label="Contraseña"
              variant="outlined"
              className="w-full"
              type={"password"}
              inputProps={{
                className:
                  "border-transparent focus:border-transparent focus:ring-0 ",
                maxLength: "30",
              }}
              {...field}
              error={errors.password ? true : false}
              helperText={errors.password && "Este campo es requerido"}
            />
          )}
        />
      </div>

      {/*  <div className="col-span-5">
                                    <label htmlFor="MarketingAccept" className="flex gap-4">
                                        <input
                                            type="checkbox"
                                            id="MarketingAccept"
                                            name="marketing_accept"
                                            className="h-5 w-5 rounded-md border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
                                        />

                                        <span className="text-sm text-gray-700 dark:text-gray-200">
                                            Remember me
                                        </span>
                                    </label>
                                </div> */}

      <div className="col-span-6 sm:flex sm:items-center sm:gap-4 justify-center">
        <button
          className={loadin ? "btn btn-primary loading" : "btn btn-primary"}
        >
          Iniciar Sesion
        </button>
      </div>
    </form>
  );
}
