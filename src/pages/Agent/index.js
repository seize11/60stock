/* global document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import QRCode from 'qrcode.react';
import { connect } from 'react-redux';
import Link from '../../components/Link';
import { LOADING_STATE } from '../../constants/symbols';
import { getAccountBalance } from '../../actions/account';
import { getAgentInfo } from '../../actions/agent';
import { logout } from '../../actions/user';
import HistoryUtils from '../../utils/history';
import styles from './Agent.scss';

class Agent extends Component {
  propTypes = {};

  defaultProps = {};

  componentDidMount() {
    this.initAgentPage();
  }

  initAgentPage = () => {
    const { getAgentInfoAction, agent: { loadingState } } = this.props;
    if (loadingState === LOADING_STATE.DEFAULT) {
      getAgentInfoAction();
    }
  }

  copyPromotionUrl = () => {
    const inputText = this.promotionNode;
    inputText.focus();
    inputText.setSelectionRange(0, inputText.value.length);

    document.execCommand('copy', true);
  }

  render() {
    const { agent: { loadingState, settlementPoint, referralCode } } = this.props;
    return (
      <div className={styles.agent}>
        {loadingState === LOADING_STATE.SUCCESS && (
          <div className={styles.card}>
            <QRCode value={referralCode} className={styles.qrcode} />
            <div className={styles.right}>
              <div className={styles.line}>
                <span>我的返点</span>
                <span>
                  {settlementPoint}
                  %
                </span>
              </div>
              <div className={styles.line}>
                <span>我的推荐码</span>
                <span>{referralCode}</span>
              </div>
              <input
                type="text"
                value={referralCode}
                style={{ height: '0', opacity: 0 }}
                ref={(c) => { this.promotionNode = c; }}
              />
              <div className={styles.copy} onClick={this.copyPromotionUrl}>复制推广链接</div>
            </div>
          </div>
        )}


        <div className={styles.menu}>
          <Link className={styles.item} to="/">
            <div className={`${styles.icon} ${styles.role}`} />
            <div className={styles.title}>代理规则</div>
          </Link>
          <Link className={styles.item} to="/agent_list">
            <div className={`${styles.icon} ${styles.list}`} />
            <div className={styles.title}>我的代理</div>
          </Link>
          <Link className={styles.item} to="/">
            <div className={`${styles.icon} ${styles.float}`} />
            <div className={styles.title}>流水查询</div>
          </Link>
          <Link className={styles.item} to="/">
            <div className={`${styles.icon} ${styles.balance}`} />
            <div className={styles.title}>返点结算</div>
          </Link>
        </div>
      </div>
    );
  }
}
export default connect(
  state => ({
    agent: state.agent,
  }),
  {
    getAgentInfoAction: getAgentInfo,
    getAccountBalanceAction: getAccountBalance,
  },
)(Agent);
