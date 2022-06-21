import { AxiosResponse } from "axios";

export interface BaseResp<T>{
  code: number,
  message:string,
  data: T,
}

export interface User{
  userId: string,
  username: string,
}