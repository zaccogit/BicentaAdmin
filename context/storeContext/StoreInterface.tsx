import { Intentions, Training, UserExpresions, UserResponses } from "@/lib/interface.intentions";


export interface StoreContextProps {
  Intentions:Intentions, setIntentions: (e:Intentions)=> void,
  UserExpresions:UserExpresions , setUserExpresions:(e:UserExpresions)=> void
  UserResponses:UserResponses , setUserResponses:(e:UserResponses)=> void
  Trainings:Training[], setTrainings:(e:Training[])=> void
}

