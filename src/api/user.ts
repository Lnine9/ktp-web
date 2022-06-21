import md5 from "js-md5";
import instance from "./index";
import {BaseResp, User} from "@/types";
import { AxiosPromise } from "axios";

export function login(username, password): AxiosPromise<BaseResp<User>>{
  return instance.get('login',{
    params:{
      username,
      password: md5(password),
    }
  })
}

export function getUserInfo(userId): AxiosPromise<BaseResp<User>>{
  return instance.get('user',{
    params:{
      userId
    }
  })
}

export function registry(userInfo): AxiosPromise<BaseResp<string>>{
  return instance.post('login', {...userInfo})
}
