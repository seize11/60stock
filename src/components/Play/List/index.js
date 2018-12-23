import React, { Component } from "react";
import PropTypes from "prop-types";
import { Redirect, Switch } from "react-router-dom";
import Route from "../../Route";
import History from "../../../utils/history";

import styles from "./List.scss";
import Link from "../../Link";
import Single from "../../Play/Single";
import Double from "../../Play/Double";
import Championrunner from "../../Play/Championrunner";

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
  TAB_LIST: [
    {
      name: "双面盘",
      key: 0,
      path: "/play/double"
    },
    {
      name: "单号1~10",
      key: 1,
      path: "/play/single"
    },
    {
      name: "冠亚和",
      key: 2,
      path: "/play/championrunner"
    }
  ]
};

class List extends Component {
  state = {
    showPlaySecondBar: true,
    currentPath: ""
  };
  componentDidMount() {
    // location.pathname
    this.changeIndex(location.pathname);
  }
  changeIndex = path => {
    this.setState({ currentPath: path });
  };
  render() {
    const { TAB_LIST } = this.props;

    return (
      <div className={styles.List}>
        <div className={styles.links}>
          {TAB_LIST.map(item => (
            <Link
              to={item.path}
              className={
                this.state.currentPath == item.path ? styles.active : ""
              }
              key={item.key}
            >
              <span
                className={`${styles.link} ${
                  this.state.currentPath == item.path ? styles.active : ""
                }`}
                onClick={this.changeIndex.bind(this, item.path)}
              >
                {item.name}
              </span>
            </Link>
          ))}
        </div>

        <div className={styles.contents}>
          <Switch>
            <Route path="/play/single" component={Single} />
            <Route path="/play/championrunner" component={Championrunner} />
            <Route path="/play/" component={Double} />
          </Switch>
        </div>
      </div>
    );
  }
}

List.propTypes = propTypes;
List.defaultProps = defaultProps;

export default List;
