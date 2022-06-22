import md5 from "js-md5";
import instance from "./index";
import {BaseResp, User} from "@/types";
import { AxiosPromise } from "axios";

export function login(key, password): AxiosPromise<BaseResp<User>>{
  return instance.get('login',{
    params:{
      key,
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

export function registry(userInfo: User): AxiosPromise<BaseResp<string>>{
  userInfo.password = md5(userInfo.password)
  return instance.post('login/registry', {...userInfo})
}
