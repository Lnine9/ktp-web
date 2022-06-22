import axios, { AxiosInstance } from "axios";
import qs from "qs"
import {message} from "antd";
import {AUTH_TOKEN, HOST, RESP_CODE} from "../constant";
import history from "../utils/history";

const instance: AxiosInstance = axios.create({
  baseURL: HOST,
  timeout: 3000,
  paramsSerializer: function (params) {
    return qs.stringify(params, { arrayFormat: 'repeat', allowDots: true });
  }
})

function toLogin(){
  localStorage.removeItem(AUTH_TOKEN)
  history.push('/login')
}


/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */

const errorHandle = (status) => {
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      toLogin();
      break;
    case 404 :
      break;
    default:
      console.log("网络错误");
  }
}
//请求拦截器
instance.interceptors.request.use(req =>{
  //这里可以根据项目需求在请求前进行拦截处理并返回req
  //例子（为所有请求加上token）
  let token = localStorage.getItem(AUTH_TOKEN) || '';
  // @ts-ignore
  req.headers.common['auth-token'] = token
  return req;

})
// 响应拦截器
instance.interceptors.response.use(
//http请求200
  res =>{
    if (res.status === 200) {
      //这里是我和后台定的状态码
      switch (res.data.code){
        case RESP_CODE.SUCCESS:
          return Promise.resolve(res)
        case RESP_CODE.FAIL:
          message.error(res.data.message);
          break;
        case RESP_CODE.AUTH_FAIL:
          message.error("验证身份失败，请重新登录")
          toLogin()
          break
        case RESP_CODE.AUTH_TIME_OUT:
          message.warn('token已过期，请重新登录')
          toLogin()
          break
        default:
          message.error("网络错误")
      }
    } else {
      message.error("服务器错误")
    }
  },
// 请求失败
  error =>{
    const {
      response
    } = error;
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status);
      message.error("网络错误")
      return Promise.reject(response);
    } else {
      // 处理断网的情况
      message.error("请确认网络连接")
    }
  });

export default instance
