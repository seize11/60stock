import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createForm } from 'rc-form';
import { Toast, Modal, Picker } from 'antd-mobile';
import Page from '../../components/Page';
import Button from '../../components/Button';
import { getAccountDetails } from '../../actions/account';
import { transfer } from '../../actions/user';
import styles from './Transfer.scss';

const propTypes = {};

const defaultProps = {};

class Transfer extends Component {
  static propTypes = {};

  static defaultProps = {};

  state = {
    showModal: false,
    isTransferToCenter: true,
  }

  componentDidMount() {
    this.getAccountDetails();
  }

  transferClick = () => {
    Toast.loading('正在操作', 0);
    const { form: { validateFields }, transferAction } = this.props;
    const { isTransferToCenter } = this.state;
    validateFields((error, value) => {
      transferAction({
        amount: value.cash,
        operationType: isTransferToCenter ? 2 : 1, //  1表示充值 2提现
        accountType: value.select[0],
      }, this.transferSucc);
    });
  }

  transferSucc = () => {
    Toast.hide();
    this.setState({ showModal: true });
  }

  getAccountDetails = () => {
    Toast.loading('正在加载', 0);
    const {
      getAccountDetailsAction,
      form: { setFieldsValue, validateFields },
    } = this.props;
    getAccountDetailsAction((res) => {
      Toast.hide();
      validateFields((error, value) => {
        if (!value.select) {
          setFieldsValue({
            select: [res[1].accountType],
          });
        }
      });
    }, () => Toast.hide());
  }

  changeSelect = isTransferToCenter => (e) => {
    if (isTransferToCenter) {
      e.stopPropagation();
    }
    this.setState({ isTransferToCenter });
  }

  renderTopBarContent = () => (
    <div className={styles.notice}>
      转账
    </div>
  )

  render() {
    const {
      account: { details },
      form: { getFieldProps, validateFields },
    } = this.props;
    const { showModal, isTransferToCenter } = this.state;
    let selectItem = {};
    validateFields((error, value) => {
      if (!value.select) {
        return;
      }
      selectItem = details.find(item => value.select[0] === item.accountType);
    });
    const pickerData = details.filter(item => item.accountType !== 1).map(item => ({
      value: item.accountType,
      label: item.accountName,
    }));
    if (details.length === 0) {
      return (
        <Page
          renderTopBarContent={this.renderTopBarContent}
        />
      );
    }

    return (
      <Page
        // className={styles.recharge}
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
              this.getAccountDetails();
            },
          }]}
        >
          <div>转账成功</div>
        </Modal>
        <div className={styles.transferList}>
          {details.map(item => (
            <div
              className={styles.item}
              key={item.accountType}
            >
              <div
                className={`${styles.icon} ${styles[`icon_${item.accountType}`]}`}
              />
              <div className={styles.details}>
                <span className={styles.name}>{item.accountName}</span>
                <span>{item.balance}</span>
              </div>
            </div>
          ))}
        </div>
        <div className={styles.info}>
          <div className={styles.title}>
            存款金额
          </div>
          <div className={styles.count}>
            <span>¥</span>
            <input
              {...getFieldProps('cash')}
              type="number"
              className={styles.money}
              placeholder="请输入转账金额"
            />
          </div>
        </div>

        <Picker
          {...getFieldProps('select')}
          data={pickerData}
          cols={1}
        >
          <div className={styles.select}>
            {isTransferToCenter ? (
              <span
                onClick={this.changeSelect(false)}
              >
                {selectItem.accountName}
              </span>
            ) : (
              <span
                onClick={this.changeSelect(true)}
              >
                  中心账户
              </span>
            )}
            {isTransferToCenter ? (
              <span
                className={styles.active}
                onClick={this.changeSelect(true)}
              >
                  中心账户
              </span>
            ) : (
              <span
                className={styles.active}
                onClick={this.changeSelect(false)}
              >
                {selectItem.accountName}
              </span>
            )}
          </div>
        </Picker>
        <Button onClick={this.transferClick}>立即转账</Button>
      </Page>
    );
  }
}

Transfer.propTypes = propTypes;
Transfer.defaultProps = defaultProps;

export default connect(
  state => ({
    account: state.account,
  }),
  {
    getAccountDetailsAction: getAccountDetails,
    transferAction: transfer,
  },
)(createForm()(Transfer));
