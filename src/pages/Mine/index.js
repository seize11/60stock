import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Link from '../../components/Link';
import { getAccountBalance } from '../../actions/account';
import { logout } from '../../actions/user';
import HistoryUtils from '../../utils/history';
import styles from './Mine.scss';

class Mine extends Component {
  propTypes = {};

  defaultProps = {};

  componentDidMount() {
    const { getAccountBalanceAction } = this.props;
    getAccountBalanceAction();
  }

  handleLogout = () => {
    const { logoutAction } = this.props;
    logoutAction(() => {
      HistoryUtils.replace('/login');
    });
  }

  render() {
    const { account: { balance }, userName } = this.props;
    return (
      <div className={styles.mine}>
        <div className={styles.logout} onClick={this.handleLogout}>退出登录</div>
        <div className={styles.info}>
          <div className={styles.profile} />
          <div className={styles.name}>
            用户名：
            {userName}
          </div>
          <div className={styles.balance}>
            中心余额：
            {balance}
          </div>
        </div>

        <div className={styles.menu}>
          <Link className={styles.item} to="/recharge">
            <span className={styles.text}>存款</span>
          </Link>
          <Link className={styles.item} to="/get_cash">
            <span className={styles.text}>取款</span>
          </Link>
          <Link className={styles.item} to="/transfer">
            <span className={styles.text}>转账</span>
          </Link>
          <Link className={styles.item} to="/bill_record">
            <span className={styles.text}>交易记录</span>
          </Link>
        </div>

        <div className={styles.card}>
          <div className={styles.line}>
            <Link className={styles.item} to="mine">
              <span className={styles.text}>注单</span>
            </Link>
            <Link className={styles.item} to="/card_detail">
              <span className={styles.text}>银行卡管理</span>
            </Link>
          </div>
          <div className={styles.line}>
            <Link className={styles.item} to="/change_password">
              <span className={styles.text}>密码管理</span>
            </Link>
            <Link className={styles.item} to="mine">
              <span className={styles.text}>关于万丰</span>
            </Link>
          </div>

        </div>
      </div>
    );
  }
}
export default connect(
  state => ({
    account: state.account,
    userName: state.user.name,
  }),
  {
    logoutAction: logout,
    getAccountBalanceAction: getAccountBalance,
  },
)(Mine);
