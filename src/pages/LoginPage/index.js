/* global  */
import React, { Component } from "react";
// import PropTypes from 'prop-types';
import { Toast } from "antd-mobile";
import { connect } from "react-redux";
import { createForm } from "rc-form";
import { getPublicKey, getAesKey } from "../../actions/base";
import { login } from "../../actions/user";
import { getBase64Encrypt } from "../../utils/info";
import HistoryUtils from "../../utils/history";

import "../../lib/jsencrypt";

import styles from "./LoginPage.scss";

const propTypes = {};

const defaultProps = {};

class LoginPage extends Component {
  componentDidMount() {
    Toast.loading("加载中...", 0);
    const { getPublicKeyAction } = this.props;
    getPublicKeyAction(this.handleGetPublicKey);
  }

  handleGetPublicKey = res => {
    const {
      getAesKeyAction,
      base: { randomStr }
    } = this.props;
    getAesKeyAction(
      {
        key: res.key,
        aesKey: getBase64Encrypt(randomStr, res.data)
      },
      () => {
        Toast.hide();
      }
    );
  };

  login = () => {
    Toast.loading("正在登陆", 0);
    const {
      form: { validateFields },
      loginAction
    } = this.props;
    validateFields((error, value) => {
      loginAction(
        {
          account: value.account,
          password: value.password
        },
        () => {
          Toast.hide();
          alert(444);
          HistoryUtils.replace("/");
        }
      );
    });
  };

  render() {
    const {
      form: { getFieldProps }
    } = this.props;
    return (
      <div className={styles.login}>
        <div className={styles.main}>
          <div className={`${styles.input} ${styles.account}`}>
            <input
              {...getFieldProps("account")}
              type="text"
              key="account"
              placeholder="用户名"
            />
          </div>

          <div className={`${styles.input} ${styles.password}`}>
            <input
              {...getFieldProps("password")}
              type="password"
              key="password"
              placeholder="用户密码"
            />
          </div>

          <div className={styles["enter-btn"]} onClick={this.login} />
          <div className={styles.help}>
            <span>忘记密码</span>
            <span>用户注册</span>
          </div>
          <div className={styles["enter-no-login"]} />
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = propTypes;
LoginPage.defaultProps = defaultProps;
export default connect(
  state => ({
    base: state.base
  }),
  {
    getPublicKeyAction: getPublicKey,
    getAesKeyAction: getAesKey,
    loginAction: login
  }
)(createForm()(LoginPage));
