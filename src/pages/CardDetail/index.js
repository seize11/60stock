import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createForm } from 'rc-form';
import { Toast, Modal } from 'antd-mobile';
import Page from '../../components/Page';
import Button from '../../components/Button';
import { getAccountBalance } from '../../actions/account';
import { getBankCard } from '../../actions/user';
import HistoryUtils from '../../utils/history';
import styles from './CardDetail.scss';

const propTypes = {};

const defaultProps = {};

class CardDetail extends Component {
  static propTypes = {};

  static defaultProps = {};

  static fillSpace(word, type = 'phone') {
    if (typeof word !== 'string') {
      return word;
    }
    if (type === 'phone') {
      return word.replace(/(\d{3})(\d{4})/, '$1 $2 ');
    }
    if (type === 'bankNo') {
      if (/\S{5}/.test(word)) {
        return word.replace(/\s/g, '').replace(/(.{4})/g, '$1 ');
      }
      return word;
    }
    return word;
  }

  state = {
    bankName: '',
    cardNo: null,
    mobile: null,
    realName: '',
  }

  componentDidMount() {
    this.getAccountCard();
  }

  doChangeCardInfo = () => {
    HistoryUtils.push({
      pathname: '/bind_card',
      state: this.state,
    });
  }

  getAccountCard = () => {
    Toast.loading('正在加载', 0);
    const { getBankCardAction } = this.props;
    getBankCardAction(
      (res) => {
        Toast.hide();
        this.setState({
          bankName: res.bankName,
          cardNo: CardDetail.fillSpace(res.cardNo, 'bankNo'),
          mobile: CardDetail.fillSpace(res.mobile),
          realName: res.realName,
        });
      },
      (err) => {
        if (err.code === -100) {
          Toast.hide();
          HistoryUtils.replace('/bind_card');
        }
      },
    );
  }

  renderTopBarContent = () => (
    <div className={styles.notice}>
      银行卡管理
    </div>
  )

  render() {
    const {
      bankName, cardNo, realName, mobile,
    } = this.state;

    if (!cardNo || !mobile) {
      return (
        <Page
          renderTopBarContent={this.renderTopBarContent}
        />
      );
    }
    return (
      <Page
        renderTopBarContent={this.renderTopBarContent}
      >
        <div className={styles.bankCard}>
          <div>{bankName}</div>
          <div>{cardNo}</div>
        </div>

        <div className={styles.info}>
          <div className={styles.line}>
            <span>预留手机号</span>
            <span>{mobile}</span>
          </div>
          <div className={styles.line}>
            <span>持卡人</span>
            <span>{realName}</span>
          </div>
        </div>

        <Button onClick={this.doChangeCardInfo}>修改绑定</Button>
      </Page>
    );
  }
}

CardDetail.propTypes = propTypes;
CardDetail.defaultProps = defaultProps;

export default connect(
  state => ({
    account: state.account,
  }),
  {
    getBankCardAction: getBankCard,
  },
)(createForm()(CardDetail));
