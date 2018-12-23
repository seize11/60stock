import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createForm } from 'rc-form';
import { Toast, Modal } from 'antd-mobile';
import Page from '../../components/Page';
import Button from '../../components/Button';
import { getAccountBalance } from '../../actions/account';
import { withdraw } from '../../actions/user';
import styles from './GetCash.scss';

const propTypes = {};

const defaultProps = {};

class GetCash extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    showModal: false,
  }

  componentDidMount() {
    this.getAccountBalance();
  }

  getCashClick = () => {
    const {
      form: { validateFields },
      withdrawAction,
      account: { balance },
    } = this.props;
    validateFields((error, value) => {
      if (value.cash < 100) {
        Toast.info('取款金额要大于等于100元');
        return;
      }

      if (value.cash > balance) {
        Toast.info('取款金额不能大于余额');
        return;
      }

      Toast.loading('正在操作', 0);
      withdrawAction({
        amount: value.cash,
      }, this.getCashSucc);
    });
  }

  getCashSucc = () => {
    Toast.hide();
    this.setState({ showModal: true });
  }

  getAccountBalance = () => {
    Toast.loading('正在加载余额', 0);
    const { getAccountBalanceAction } = this.props;
    getAccountBalanceAction(() => Toast.hide());
  }

  renderTopBarContent = () => (
    <div className={styles.notice}>
      取款
    </div>
  )

  render() {
    const {
      account: { balance },
      form: { getFieldProps },
    } = this.props;
    const { showModal } = this.state;
    return (
      <Page
        renderTopBarContent={this.renderTopBarContent}
      >
        <Modal
          visible={showModal}
          transparent
          maskClosable={false}
          title="温馨提示"
          footer={[{
            text: '我知道了',
            onPress: () => {
              this.setState({ showModal: false });
              this.getAccountBalance();
            },
          }]}
        >
          <div>转账成功</div>
        </Modal>
        <div className={styles.info}>
          <div className={styles.title}>
            <span>取款金额</span>
            <span>
              当前余额
              <span style={{ color: '#d0aa07' }}>
                {' '}
                {balance}
              </span>
              （元）
            </span>
          </div>
          <div className={styles.count}>
            <span>¥</span>
            <input
              {...getFieldProps('cash')}
              type="number"
              className={styles.money}
              placeholder="请输入取款金额"
            />
          </div>
        </div>

        <Button onClick={this.getCashClick}>确认</Button>
      </Page>
    );
  }
}

GetCash.propTypes = propTypes;
GetCash.defaultProps = defaultProps;

export default connect(
  state => ({
    account: state.account,
  }),
  {
    getAccountBalanceAction: getAccountBalance,
    withdrawAction: withdraw,
  },
)(createForm()(GetCash));
