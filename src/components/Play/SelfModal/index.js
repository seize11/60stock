import React, { Component } from "react";
import PropTypes from "prop-types";
import History from "../../../utils/history";

import styles from "./index.scss";

const propTypes = {
  leftContent: PropTypes.any
};

const defaultProps = {
  numberList: [1, 2, 33, 4, 21, 3, 4, 4, 3, 6]
};

class SelfModal extends Component {
  state = {
    showPlaySecondBar: true,
    list: [
      {
        a: 12,
        b: 12,
        c: 12
      },
      {
        a: 12,
        b: 12,
        c: 12
      },
      {
        a: 12,
        b: 12,
        c: 12
      },
      {
        a: 12,
        b: 12,
        c: 12
      },
      {
        a: 12,
        b: 12,
        c: 12
      },
      {
        a: 12,
        b: 12,
        c: 12
      },
      {
        a: 12,
        b: 12,
        c: 12
      },
      {
        a: 12,
        b: 12,
        c: 12
      },
      {
        a: 12,
        b: 12,
        c: 12
      }
    ]
  };
  render() {
    const { list } = this.state;

    return (
      <div className={styles.SelfModal}>
        <div className={styles.outer}>
          <div className={styles.title}>投 注 成 功</div>
          <div className={styles.modalContent}>
            <div className={styles.thead}>
              <span>玩法</span>
              <span>金额</span>
              <span>可赢奖金</span>
            </div>
            <div className={styles.tbodyWrappper}>
              {list.map(item => (
                <div className={styles.tbody}>
                  <span>{item.a}</span>
                  <span>{item.b}</span>
                  <span>{item.c}</span>
                </div>
              ))}
            </div>
            <div className={styles.total}>
              <span>总计10注</span>
              <span>4000</span>
              <span>396.00</span>
            </div>
            <div className={styles.confirm}>
              <span onClick={this.props.isShowModal}>确 认</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

SelfModal.propTypes = propTypes;
SelfModal.defaultProps = defaultProps;

export default SelfModal;
