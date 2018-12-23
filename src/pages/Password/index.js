import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, InputItem, Toast } from 'antd-mobile';
import Page from '../../components/Page';
import Button from '../../components/Button';
import { changePassword } from '../../actions/user';
import HistoryUtils from '../../utils/history';
import styles from './Password.scss';

const propTypes = {};

const defaultProps = {};

class Password extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {
      oldPassword: '',
      password: '',
      passwordAg: '',
    };
  }

  componentDidMount() {

  }

  doPasswordChange = () => {
    const { changePasswordAction } = this.props;
    const {
      oldPassword, password, passwordAg,
    } = this.state;

    if (password !== passwordAg) {
      Toast.info('两次输入密码不一致', 1.5);
      return;
    }
    changePasswordAction({
      newPassword: password,
      oldPassword,
    }, () => {
      HistoryUtils.replace('/mine');
    });
  }

  onInputChange = type => (value) => {
    this.setState({
      [type]: value,
    });
  }

  renderTopBarContent = () => (
    <div className={styles.notice}>
      银行卡管理
    </div>
  )

  render() {
    const { location: { state } } = this.props;
    const {
      oldPassword,
      password,
      passwordAg,
    } = this.state;

    return (
      <Page
        renderTopBarContent={this.renderTopBarContent}
      >
        <List renderHeader={() => '为了您的账户安全,手机号无法修改，如需修改联系客服'}>
          <InputItem
            value={oldPassword}
            type="password"
            onChange={this.onInputChange('oldPassword')}
            placeholder="请输入原密码"
          >
            原密码
          </InputItem>
          <InputItem
            value={password}
            onChange={this.onInputChange('password')}
            type="password"
            onBlur={this.checkBankName}
            placeholder="请输入新密码"
          >
          新密码
          </InputItem>
          <InputItem
            value={passwordAg}
            onChange={this.onInputChange('passwordAg')}
            type="password"
            placeholder="请确认新密码"
          >
          确认新密码
          </InputItem>

        </List>
        <Button onClick={this.doPasswordChange}>完成</Button>
      </Page>
    );
  }
}

Password.propTypes = propTypes;
Password.defaultProps = defaultProps;

export default connect(
  state => ({

  }), {
    changePasswordAction: changePassword,
  },
)(Password);
