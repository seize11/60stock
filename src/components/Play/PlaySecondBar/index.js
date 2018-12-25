import React, { Component } from "react";
import PropTypes from "prop-types";
import History from "../../../utils/history";

import styles from "./PlaySecondBar.scss";
import palySecondUp from "Images/type/palySecondUp.png";
import palySecondDown from "Images/type/palySecondDown.png";

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
  leftNumber: "1111.11",
  rightContent: "未结算金额",
  rightNumber: "1111.11",
  midcontent: "今日输赢",
  midNumber: "1111.11",
  as: true
};

class PlaySecondBar extends Component {
  state = {
    showPlaySecondBar: true
  };
  toggleCls = showPlaySecondBar => {
    this.setState({ showPlaySecondBar: !this.state.showPlaySecondBar });
  };
  render() {
    const {
      rightContent,
      leftContent,
      midcontent,
      midNumber,
      rightNumber,
      leftNumber,
      as,
      ...restProps
    } = this.props;
    const cls = `${styles["second-bar"]}`;
    const foldStyle = {
      height: "1rem",
      width: "1.5rem",
      marginTop: "1.5rem"
    };
    const unfoldStyle = {
      height: "1rem",
      width: "1.5rem",
      marginTop: "-.2rem"
    };
    const foldWrapper = { textAlign: "center" };
    return (
      <div>
        {this.state.showPlaySecondBar ? (
          <div className={cls} {...restProps}>
            <div className={styles.left}>
              <span className={styles.text_color}>{leftContent}</span>
              <span>{leftNumber}</span>
            </div>
            <div className={styles.mid}>
              <span className={styles.text_color}>{rightContent}</span>
              <span>{rightNumber}</span>
            </div>
            <div className={styles.right}>
              <span className={styles.text_color}>{midcontent}</span>
              <span>{midNumber}</span>
            </div>
          </div>
        ) : null}
        <div style={foldWrapper}>
          <img
            src={this.state.showPlaySecondBar ? palySecondDown : palySecondUp}
            alt=""
            style={this.state.showPlaySecondBar ? foldStyle : unfoldStyle}
            onClick={this.toggleCls}
          />
        </div>
      </div>
    );
  }
}

PlaySecondBar.propTypes = propTypes;
PlaySecondBar.defaultProps = defaultProps;

export default PlaySecondBar;
