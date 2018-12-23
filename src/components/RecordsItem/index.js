/* global document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './RecordsItem.scss';

const propTypes = {};

const defaultProps = {};
const codeType = {
  1: '注',
  2: '注',
  3: '奖',
  4: '奖',
  5: '转',
  6: '上',
  7: '转',
  8: '下',
  9: '佣',
  10: '上',
  11: '下',
  12: '团',
  13: '上',
  14: '团',
  15: '下',
};
class RecordsItem extends Component {
  static remark = '';

  state = {
    showRemark: false,
  }

  componentDidMount() {
    document.body.addEventListener('click', this.handleBodyClick);
  }

  componentWillUnmount() {
    document.body.removeEventListener('click', this.handleBodyClick);
  }

  handleBodyClick = () => {
    this.setState({
      showRemark: false,
    });
  }

  changeRemarkState = () => {
    const { remarks } = this.props;
    RecordsItem.remark = remarks;
    this.setState(state => ({
      showRemark: !state.showRemark,
    }));
  }

  render() {
    const {
      remarks,
      code,
      typeText,
      balance,
      amount,
      createTime,
    } = this.props;

    const { showRemark } = this.state;
    return (
      <div>
        <div className={styles.item} onClick={this.changeRemarkState}>

          <div className={styles.icon}>
            {codeType[code]}
          </div>
          <div className={styles.right}>
            <div className={styles.line}>
              <span>{typeText}</span>
              <span>{`[${amount}]`}</span>
            </div>
            <div className={`${styles.line} ${styles.info}`}>
              <span>{createTime}</span>
              <span>
                余额：
                {balance}
              </span>
            </div>
          </div>

        </div>
        {(showRemark && RecordsItem.remark === remarks) && (
          <div className={styles.remarks}>
            详情：
            {remarks}
          </div>
        )}
      </div>
    );
  }
}
RecordsItem.propTypes = propTypes;
RecordsItem.defaultProps = defaultProps;

export default RecordsItem;
