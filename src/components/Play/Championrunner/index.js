/*   global SockJS, Stomp */
import React, { Component } from "react";
import PropTypes from "prop-types";
import History from "../../../utils/history";
import { Accordion, List, Grid, Icon } from "antd-mobile";
import styles from "./Championrunner.scss";
import "./Championrunner.scss";
import right_botttom_Image from "Images/type/right_botttom.png";
import { connect } from "react-redux";
import {
  changeSelectPopsAction,
  changeColorIdsAction
} from "../../../actions/play";

const propTypes = {
  leftContent: PropTypes.any,
  rightContent: PropTypes.any,
  midcontent: PropTypes.any,
  leftNumber: PropTypes.any,
  rightNumber: PropTypes.any,
  midNumber: PropTypes.any
};

const defaultProps = {
  leftContent: "额  度"
};

class Single extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showPlaySecondBar: true,
      selectIds: [],
      colorIds: [],
      isShowSonsIds: []
    };
  }
  componentDidMount() {}

  onChange = key => {};
  toggleNum = dataItem => {
    if (this.state.isShowSonsIds.indexOf(dataItem.name) > -1) {
      let delIndex = this.state.isShowSonsIds.filter(
        item => item != dataItem.name
      );
      this.setState({ isShowSonsIds: delIndex });
    } else {
      let aRR = this.state.isShowSonsIds;
      aRR.push(dataItem.name);
      this.setState({ isShowSonsIds: aRR });
    }
  };
  hasItemCode = (colorIds, dataItem) => {
    console.log(colorIds, dataItem);
    if (colorIds.indexOf(dataItem.code) > -1) {
      return true;
    } else {
      return false;
    }
  };
  toggleBorder = (dataItem, item, grandparent) => {
    if (this.props.lottery_info.endTime == "已封盘") {
      return false;
    }

    let ishasItem = this.hasItemCode(this.props.colorIds, dataItem);
    console.log(ishasItem);
    if (ishasItem) {
      let delIndex = this.props.selectIds.filter(
        item => item.code != dataItem.code
      );
      this.props.changeSelectPopsAction(delIndex);
      //只用切换颜色
      let delIndex2 = this.props.colorIds.filter(item => item != dataItem.code);
      this.props.changeColorIdsAction(delIndex2);
    } else {
      let aRR = this.props.selectIds;
      let aRR2 = this.props.colorIds;
      aRR.push({
        code: dataItem.code,
        name: dataItem.name,
        odds: dataItem.odds,
        parentname: item.name,
        grandparentname: grandparent
      });
      aRR2.push(dataItem.code);
      this.props.changeSelectPopsAction(aRR);
      this.props.changeColorIdsAction(aRR2);
    }
  };

  render() {
    const { totalList, lottery_info } = this.props;
    // console.log(this.props);
    return (
      <div className={styles.Single}>
        {totalList[2] &&
          totalList[2].menuList.map((item, index) => (
            <div className={styles.rightItem} key={index}>
              <div
                className={styles.heads}
                onClick={this.toggleNum.bind(this, item)}
              >
                {item.name} &nbsp;
                {this.state.isShowSonsIds.indexOf(item.name) > -1 ? (
                  <Icon type="down" />
                ) : (
                  <Icon type="up" />
                )}
              </div>
              <div
                className={styles.sonWarpper}
                style={{
                  display: `${
                    this.state.isShowSonsIds.indexOf(item.name) > -1
                      ? "none"
                      : "block"
                  }`
                }}
              >
                <Grid
                  data={item.betList}
                  columnNum={2}
                  itemStyle={{ height: "1rem" }}
                  renderItem={(dataItem, i) => (
                    <div
                      className={styles.grid}
                      style={
                        this.props.colorIds.indexOf(dataItem.code) > -1
                          ? { border: "0.1rem solid yellow" }
                          : null
                      }
                      onClick={this.toggleBorder.bind(
                        this,
                        dataItem,
                        item,
                        totalList[1].name
                      )}
                    >
                      <span>{dataItem.name}</span>
                      <span className={styles.redNum}>
                        {lottery_info.endTime &&
                        lottery_info.endTime == "已封盘"
                          ? "--"
                          : dataItem.odds}
                      </span>
                      {this.props.colorIds.indexOf(dataItem.code) > -1 ? (
                        <img src={right_botttom_Image} />
                      ) : null}
                    </div>
                  )}
                />
              </div>
            </div>
          ))}
      </div>
    );
  }
}

Single.propTypes = propTypes;
Single.defaultProps = defaultProps;

// export default Single;
export default connect(
  state => ({
    base: state.base,
    userName: state.user.name,
    balance: state.account.balance,
    table: state.table,
    selectIds: state.play.selectIds,
    colorIds: state.play.colorIds,
    totalList: state.play.totalList,
    lottery_info: state.play.lottery_info
  }),
  { changeSelectPopsAction, changeColorIdsAction }
)(Single);
