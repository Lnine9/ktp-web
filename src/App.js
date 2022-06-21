import React from "react";
import {Redirect, Route, Router, Switch} from "react-router-dom";
import Login from "./pages/login/Login";
import {ConfigProvider} from "antd";
import Home from "./pages/home/Home";
import history from "./utils/history";

export default function App() {

  ConfigProvider.config({
    theme:{
      primaryColor: '#008C8C'
    }
  })

  return (
    <ConfigProvider prefixCls=''>
      <Router history={history}>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path='/home' component={Home} />
          <Route path="/">
            <Redirect to='/home' />
          </Route>
        </Switch>
      </Router>
    </ConfigProvider>
  );
}
