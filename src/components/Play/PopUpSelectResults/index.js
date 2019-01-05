import React, { Component } from "react";
import PropTypes from "prop-types";
import History from "../../../utils/history";
import { connect } from "react-redux";
import { decrypt } from "../../../utils/info";

import styles from "./PopUpSelectResults.scss";
import SelfModal from "../SelfModal";
import { Checkbox, Icon, Grid, SwipeAction, Modal } from "antd-mobile";
import {
  gobet,
  changeSelectPopsAction,
  changeColorIdsAction
} from "../../../../src/actions/play";

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
    selectnum: 0,
    showPlaySecondBar: true,
    isShowDetail: false,
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
    tableList: []
  };
  onChange(e) {}
  isShowDetail = () => {
    this.setState({ isShowDetail: !this.state.isShowDetail });
  };
  changeBaseAmount = value => {
    this.setState({ baseAmount: value });
  };
  betANDisShowModal = () => {
    // this.setState({ isShowModal: !this.state.isShowModal });
    //待确定code
    console.log(this.props);
    let selectLoterry = this.props.selectIds.map(item => {
      return { code: item.code, amount: this.state.baseAmount };
    });
    console.log("object :", selectLoterry);
    let data = {
      lotteryId: 1,
      expect: this.props.lottery_info.expect,
      betDetails: selectLoterry
    };
    console.log("object2 :", data);
    this.props.gobet(data);
  };
  UNSAFE_componentWillReceiveProps(nextprops) {
    console.log(nextprops);
    this.setState({ selectnum: nextprops.selectIds.length });
    if (nextprops.isbet != this.props.isbet && nextprops.isbet) {
      this.setState({ isShowModal: !this.state.isShowModal });
    }
  }
  clearALLSelect = () => {
    this.props.changeSelectPopsAction([]);
    this.props.changeColorIdsAction([]);
  };
  delete = dataItem => {
    console.log(dataItem);
    let delIndex = this.props.selectIds.filter(
      item => item.code != dataItem.code
    );
    this.props.changeSelectPopsAction(delIndex);
    let delIndex2 = this.props.colorIds.filter(item => item != dataItem.code);
    this.props.changeColorIdsAction(delIndex2);
  };
  render() {
    console.log(this.props, "*********");
    const { details, selectIds } = this.props;
    const { amountList, tableList, isShowDetail, selectnum } = this.state;
    console.log(this.props);
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
              <tr className={styles.tableHead}>
                <th>金额</th>
                <th>详情</th>
                <th>下注</th>
                <th>赔率</th>
                <th>操作</th>
              </tr>
              {this.props.selectIds.map((item, index) => (
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
                      onPress: this.delete.bind(this, item),
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
                    <td>{this.state.baseAmount}</td>
                    <td>
                      {item.grandparentname}
                      <br />
                      {item.parentname}
                    </td>
                    <td>{item.name}</td>
                    <td> {item.odds}</td>
                    <td onClick={this.delete.bind(this, item)}>删除</td>
                  </tr>
                </SwipeAction>
              ))}
            </table>
          </div>
        ) : null}
        <div className={styles.grayPop} onClick={this.isShowDetail}>
          已选{selectIds.length}注
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
          <div className={styles.cancel} onClick={this.clearALLSelect}>
            取 消
          </div>
          <div
            className={styles.confirmButton}
            onClick={this.betANDisShowModal}
          >
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

export default connect(
  state => {
    console.log(state);
    return {
      base: state.base,
      userName: state.user.name,
      balance: state.account.balance,
      table: state.table,
      getTotalList: state.play.totalList,
      lottery_info: state.play.lottery_info,
      selectIds: state.play.selectIds,
      colorIds: state.play.colorIds,
      gobetinfo: state.play.gobetinfo,
      isbet: state.play.isbet
    };
  },
  {
    gobet,
    changeSelectPopsAction,
    changeColorIdsAction
  }
)(PopUpSelectResults);
