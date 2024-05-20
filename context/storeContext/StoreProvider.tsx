'use client'

import React, { useState, PropsWithChildren, useEffect, createContext, useContext } from 'react';
import { StoreContextProps } from './StoreInterface'
import { Intentions, Training, UserExpresions, UserResponses } from '@/lib/interface.intentions';
const StoreContext = createContext({} as StoreContextProps);

const StoreProvider = ({ children }: PropsWithChildren) => {
  const [Intentions, setIntentions] = useState<Intentions>([])
  const [UserExpresions, setUserExpresions] = useState<UserExpresions>([])
  const [UserResponses, setUserResponses] = useState<UserResponses>([])
  const [Trainings, setTrainings] = useState<Training[]>([])

  return (
    <StoreContext.Provider
      value={{
        Intentions, setIntentions,
        UserExpresions, setUserExpresions,
        UserResponses, setUserResponses,
        Trainings, setTrainings
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};
export const useStore = () => useContext(StoreContext);

export default StoreProvider;
