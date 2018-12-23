import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Toast } from 'antd-mobile';
import classnames from 'classnames';
import { createForm } from 'rc-form';
import Page from '../../components/Page';
import { getRechargeCondition, rechargeApply, changeConditionType } from '../../actions/user';
import HistoryUtils from '../../utils/history';
import styles from './Recharge.scss';


class Recharge extends Component {
  componentDidMount() {
    this.initRecharge();
  }

  initRecharge = () => {
    const { getRechargeConditionAction, user } = this.props;
    if (!user.rechargeCondition) {
      Toast.loading('正在加载', 0);
      getRechargeConditionAction(() => Toast.hide());
    }
  }

  changeConditionType = type => () => {
    const { changeConditionTypeAction } = this.props;
    changeConditionTypeAction(type);
  }

  doRecharge = () => {
    const { form: { validateFields }, user, rechargeApplyAction } = this.props;
    const { rechargeCondition, activeConditionType } = user;
    const activeCondition = rechargeCondition && rechargeCondition.find(item => item.type === activeConditionType);
    validateFields((error, value) => {
      rechargeApplyAction({
        amount: value.money,
        type: activeCondition.type,
      }, res => HistoryUtils.push({
        pathname: '/recharge_detail',
        state: {
          ...res,
          type: activeCondition.type,
          name: activeCondition.name,
        },
      }));
    });
  }

  renderTopBarContent = () => (
    <div className={styles.notice}>
      存款
    </div>
  )

  renderTopBarRightContent = () => (
    <div className={styles.notice} />
  )

  render() {
    const { user, form: { getFieldProps } } = this.props;
    const { rechargeCondition, activeConditionType } = user;
    const activeCondition = rechargeCondition && rechargeCondition.find(item => item.type === activeConditionType);
    return (
      <Page
        className={styles.recharge}
        renderTopBarContent={this.renderTopBarContent}
        renderTopBarRightContent={this.renderTopBarRightContent}
      >
        <div className={styles.conditionList}>
          {rechargeCondition && rechargeCondition.map((item) => {
            const cls = classnames(styles.item, {
              [styles[`condition_${item.type}`]]: true,
              [styles.active]: item.type === activeConditionType,
            });
            return (
              <div
                className={cls}
                onClick={this.changeConditionType(item.type)}
              >
                <span>{item.name}</span>
              </div>
            );
          })}
        </div>

        {activeCondition && (
          <div className={styles.info}>
            <div className={styles.title}>存款金额</div>
            <div className={styles.count}>
              <span>¥</span>
              <input
                {...getFieldProps('money')}
                type="number"
                className={styles.money}
                placeholder={`${activeCondition.min}-${activeCondition.max}`}
              />
            </div>
          </div>
        )}

        {activeCondition && (
          <div className={styles.rechargeBtn} onClick={this.doRecharge}>确认</div>
        )}
      </Page>
    );
  }
}
export default connect(
  state => ({
    user: state.user,
  }),
  {
    getRechargeConditionAction: getRechargeCondition,
    changeConditionTypeAction: changeConditionType,
    rechargeApplyAction: rechargeApply,
  },
)(createForm()(Recharge));
