import {
  LockOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  LoginForm, ProForm,
  ProFormText,
} from '@ant-design/pro-components';
import {message, Tabs} from 'antd';
import React, {useState} from 'react';
import styled from "styled-components";
import {login, registry} from "@/api/user";
import {RESP_CODE, USER_KEY} from "../../constant";
import {useHistory} from "react-router";

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
      const {data:{data,code}} = await login(val.username, val.password);
      if (code === RESP_CODE.SUCCESS) {
        message.success('登录成功')
        const userInfo = {
          userId: data.userId,
          username: data.username,
        }
        localStorage.setItem(USER_KEY, JSON.stringify(userInfo))
        form.resetFields();
        history.push('/login')
      } else {
        message.error('请检查用户名或密码')
      }
    } else {
      try {
        const {data:{code}} = await registry({
          name: val.usernameR,
          password: val.passwordR,
        });
        if (code === RESP_CODE.SUCCESS) {
          message.success('注册成功')
          setMode(MODE.LOGIN)
        } else {
          message.error('注册失败，请检查输入')
        }
        // form.resetFields();
      } catch (e) {
        message.error('请求错误')
      }
    }
  }
  return (
    <Container>
      <div className='login-form'>
        <LoginForm
          title="DOLLARS"
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
                name="username"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'}/>,
                }}
                placeholder={'Username'}
                rules={[
                  {
                    required: true,
                    pattern: /^[a-zA-Z0-9_-]{2,16}$/,
                    message: '请输入用户名!(2到16位字母、数字、下划线)',
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'}/>,
                }}
                placeholder={'Password'}
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
                name="usernameR"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={'prefixIcon'}/>,
                }}
                placeholder={'Username'}
                rules={[
                  {
                    required: true,
                    pattern: /^[a-zA-Z0-9_]{2,16}$/,
                    message: '请输入用户名!(2到16位字母、数字、下划线)',
                  },
                ]}
              />
              <ProFormText.Password
                name="passwordR"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={'prefixIcon'}/>,
                }}
                placeholder={'Password'}
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
                placeholder={'ConfirmPassword'}
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
`

export default Login