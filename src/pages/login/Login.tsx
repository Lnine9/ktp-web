import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm, ProForm, ProFormItem,
  ProFormText,
} from '@ant-design/pro-components';
import {message, Radio, Tabs} from 'antd';
import React, {useState} from 'react';
import styled from "styled-components";
import {login, registry} from "@/api/user";
import {AUTH_TOKEN, RESP_CODE, USER_KEY} from "../../constant";
import {useHistory} from "react-router";
import {User} from "@/types";

enum MODE {
  LOGIN = 'login',
  REGISTRY = 'registry'
}

const Login: React.FC = () => {
  const history = useHistory();
  const [mode, setMode] = useState(MODE.LOGIN);
  const [form] = ProForm.useForm();
  const onFinish = async (val) => {
    if (mode === MODE.LOGIN) {
      const {data:{data,code}} = await login(val.key, val.password);
      if (code === RESP_CODE.SUCCESS){
        message.success('登录成功')
        localStorage.setItem(USER_KEY, JSON.stringify(data))
        localStorage.setItem(AUTH_TOKEN, JSON.stringify(data.token))
        form.resetFields();
        history.push('/home')
      }
    } else {
      let isEmail = false
      if (val.keyR.indexOf('@') != -1){
        isEmail = true
      }
      const userInfo: User = {
        username: val.username,
        account: val.account,
        email: isEmail? val.keyR:null,
        phone: isEmail? null:val.keyR,
        role: val.role,
        password: val.passwordR,
      }
      const {data: {code}} = await registry(userInfo);
      if (code === RESP_CODE.SUCCESS){
        message.success('注册成功')
        setMode(MODE.LOGIN);
      }
    }
  }
  return (
    <Container>
      <div className='login-form'>
        <LoginForm
          title="课堂派"
          form={form}
          onFinish={onFinish}
          submitter={{
            searchConfig: {
              submitText: mode === MODE.LOGIN ? '登录' : '注册',
            }
          }}
        >
          <Tabs
            activeKey={mode}
            onChange={(activeKey) => {
              form.resetFields();
              setMode(activeKey as MODE);
            }}>
            <Tabs.TabPane key={MODE.LOGIN} tab={' 登录 '}/>
            <Tabs.TabPane key={MODE.REGISTRY} tab={' 注册 '}/>
          </Tabs>
          {mode === MODE.LOGIN && (
            <>
              <ProFormText
                name="key"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'}/>,
                }}
                placeholder={'邮箱/手机号'}
                rules={[
                  {
                    required: true,
                    message: '请输入邮箱/手机号',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'}/>,
                }}
                placeholder={'密码'}
                rules={[
                  {
                    required: true,
                    pattern: /^[a-z0-9_-]{6,18}$/,
                    message: '请输入密码！(6到16位字母、数字、下划线)',
                  },
                ]}
              />
            </>
          )}
          {mode === MODE.REGISTRY && (
            <>
              <ProFormText
                name="keyR"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'}/>,
                }}
                placeholder={'请输入邮箱/手机号'}
                rules={[
                  {
                    required: true,
                    message: '请输入邮箱/手机号',
                  },
                ]}
              />
              <ProFormText.Password
                name="passwordR"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'}/>,
                }}
                placeholder={'请输入密码'}
                rules={[
                  {
                    required: true,
                    pattern: /^[a-z0-9_-]{6,18}$/,
                    message: '请输入密码！(6到16位字母、数字、下划线)',
                  },
                ]}
              />
              <ProFormText.Password
                name="confirmPasswordR"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'}/>,
                }}
                dependencies={['password']}
                placeholder={'确认密码'}
                rules={[
                  {
                    required: true,
                    pattern: /^[a-z0-9_-]{6,18}$/,
                    message: '请输入密码！(6到16位字母、数字、下划线)',
                  },
                  ({getFieldValue}) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('passwordR') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('两次密码不一致'));
                    },
                  }),
                ]}
              />
              <ProFormItem
                name='role'
                label='选择身份'
                className='role'
                shouldUpdate={true}
              >
                <Radio.Group defaultValue={0}>
                  <Radio.Button value={0}>学生</Radio.Button>
                  <Radio.Button value={1}>教师</Radio.Button>
                </Radio.Group>
              </ProFormItem>
              <ProFormText
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'}/>,
                }}
                placeholder={'姓名'}
                rules={[
                  {
                    required: true,
                    message: '请输入姓名',
                  },
                ]}
              />
              <ProFormText
                name="account"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'}/>,
                }}
                placeholder='学号/教师号'
                rules={[
                  {
                    required: true,
                    message: `请输入学号/教师号`,
                  },
                ]}
              />
            </>
          )}
        </LoginForm>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 400px;
  display: flex;
  justify-content: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 8px 12px 40px #008C8C90;

  .login-form {
    margin: 50px 0 70px 0;
  }

  .ant-pro-form-login-header {
    font-size: 30px;
    margin-bottom: 10px;
  }

  .ant-tabs-tab {
    padding: 6px 15px;
  }
  
  .role{
    .ant-form-item-label{
      font-size: 16px;
      font-weight: 700;
    }
    .ant-radio-group{
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
    .ant-radio-button-wrapper{
      height: 50px;
      line-height: 50px;
      width: 48%;
      box-sizing: border-box;
    }
  }
`

export default Login