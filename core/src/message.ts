import { Font } from "./font"

/* Server stuff */ 
interface RecommendationMessage {
  type: 'recommendation',
  data: Font 
}
// Message from Server to Client
export type ServerMessage = RecommendationMessage

/* Client stuff */ 
// Message from Client to Server
interface LikeMessage<T extends string> {
  type: T,
  data: {
    id: string,
    user: string
  }
}
interface RecommendationRequestMessage {
  type: 'recommend',
  data: {
    user: string
  }
}
export type ClientMessage = 
  LikeMessage<'like'> 
  | LikeMessage<'dislike'> 
  | RecommendationRequestMessage
