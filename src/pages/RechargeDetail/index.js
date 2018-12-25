/* global window */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Toast } from "antd-mobile";
import Page from "../../components/Page";
import Button from "../../components/Button";
import HistoryUtils from "../../utils/history";

import styles from "./RechargeDetail.scss";

const renderTopBarContent = () => <div className={styles.notice}>存款</div>;
const renderTopBarRightContent = () => <div className={styles.notice} />;

function RechargeDetail(props) {
  const {
    location: { state }
  } = props;
  const alipayClick = data => () => {
    window.location.href = data;
  };
  return (
    <Page
      className={styles.recharge}
      renderTopBarContent={renderTopBarContent}
      // renderTopBarRightContent={renderTopBarRightContent}
    >
      <div className={styles["lotty-scan"]}>
        <div className={styles["scan-title"]}>
          <div className={styles.info}>支付金额（元）</div>
          <div className={styles.money}>{state.amount}</div>
        </div>
        <div className={styles["scan-qrcode"]}>
          <img src={state.path} alt="" className={styles.qrcode} />
          <div className={styles.info}>
            <div>
              <p>请严格按照支付金额支付，</p>
              <p>充值金额足额到账，请勿重复支付！</p>
            </div>
            {state.type === 2 && (
              <div
                onClick={alipayClick(state.jumpPath)}
                className={styles.alipay}
              >
                {`点击到${state.name}支付${state.amount}元`}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles["lotty-order"]}>
        <div className={styles["order-row"]}>
          <span>下单时间</span>
          <span id="orderTime">{state.createTime}</span>
        </div>
        <div className={styles["order-row"]}>
          <span>订单编号</span>
          <span id="orderNo">{state.ordNo}</span>
        </div>
        <div className={styles["order-row"]}>
          <span>在次之前支付</span>
          <span id="endTime">{state.endTime}</span>
        </div>
      </div>
      <Button>支付结果查询中...</Button>
      <div className={styles["lotty-order"]}>
        <div className={styles["order-row"]}>
          <span>温馨提示</span>
        </div>
        <div className={styles["order-row"]}>
          <span>1.若您支付过程中遇到问题且未完成支付，请重新下单。</span>
        </div>
        <div className={styles["order-row"]}>
          <span>2.若您支付遇到困难，联系线上客服获得帮助。</span>
        </div>
      </div>
    </Page>
  );
}
export default RechargeDetail;
