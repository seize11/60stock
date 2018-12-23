import React, { Component } from "react";
import PropTypes from "prop-types";
import History from "../../../utils/history";

import styles from "./Championrunner.scss";

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

class Championrunner extends Component {
  state = {
    showPlaySecondBar: true
  };
  render() {
    const { numberList } = this.props;

    const foldWrapper = { textAlign: "center" };
    return <div className={styles.Championrunner}>Championrunner</div>;
  }
}

Championrunner.propTypes = propTypes;
Championrunner.defaultProps = defaultProps;

export default Championrunner;
