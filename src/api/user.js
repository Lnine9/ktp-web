import md5 from "js-md5";
import instance from "./index";

export function login(username, password){
  return  instance.get('login',{
    params:{
      username,
      password: md5(password),
    }
  })
}

export function getUserInfo(userId){
  return instance.get('user',{
    params:{
      userId
    }
  })
}

export function registry(userInfo){
  return instance.post('login', {...userInfo})
}
