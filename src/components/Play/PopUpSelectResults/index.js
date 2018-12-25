import React, { Component } from "react";
import PropTypes from "prop-types";
import History from "../../../utils/history";

import styles from "./PopUpSelectResults.scss";
import SelfModal from "../SelfModal";
import { Checkbox, Icon, Grid, SwipeAction, Modal } from "antd-mobile";

const CheckboxItem = Checkbox.CheckboxItem;
const operation = Modal.operation;
const propTypes = {
  leftContent: PropTypes.any,
  rightContent: PropTypes.any,
  midcontent: PropTypes.any,
  leftNumber: PropTypes.any,
  rightNumber: PropTypes.any,
  midNumber: PropTypes.any
};

const defaultProps = {
  leftContent: "额  度",
  numberList: [1, 2, 33, 4, 21, 3, 4, 4, 3, 6],
  details: [
    {
      name: "金额",
      value: [23, 23, 12, 45, 12, 45]
    },
    {
      name: "详情",
      value: [23, 23, 12, 45, 12, 45]
    },
    {
      name: "下注",
      value: [23, 23, 12, 45, 12, 45]
    },
    {
      name: "赔率",
      value: [23, 23, 12, 45, 12, 45]
    }
  ]
};

class PopUpSelectResults extends Component {
  state = {
    modal1: false,
    showPlaySecondBar: true,
    isShowDetail: true,
    baseAmount: 5,
    isShowModal: false,
    amountList: [
      {
        key: 0,
        name: 5
      },
      {
        key: 1,
        name: 10
      },
      {
        key: 2,
        name: 20
      },
      {
        key: 3,
        name: 50
      },
      {
        key: 4,
        name: 100
      },
      {
        key: 5,
        name: 500
      }
    ],
    tableList: [1, 2, 3, 4, 7]
  };
  onChange(e) {}
  isShowDetail = () => {
    this.setState({ isShowDetail: !this.state.isShowDetail });
  };
  changeBaseAmount = value => {
    this.setState({ baseAmount: value });
  };
  isShowModal = () => {
    this.setState({ isShowModal: !this.state.isShowModal });
  };

  render() {
    const { details } = this.props;
    const { amountList, tableList, isShowDetail } = this.state;

    return (
      <div className={styles.PopUpSelectResults}>
        {isShowDetail ? (
          <div className={styles.display}>
            <div className={styles.title}>
              <div className={styles.titleIcon}>
                <Icon type="down" size="md" onClick={this.isShowDetail} />
              </div>
              急速赛车
            </div>
            <table className={styles.table}>
              <SwipeAction
                autoClose
                right={
                  [
                    {
                      text: "Cancel",
                      onPress: () => console.log("cancel"),
                      style: { backgroundColor: "#ddd", color: "white" }
                    },
                    {
                      text: "Delete",
                      onPress: () => console.log("delete"),
                      style: { backgroundColor: "#F4333C", color: "white" }
                    }
                  ] // style={{ width: "50%" }} // className={styles.tableItem}
                }
                onOpen={() => console.log("global open")}
                onClose={() => console.log("global close")}
              >
                <tr className={styles.tableHead}>
                  <th>金额</th>
                  <th>详情</th>
                  <th>下注</th>
                  <th>赔率</th>
                  <th>操作</th>
                </tr>
              </SwipeAction>
              {tableList.map((item, index) => (
                <SwipeAction
                  style={{ backgroundColor: "gray" }}
                  autoClose
                  right={[
                    {
                      text: "Cancel",
                      onPress: () => console.log("cancel"),
                      style: { backgroundColor: "#ddd", color: "white" }
                    },
                    {
                      text: "Delete",
                      onPress: () => console.log("delete"),
                      style: { backgroundColor: "#F4333C", color: "white" }
                    }
                  ]}
                  onOpen={() => console.log("global open")}
                  onClose={() => console.log("global close")}
                >
                  {/* <Grid
                    data={[1, 2, 3, 4]}
                    columnNum={4}
                    itemStyle={{ height: "1rem", padding: 0 }}
                    renderItem={(dataItem, i) => <td>1</td>}
                  /> */}
                  <tr className={styles.tableBody}>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>1</td>
                    <td>删除</td>
                  </tr>
                </SwipeAction>
              ))}
            </table>
          </div>
        ) : null}
        <div className={styles.grayPop} onClick={this.isShowDetail}>
          已选2注
          {isShowDetail ? (
            <Icon type="down" size="xxs" />
          ) : (
            <Icon type="up" size="xxs" />
          )}
        </div>
        <div className={styles.detailsWrapper}>
          {/* <Grid
            data={details}
            columnNum={4}
            itemStyle={{ height: "1rem" }}
            renderItem={(dataItem, i) => <div>{dataItem.name}</div>}
          /> */}
        </div>
        <div className={styles.amount_list}>
          {amountList.map(item => (
            <div onClick={this.changeBaseAmount.bind(this, item.name)}>
              {item.name}
            </div>
          ))}
        </div>
        <div className={styles.confirmAmount}>
          <input
            type="text"
            placeholder="输入金额"
            className={styles.Amoutinput}
            value={this.state.baseAmount}
          />
          {/* <input
            type="text"
            className={styles.preAmoutInput}
            placeholder="语塞"
          /> */}
          <CheckboxItem
            onChange={e => this.onChange(e)}
            className={styles.preAmoutInput}
          />
          <div className={styles.preAmoutText}>预设金额</div>
          <div className={styles.cancel}>取 消</div>
          <div className={styles.confirmButton} onClick={this.isShowModal}>
            确认
          </div>
        </div>
        {this.state.isShowModal ? (
          <SelfModal isShowModal={this.isShowModal} />
        ) : null}
      </div>
    );
  }
}

PopUpSelectResults.propTypes = propTypes;
PopUpSelectResults.defaultProps = defaultProps;

export default PopUpSelectResults;
