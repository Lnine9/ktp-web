import {AxiosResponse} from "axios";
import React from "react";

export interface BaseResp<T> {
  code: number,
  message: string,
  data: T,
}

export interface User {
  userId?: string,
  username: string,
  password?: string,
  email: string,
  phone: string,
  account: string,
  avatar?: string,
  role: 0 | 1 | 2,
  token?: string,
}

export interface Course {
  id?: string,
  courseName: string,
  year: string,
  term: string,
  background?: string,
}

export interface Task {
  id?: string
  title: string
  courseId: string
  description: string
  fullScore: number
  deadline: string // yyyy-MM-dd HH:mm:ss 截止日期
  correctNum?: number // 已批改数量
  uncorrectNum?: number
  submitNum?: number // 已提交数量
  unSubmitNum?: number
}

export interface Homework {
  id?: string
  taskId: string
  userId: string
  score: string
  filePath?: string
  fileName?: string
}
