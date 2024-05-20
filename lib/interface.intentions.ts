export type Intentions = Intention[]
export type UserResponses = UserResponse[]
export type UserExpresions = UserExpresion[]

export interface Intention {
  id: number
  intenType: string
  name: string
  description: string
  urlRequest: string
  enabled: boolean
  creationDate: Date
  languaje: any
  userExpresions: UserExpresion[]
  userResponses: UserResponse[]
}

export interface Intent {
  id: number
  intenType: string
  name: string
  description: string
  urlRequest: string
  enabled: boolean
  creationDate: string
}

export interface UserExpresion {
  id?: number | string
  value: string
  priority: string
  intents?: Intention[]
}

export type channelsType = {
  id: number;
  description: "WhatsApp" | "Telegram " | "Web" | "Instagram";
}

export interface Training {
  id: number
  value: string
  sourceChannel: string
  creationDate: string
  ip: string
  postionX: any
  postionY: any
  sourceInfo: "WHATSAPP" | "TELEGRAM " | "WEB" | "INSTAGRAM"
}


export interface UserResponse {
  id?: any
  valueResponse: string
  priority: string
  multimedia: any
  multimediaContentType: any
  multimediaVoice: any
  multimediaVoiceContentType: any
  saraAnimation: any
  saraAnimationContentType: any
  isEndConversation: boolean
  responseType: string
  url: any
  multimediaUrl: any
  multimediaVoiceUrl: any
  saraAnimationUrl: any
  multimediaType: any
  showMultimedia: boolean
  multimediaVideo: any
  multimediaVideoContentType: any
  multimediaVideoUrl: any
  multimediaVideoPath: any
  intents: Intent[]
  channelMultimedias: channelsType[]
  channelVoices: channelsType[]
  channelAnimations: channelsType[]
  channelVideos: channelsType[]
}
