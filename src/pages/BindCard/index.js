import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { List, InputItem } from 'antd-mobile';
import Page from '../../components/Page';
import Button from '../../components/Button';
import { getBankCard, chenkBankNo, bindCard } from '../../actions/user';
import HistoryUtils from '../../utils/history';
import styles from './BindCard.scss';

const propTypes = {};

const defaultProps = {};

class BindCard extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);
    const { state } = props.location;
    this.state = {
      bankName: (state && state.bankName) || '',
      cardNo: (state && state.cardNo) || null,
      mobile: (state && state.mobile) || null,
      realName: (state && state.realName) || '',
    };
  }

  componentDidMount() {

  }

  doBindCard = () => {
    const { bindCardAction } = this.props;
    const {
      bankName, cardNo, mobile, realName,
    } = this.state;
    bindCardAction({
      bankName,
      cardNo: cardNo && cardNo.replace(/\s+/g, ''),
      mobile: mobile && mobile.replace(/\s+/g, ''),
      realName,
    }, () => {
      HistoryUtils.replace('/card_detail');
    });
  }

  checkBankName = () => {
    const { chenkBankNoAction } = this.props;
    const { cardNo, realName } = this.state;
    chenkBankNoAction({
      cardNo: cardNo && cardNo.replace(/\s+/g, ''),
      name: realName,
    }, (res) => {
      this.setState({
        bankName: res.bankName,
      });
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
      bankName, realName, mobile, cardNo,
    } = this.state;

    return (
      <Page
        renderTopBarContent={this.renderTopBarContent}
      >
        <List renderHeader={() => '为了您的账户安全,手机号无法修改，如需修改联系客服'}>
          <InputItem
            value={realName}
            onChange={this.onInputChange('realName')}
            placeholder="请输入持卡人姓名"
          >
            持卡人
          </InputItem>
          <InputItem
            value={cardNo}
            onChange={this.onInputChange('cardNo')}
            type="bankCard"
            onBlur={this.checkBankName}
            placeholder="请输入银行卡号"
          >
          银行卡号
          </InputItem>
          {bankName && (
            <InputItem
              value={bankName}
              disabled
            >
              开户银行
            </InputItem>
          )}
          <InputItem
            value={mobile}
            onChange={this.onInputChange('mobile')}
            type="phone"
            placeholder="请输入手机号"
          >
          手机号
          </InputItem>

        </List>
        <Button onClick={this.doBindCard}>+绑定银行卡</Button>
      </Page>
    );
  }
}

BindCard.propTypes = propTypes;
BindCard.defaultProps = defaultProps;

export default connect(
  state => ({
    account: state.account,
  }),
  {
    getBankCardAction: getBankCard,
    bindCardAction: bindCard,
    chenkBankNoAction: chenkBankNo,
  },
)(BindCard);
