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
  numberList: [1, 2, 33, 4, 21, 3, 4, 4, 3, 6]
};

class Period extends Component {
  state = {
    showPlaySecondBar: true
  };
  bg3() {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);
    return "rgb(" + r + "," + g + "," + b + ")";
  }
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
          <span className={styles.number_first}>243424 期</span>
          <span className={styles.number_second}>
            {numberList.map((item, index) => (
              <span style={numberStyle(index)} key={index}>
                {item}
              </span>
            ))}
          </span>
        </div>
        <div className={styles.timing}>
          <span className={styles.timing_first}>243424 期</span>
          <span className={styles.timing_second}>
            封盘:<span className={styles.secondInterval}>06:00</span>
          </span>
          <span className={styles.timing_third}>
            开奖:<span className={styles.thirdInterval}>06:00</span>
          </span>
        </div>
      </div>
    );
  }
}

Period.propTypes = propTypes;
Period.defaultProps = defaultProps;

export default Period;
