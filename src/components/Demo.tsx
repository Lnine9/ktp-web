import { UploadFile, UploadProps } from 'antd/lib/upload/interface';
import React, { useState } from 'react';
import styled from 'styled-components';
import {Button, message, Upload} from "antd";
import { FileAddOutlined } from '@ant-design/icons';
import {submitHomework} from "@/api/homework";
import {Homework} from "@/types";
import {HOST} from "@/constant";

const Wrapper = styled.div`
  
`

interface DemoProps{
  demo: string;
  unnecessary?: string;
}

const Demo = ({demo, unnecessary}: DemoProps) => {

  const [fileName, setFileName] = useState<string>();

  const handleClock = () => {
    if (!fileName){
      message.warn('请先上传文件');
      return;
    }
    let homeworkInfo: Homework = {
      taskId: '1',
      userId: '1',
      fileName: fileName,
    }
    submitHomework(homeworkInfo).then(
      res=>{
        console.log(res)
      }
    )
  }

  const uploadProps: UploadProps = {
    action: `${HOST}/file`,
    method: 'POST',
    maxCount: 1,
    onChange: ({file}) => {
      if (file.status === 'done'){
        setFileName(file.response.data)
      }
    }
  }

  return (
    <Wrapper>
      {demo}
      <Upload {...uploadProps}>
        <Button icon={<FileAddOutlined />}>Upload</Button>
      </Upload>

      <Button onClick={handleClock}>submit</Button>
    </Wrapper>
  )

}

export default Demo