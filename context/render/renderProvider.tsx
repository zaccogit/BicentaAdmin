'use client'
import { createContext, useContext, useState } from "react";
import { RenderContextProps } from "./renderInterface";

export const RenderContext = createContext({} as RenderContextProps);

const RenderProvider = ({ children }: any) => {
  const [loader, setLoader] = useState<boolean>(false);
  const [firstTime, setFirstTime] = useState<boolean>(false);
  const [language, setLanguage] = useState<"ES" | "EN">("ES");

  return (
    <RenderContext.Provider
      value={{
        loader,
        language,
        firstTime,
        setLoader,
        setFirstTime,
        setLanguage,
      }}
    >
      {children}
    </RenderContext.Provider>
  );
};

export const useRender = () => useContext(RenderContext);

export default RenderProvider;