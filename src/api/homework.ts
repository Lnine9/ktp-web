import instance from "@/api/index";
import {BaseResp, Homework} from "@/types";
import {AxiosPromise} from "axios";

export function submitHomework(homeworkInfo: Homework): AxiosPromise<BaseResp<Homework>>{
  console.log(homeworkInfo)
  return instance.post('homework',{...homeworkInfo})
}