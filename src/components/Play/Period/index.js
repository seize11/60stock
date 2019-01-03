import React, { Component } from "react";
import PropTypes from "prop-types";
import History from "../../../utils/history";

import styles from "./Period.scss";

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
  endTime: 1546784956000
};

class Period extends Component {
  state = {
    showPlaySecondBar: true,
    minute: 0,
    second: 0
  };
  componentDidMount() {
    if (this.timer) clearInterval(this.timer);
    if (this.props.endTime) {
      // let endTime = this.props.endTime.replace(/-/g, "/");
      this.countFun(this.props.endTime);
    }
  }
  //组件卸载取消倒计时
  componentWillUnmount() {
    clearInterval(this.timer);
  }
  bg3() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
  }
  countFun = time => {
    let end_time = new Date(time).getTime(),
      sys_second = end_time - new Date().getTime();
    this.timer = setInterval(() => {
      //防止倒计时出现负数
      if (sys_second > 1000) {
        sys_second -= 1000;
        let minute = Math.floor((sys_second / 1000 / 60) % 60);
        let second = Math.floor((sys_second / 1000) % 60);
        this.setState(
          {
            minute: minute < 10 ? "0" + minute : minute,
            second: second < 10 ? "0" + second : second
          },
          () => {}
        );
      } else {
        clearInterval(this.timer);
        //倒计时结束时触发父组件的方法
        //this.props.timeEnd();
      }
    }, 1000);
  };
  render() {
    const { numberList } = this.props;

    const numberStyle = index => {
      return {
        height: ".5rem",
        width: ".5rem",
        backGround: "yellow",
        display: "inline-block",
        textAlign: "center",
        borderRadius: ".1rem",
        backgroundColor: this.bg3(),
        margin: ".05rem",
        padding: ".05rem"
      };
    };
    const foldWrapper = { textAlign: "center" };
    return (
      <div className={styles.period}>
        <div className={styles.number}>
          <span className={styles.number_first}>
            {this.props.lottery_info.lastExpect} 期
          </span>
          <span className={styles.number_second}>
            {numberList.map((item, index) => (
              <span style={numberStyle(index)} key={index}>
                {item}
              </span>
            ))}
          </span>
        </div>
        <div className={styles.timing}>
          <span className={styles.timing_first}>
            {" "}
            {this.props.lottery_info.expect} 期
          </span>
          <span className={styles.timing_second}>
            封盘:
            <span className={styles.secondInterval}>
              {`${this.state.minute}:${this.state.second}`}
            </span>
          </span>
          <span className={styles.timing_third}>
            开奖:
            <span className={styles.thirdInterval}>{`${this.state.minute}:${
              this.state.second
            }`}</span>
          </span>
        </div>
      </div>
    );
  }
}

Period.propTypes = propTypes;
Period.defaultProps = defaultProps;

export default Period;
