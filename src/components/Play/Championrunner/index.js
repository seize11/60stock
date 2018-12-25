import React, { Component } from "react";
import PropTypes from "prop-types";
import History from "../../../utils/history";
import { Accordion, List, Grid, Icon } from "antd-mobile";
import styles from "./Championrunner.scss";
import "./Championrunner.scss";
import right_botttom_Image from "Images/type/right_botttom.png";
import { connect } from "react-redux";
import { changeSelectPopsAction } from "../../../actions/play";

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
      isShowSonsIds: []
    };
  }
  // state = {
  //   showPlaySecondBar: true,
  //   selectIds: [],
  //   isShowSonsIds: []
  // };
  componentDidMount() {}

  onChange = key => {};
  toggleNum = dataItem => {
    console.log(dataItem);
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
  toggleBorder = dataItem => {
    if (this.state.selectIds.indexOf(dataItem.code) > -1) {
      let delIndex = this.state.selectIds.filter(item => item != dataItem.code);
      this.setState({ selectIds: delIndex }, () => {
        this.props.changeSelectPopsAction(this.state.selectIds);
      });
    } else {
      let aRR = this.state.selectIds;
      aRR.push(dataItem.code);
      this.setState({ selectIds: aRR }, () => {
        this.props.changeSelectPopsAction(this.state.selectIds);
      });
    }
  };

  render() {
    const { numberList, totalList } = this.props;
    console.log(this.props);
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
                        this.state.selectIds.indexOf(dataItem.code) > -1
                          ? { border: "0.1rem solid yellow" }
                          : null
                      }
                      onClick={this.toggleBorder.bind(this, dataItem)}
                    >
                      <span>{dataItem.name}</span>
                      <span className={styles.redNum}>{dataItem.odds}</span>
                      {this.state.selectIds.indexOf(dataItem.code) > -1 ? (
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
    changeSelectPops: state.play.selectIds,
    totalList: state.play.totalList
  }),
  { changeSelectPopsAction }
)(Single);
